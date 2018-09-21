import BN from 'bn.js'
import Web3 from 'web3'

import { EthereumPlasmaClient, IPlasmaCoin, IPlasmaDeposit, IPlasmaExitParams, IPlasmaExitData } from './ethereum-client'
import { DAppChainPlasmaClient } from './dappchain-client'
import { PlasmaCashTx } from './plasma-cash-tx'
import { Web3Signer } from '../solidity-helpers'

export interface IProofs {
  inclusion: any
  exclusion: any
}

export interface IEntityParams {
  /** Web3 account for use on Ethereum */
  ethAccount: any // TODO: Type this properly, also this should probably be obtained from ethPlasmaClient
  ethPlasmaClient: EthereumPlasmaClient
  dAppPlasmaClient: DAppChainPlasmaClient
  /** Allows to override the amount of gas used when sending txs to Ethereum. */
  defaultGas?: string | number
  childBlockInterval: number
}

// TODO: Maybe come up with a better name?
/**
 * Manages Plasma Cash related interactions between an Ethereum network (Ganache, Mainnet, etc.)
 * and a Loom DAppChain from the point of view of a single entity. An entity has two identities, one
 * on Ethereum, and one on the DAppChain, each identity has its own private/public key pair.
 */
export class Entity {
  private _web3: Web3
  // web3 account
  private _ethAccount: any // TODO: type this properly
  private _dAppPlasmaClient: DAppChainPlasmaClient
  private _ethPlasmaClient: EthereumPlasmaClient
  private _defaultGas?: string | number
  private _childBlockInterval: number

  get ethAddress(): string {
    return this._ethAccount.address
  }

  get plasmaCashContract(): any {
    return this._ethPlasmaClient.plasmaCashContract
  }

  constructor(web3: Web3, params: IEntityParams) {
    this._web3 = web3
    this._ethAccount = params.ethAccount
    this._ethPlasmaClient = params.ethPlasmaClient
    this._dAppPlasmaClient = params.dAppPlasmaClient
    this._defaultGas = params.defaultGas
    this._childBlockInterval = params.childBlockInterval
  }

  async transferTokenAsync(params: {
    slot: BN
    prevBlockNum: BN
    denomination: BN | number
    newOwner: Entity
  }) {
    const { slot, prevBlockNum, denomination, newOwner } = params
    const tx = new PlasmaCashTx({
      slot,
      prevBlockNum,
      denomination,
      newOwner: newOwner.ethAddress,
      prevOwner: this.ethAddress
    })
    await tx.signAsync(new Web3Signer(this._web3, this.ethAddress))
    await this._dAppPlasmaClient.sendTxAsync(tx)
  }

  async getExitAsync(slot: BN): Promise<IPlasmaExitData> {
    return this._ethPlasmaClient.getExitAsync({ slot, from: this.ethAddress })
  }

  async getCurrentBlockAsync(): Promise<BN> {
    return this._dAppPlasmaClient.getCurrentPlasmaBlockNumAsync()
  }

  async getPlasmaCoinAsync(slot: BN): Promise<IPlasmaCoin> {
    return this._ethPlasmaClient.getPlasmaCoinAsync({ slot, from: this.ethAddress })
  }

  async submitPlasmaBlockAsync(): Promise<BN> {
    await this._dAppPlasmaClient.debugFinalizeBlockAsync()
    const blockNum = await this._dAppPlasmaClient.getCurrentPlasmaBlockNumAsync()
    const block = await this._dAppPlasmaClient.getPlasmaBlockAtAsync(blockNum)
    await this._ethPlasmaClient.debugSubmitBlockAsync({ block, from: this.ethAddress })
    return blockNum
  }

  async submitPlasmaDepositAsync(deposit: IPlasmaDeposit): Promise<void> {
    return this._dAppPlasmaClient.debugSubmitDepositAsync(deposit)
  }

  async startExitAsync(params: { slot: BN; prevBlockNum: BN; exitBlockNum: BN }): Promise<object> {
    const { slot, prevBlockNum, exitBlockNum } = params

    // In case the sender is exiting a Deposit transaction, they should just create a signed
    // transaction to themselves. There is no need for a merkle proof.
    if (exitBlockNum.modn(this._childBlockInterval) !== 0) {
      const exitTx = new PlasmaCashTx({
        slot,
        prevBlockNum: new BN(0),
        denomination: 1,
        newOwner: this.ethAddress
      })
      await exitTx.signAsync(new Web3Signer(this._web3, this.ethAddress))
      return this._ethPlasmaClient.startExitAsync({
        slot,
        exitTx,
        exitBlockNum,
        from: this.ethAddress,
        gas: this._defaultGas
      })
    }

    // Otherwise, they should get the raw tx info from the blocks, and the merkle proofs.
    const exitBlock = await this._dAppPlasmaClient.getPlasmaBlockAtAsync(exitBlockNum)
    const exitTx = exitBlock.findTxWithSlot(slot)
    if (!exitTx) {
      throw new Error(`Invalid exit block: missing tx for slot ${slot.toString(10)}.`)
    }
    const prevBlock = await this._dAppPlasmaClient.getPlasmaBlockAtAsync(prevBlockNum)
    const prevTx = prevBlock.findTxWithSlot(slot)
    if (!prevTx) {
      throw new Error(`Invalid prev block: missing tx for slot ${slot.toString(10)}.`)
    }
    return this._ethPlasmaClient.startExitAsync({
      slot,
      prevTx,
      exitTx,
      prevBlockNum,
      exitBlockNum,
      from: this.ethAddress,
      gas: this._defaultGas
    })
  }

  finalizeExitsAsync(): Promise<object> {
    return this._ethPlasmaClient.finalizeExitsAsync({
      from: this.ethAddress,
      gas: this._defaultGas
    })
  }

  watchExit(slot: BN): any {
    console.log(`Started watching events for Coin ${slot}`)
    return this.plasmaCashContract.events.StartedExit({
      filter: { slot: slot },
      fromBlock: 0
    })
      .on('data', async (event: any, err: any) => {
        // console.log('Exit values: ', event.returnValues)
        this.challengeExit(slot, event.returnValues.owner)
      })
      .on('error', (err: any) => console.log(err))
  }

  challengeExit(slot: BN, owner: String) {
    console.log('FOUND EXIT BY', owner)
    if (owner === this.ethAddress) {
      console.log("Exit is valid, continuing...")
      return
    }

    // console.log('Starting the promise chain')
    // Buggy, hangs currently
    var a = this.getPlasmaCoinAsync(slot)
    var b = a.then(coin => { return this.getBlockNumbers(coin.depositBlockNum) })
    var c = b.then(blocks => { return this.getCoinHistory(slot, blocks)})
    var d = this.getExitAsync(slot)
    return Promise.all([a,b,c,d]).then(values => {
      const coin = values[0]
      const blockNumbers = values[1]
      const proofs = values[2]
      const exit = values[3]
    })
  }

  async getCoinHistory(slot: BN, blocks: BN[]): Promise<IProofs> {
    let proofs: IProofs = {
      exclusion: 1,
      inclusion: 2
    }
    // Gather the inclusion / exclusion proofs
    // https://github.com/loomnetwork/plasma-cash/blob/master/plasma_cash/client/client.py#L262
    return proofs
  }

  async getBlockNumbers(startBlock: any): Promise<BN[]> {
    return this.getCurrentBlockAsync().then(endBlock => {
      const nextDepositBlock: number = Math.ceil(startBlock / this._childBlockInterval) * this._childBlockInterval
      let blockNumbers: BN[] = [startBlock]
      for(let i = startBlock; i <= endBlock; i+= this._childBlockInterval) {
        blockNumbers.push(i);
      }
      return blockNumbers
    })
  }

  // This doesn't worth yet, still hangs when unsubscribing.
  stopWatching(filter: any) {
    filter.unsubscribe()
  }

  withdrawAsync(slot: BN): Promise<object> {
    return this._ethPlasmaClient.withdrawAsync({
      slot,
      from: this.ethAddress,
      gas: this._defaultGas
    })
  }

  withdrawBondsAsync(): Promise<object> {
    return this._ethPlasmaClient.withdrawBondsAsync({
      from: this.ethAddress,
      gas: this._defaultGas
    })
  }

  async challengeAfterAsync(params: { slot: BN; challengingBlockNum: BN }): Promise<object> {
    const { slot, challengingBlockNum } = params
    const challengingBlock = await this._dAppPlasmaClient.getPlasmaBlockAtAsync(
      challengingBlockNum
    )
    const challengingTx = challengingBlock.findTxWithSlot(slot)
    if (!challengingTx) {
      throw new Error(`Invalid challenging block: missing tx for slot ${slot.toString(10)}.`)
    }
    return this._ethPlasmaClient.challengeAfterAsync({
      slot,
      challengingBlockNum,
      challengingTx,
      from: this.ethAddress,
      gas: this._defaultGas
    })
  }

  async challengeBetweenAsync(params: { slot: BN; challengingBlockNum: BN }): Promise<object> {
    const { slot, challengingBlockNum } = params
    const challengingBlock = await this._dAppPlasmaClient.getPlasmaBlockAtAsync(
      challengingBlockNum
    )
    const challengingTx = challengingBlock.findTxWithSlot(slot)
    if (!challengingTx) {
      throw new Error(`Invalid challenging block: missing tx for slot ${slot.toString(10)}.`)
    }
    return this._ethPlasmaClient.challengeBetweenAsync({
      slot,
      challengingBlockNum,
      challengingTx,
      from: this.ethAddress,
      gas: this._defaultGas
    })
  }

  async challengeBeforeAsync(params: {
    slot: BN
    prevBlockNum: BN
    challengingBlockNum: BN
  }): Promise<object> {
    const { slot, prevBlockNum, challengingBlockNum } = params

    // In case the sender is exiting a Deposit transaction, they should just create a signed
    // transaction to themselves. There is no need for a merkle proof.
    if (challengingBlockNum.modn(this._childBlockInterval) !== 0) {
      const challengingTx = new PlasmaCashTx({
        slot,
        prevBlockNum: new BN(0),
        denomination: 1,
        newOwner: this.ethAddress
      })
      await challengingTx.signAsync(new Web3Signer(this._web3, this.ethAddress))
      return this._ethPlasmaClient.challengeBeforeAsync({
        slot,
        challengingTx,
        challengingBlockNum,
        from: this.ethAddress,
        gas: this._defaultGas
      })
    }

    // Otherwise, they should get the raw tx info from the blocks, and the merkle proofs.
    const exitBlock = await this._dAppPlasmaClient.getPlasmaBlockAtAsync(challengingBlockNum)
    const challengingTx = exitBlock.findTxWithSlot(slot)
    if (!challengingTx) {
      throw new Error(`Invalid exit block: missing tx for slot ${slot.toString(10)}.`)
    }
    const prevBlock = await this._dAppPlasmaClient.getPlasmaBlockAtAsync(prevBlockNum)
    const prevTx = prevBlock.findTxWithSlot(slot)
    if (!prevTx) {
      throw new Error(`Invalid prev block: missing tx for slot ${slot.toString(10)}.`)
    }
    return this._ethPlasmaClient.challengeBeforeAsync({
      slot,
      prevTx,
      challengingTx,
      prevBlockNum,
      challengingBlockNum,
      from: this.ethAddress,
      gas: this._defaultGas
    })
  }

  async respondChallengeBeforeAsync(params: {
    slot: BN
    challengingTxHash: string
    respondingBlockNum: BN
  }): Promise<object> {
    const { slot, challengingTxHash, respondingBlockNum } = params
    const respondingBlock = await this._dAppPlasmaClient.getPlasmaBlockAtAsync(respondingBlockNum)
    const respondingTx = respondingBlock.findTxWithSlot(slot)
    if (!respondingTx) {
      throw new Error(`Invalid responding block: missing tx for slot ${slot.toString(10)}.`)
    }
    return this._ethPlasmaClient.respondChallengeBeforeAsync({
      slot,
      challengingTxHash,
      respondingBlockNum,
      respondingTx,
      from: this.ethAddress,
      gas: this._defaultGas
    })
  }
}
