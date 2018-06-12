// package: 
// file: proto/loom.proto

import * as jspb from "google-protobuf";

export class SignedTx extends jspb.Message {
  getInner(): Uint8Array | string;
  getInner_asU8(): Uint8Array;
  getInner_asB64(): string;
  setInner(value: Uint8Array | string): void;

  getSignature(): Uint8Array | string;
  getSignature_asU8(): Uint8Array;
  getSignature_asB64(): string;
  setSignature(value: Uint8Array | string): void;

  getPublicKey(): Uint8Array | string;
  getPublicKey_asU8(): Uint8Array;
  getPublicKey_asB64(): string;
  setPublicKey(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignedTx.AsObject;
  static toObject(includeInstance: boolean, msg: SignedTx): SignedTx.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SignedTx, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignedTx;
  static deserializeBinaryFromReader(message: SignedTx, reader: jspb.BinaryReader): SignedTx;
}

export namespace SignedTx {
  export type AsObject = {
    inner: Uint8Array | string,
    signature: Uint8Array | string,
    publicKey: Uint8Array | string,
  }
}

export class NonceTx extends jspb.Message {
  getInner(): Uint8Array | string;
  getInner_asU8(): Uint8Array;
  getInner_asB64(): string;
  setInner(value: Uint8Array | string): void;

  getSequence(): number;
  setSequence(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NonceTx.AsObject;
  static toObject(includeInstance: boolean, msg: NonceTx): NonceTx.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: NonceTx, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NonceTx;
  static deserializeBinaryFromReader(message: NonceTx, reader: jspb.BinaryReader): NonceTx;
}

export namespace NonceTx {
  export type AsObject = {
    inner: Uint8Array | string,
    sequence: number,
  }
}

export class Address extends jspb.Message {
  getChainId(): string;
  setChainId(value: string): void;

  getLocal(): Uint8Array | string;
  getLocal_asU8(): Uint8Array;
  getLocal_asB64(): string;
  setLocal(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Address.AsObject;
  static toObject(includeInstance: boolean, msg: Address): Address.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Address, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Address;
  static deserializeBinaryFromReader(message: Address, reader: jspb.BinaryReader): Address;
}

export namespace Address {
  export type AsObject = {
    chainId: string,
    local: Uint8Array | string,
  }
}

export class Transaction extends jspb.Message {
  getId(): number;
  setId(value: number): void;

  getData(): Uint8Array | string;
  getData_asU8(): Uint8Array;
  getData_asB64(): string;
  setData(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Transaction.AsObject;
  static toObject(includeInstance: boolean, msg: Transaction): Transaction.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Transaction, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Transaction;
  static deserializeBinaryFromReader(message: Transaction, reader: jspb.BinaryReader): Transaction;
}

export namespace Transaction {
  export type AsObject = {
    id: number,
    data: Uint8Array | string,
  }
}

export class MessageTx extends jspb.Message {
  hasTo(): boolean;
  clearTo(): void;
  getTo(): Address | undefined;
  setTo(value?: Address): void;

  hasFrom(): boolean;
  clearFrom(): void;
  getFrom(): Address | undefined;
  setFrom(value?: Address): void;

  getData(): Uint8Array | string;
  getData_asU8(): Uint8Array;
  getData_asB64(): string;
  setData(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageTx.AsObject;
  static toObject(includeInstance: boolean, msg: MessageTx): MessageTx.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MessageTx, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageTx;
  static deserializeBinaryFromReader(message: MessageTx, reader: jspb.BinaryReader): MessageTx;
}

export namespace MessageTx {
  export type AsObject = {
    to?: Address.AsObject,
    from?: Address.AsObject,
    data: Uint8Array | string,
  }
}

export class DeployTx extends jspb.Message {
  getVmType(): VMType;
  setVmType(value: VMType): void;

  getCode(): Uint8Array | string;
  getCode_asU8(): Uint8Array;
  getCode_asB64(): string;
  setCode(value: Uint8Array | string): void;

  getName(): string;
  setName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeployTx.AsObject;
  static toObject(includeInstance: boolean, msg: DeployTx): DeployTx.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeployTx, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeployTx;
  static deserializeBinaryFromReader(message: DeployTx, reader: jspb.BinaryReader): DeployTx;
}

export namespace DeployTx {
  export type AsObject = {
    vmType: VMType,
    code: Uint8Array | string,
    name: string,
  }
}

export class DeployResponse extends jspb.Message {
  hasContract(): boolean;
  clearContract(): void;
  getContract(): Address | undefined;
  setContract(value?: Address): void;

  getOutput(): Uint8Array | string;
  getOutput_asU8(): Uint8Array;
  getOutput_asB64(): string;
  setOutput(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeployResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeployResponse): DeployResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeployResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeployResponse;
  static deserializeBinaryFromReader(message: DeployResponse, reader: jspb.BinaryReader): DeployResponse;
}

export namespace DeployResponse {
  export type AsObject = {
    contract?: Address.AsObject,
    output: Uint8Array | string,
  }
}

export class DeployResponseData extends jspb.Message {
  getTxHash(): Uint8Array | string;
  getTxHash_asU8(): Uint8Array;
  getTxHash_asB64(): string;
  setTxHash(value: Uint8Array | string): void;

  getBytecode(): Uint8Array | string;
  getBytecode_asU8(): Uint8Array;
  getBytecode_asB64(): string;
  setBytecode(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeployResponseData.AsObject;
  static toObject(includeInstance: boolean, msg: DeployResponseData): DeployResponseData.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DeployResponseData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeployResponseData;
  static deserializeBinaryFromReader(message: DeployResponseData, reader: jspb.BinaryReader): DeployResponseData;
}

export namespace DeployResponseData {
  export type AsObject = {
    txHash: Uint8Array | string,
    bytecode: Uint8Array | string,
  }
}

export class CallTx extends jspb.Message {
  getVmType(): VMType;
  setVmType(value: VMType): void;

  getInput(): Uint8Array | string;
  getInput_asU8(): Uint8Array;
  getInput_asB64(): string;
  setInput(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CallTx.AsObject;
  static toObject(includeInstance: boolean, msg: CallTx): CallTx.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CallTx, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CallTx;
  static deserializeBinaryFromReader(message: CallTx, reader: jspb.BinaryReader): CallTx;
}

export namespace CallTx {
  export type AsObject = {
    vmType: VMType,
    input: Uint8Array | string,
  }
}

export class PluginCode extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getInput(): Uint8Array | string;
  getInput_asU8(): Uint8Array;
  getInput_asB64(): string;
  setInput(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PluginCode.AsObject;
  static toObject(includeInstance: boolean, msg: PluginCode): PluginCode.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PluginCode, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PluginCode;
  static deserializeBinaryFromReader(message: PluginCode, reader: jspb.BinaryReader): PluginCode;
}

export namespace PluginCode {
  export type AsObject = {
    name: string,
    input: Uint8Array | string,
  }
}

export class Request extends jspb.Message {
  getContentType(): EncodingType;
  setContentType(value: EncodingType): void;

  getAccept(): EncodingType;
  setAccept(value: EncodingType): void;

  getBody(): Uint8Array | string;
  getBody_asU8(): Uint8Array;
  getBody_asB64(): string;
  setBody(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Request.AsObject;
  static toObject(includeInstance: boolean, msg: Request): Request.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Request, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Request;
  static deserializeBinaryFromReader(message: Request, reader: jspb.BinaryReader): Request;
}

export namespace Request {
  export type AsObject = {
    contentType: EncodingType,
    accept: EncodingType,
    body: Uint8Array | string,
  }
}

export class Response extends jspb.Message {
  getContentType(): EncodingType;
  setContentType(value: EncodingType): void;

  getBody(): Uint8Array | string;
  getBody_asU8(): Uint8Array;
  getBody_asB64(): string;
  setBody(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Response.AsObject;
  static toObject(includeInstance: boolean, msg: Response): Response.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Response, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Response;
  static deserializeBinaryFromReader(message: Response, reader: jspb.BinaryReader): Response;
}

export namespace Response {
  export type AsObject = {
    contentType: EncodingType,
    body: Uint8Array | string,
  }
}

export class ContractMethodCall extends jspb.Message {
  getMethod(): string;
  setMethod(value: string): void;

  getArgs(): Uint8Array | string;
  getArgs_asU8(): Uint8Array;
  getArgs_asB64(): string;
  setArgs(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContractMethodCall.AsObject;
  static toObject(includeInstance: boolean, msg: ContractMethodCall): ContractMethodCall.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContractMethodCall, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContractMethodCall;
  static deserializeBinaryFromReader(message: ContractMethodCall, reader: jspb.BinaryReader): ContractMethodCall;
}

export namespace ContractMethodCall {
  export type AsObject = {
    method: string,
    args: Uint8Array | string,
  }
}

export class TxHashList extends jspb.Message {
  clearTxHashList(): void;
  getTxHashList(): Array<Uint8Array | string>;
  getTxHashList_asU8(): Array<Uint8Array>;
  getTxHashList_asB64(): Array<string>;
  setTxHashList(value: Array<Uint8Array | string>): void;
  addTxHash(value: Uint8Array | string, index?: number): Uint8Array | string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TxHashList.AsObject;
  static toObject(includeInstance: boolean, msg: TxHashList): TxHashList.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TxHashList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TxHashList;
  static deserializeBinaryFromReader(message: TxHashList, reader: jspb.BinaryReader): TxHashList;
}

export namespace TxHashList {
  export type AsObject = {
    txHashList: Array<Uint8Array | string>,
  }
}

export class EventDataList extends jspb.Message {
  clearEventsList(): void;
  getEventsList(): Array<EventData>;
  setEventsList(value: Array<EventData>): void;
  addEvents(value?: EventData, index?: number): EventData;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EventDataList.AsObject;
  static toObject(includeInstance: boolean, msg: EventDataList): EventDataList.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EventDataList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EventDataList;
  static deserializeBinaryFromReader(message: EventDataList, reader: jspb.BinaryReader): EventDataList;
}

export namespace EventDataList {
  export type AsObject = {
    eventsList: Array<EventData.AsObject>,
  }
}

export class EventData extends jspb.Message {
  clearTopicsList(): void;
  getTopicsList(): Array<string>;
  setTopicsList(value: Array<string>): void;
  addTopics(value: string, index?: number): string;

  hasCaller(): boolean;
  clearCaller(): void;
  getCaller(): Address | undefined;
  setCaller(value?: Address): void;

  hasAddress(): boolean;
  clearAddress(): void;
  getAddress(): Address | undefined;
  setAddress(value?: Address): void;

  getPluginName(): string;
  setPluginName(value: string): void;

  getBlockHeight(): number;
  setBlockHeight(value: number): void;

  getEncodedBody(): Uint8Array | string;
  getEncodedBody_asU8(): Uint8Array;
  getEncodedBody_asB64(): string;
  setEncodedBody(value: Uint8Array | string): void;

  getOriginalRequest(): Uint8Array | string;
  getOriginalRequest_asU8(): Uint8Array;
  getOriginalRequest_asB64(): string;
  setOriginalRequest(value: Uint8Array | string): void;

  getTxHash(): Uint8Array | string;
  getTxHash_asU8(): Uint8Array;
  getTxHash_asB64(): string;
  setTxHash(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EventData.AsObject;
  static toObject(includeInstance: boolean, msg: EventData): EventData.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EventData, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EventData;
  static deserializeBinaryFromReader(message: EventData, reader: jspb.BinaryReader): EventData;
}

export namespace EventData {
  export type AsObject = {
    topicsList: Array<string>,
    caller?: Address.AsObject,
    address?: Address.AsObject,
    pluginName: string,
    blockHeight: number,
    encodedBody: Uint8Array | string,
    originalRequest: Uint8Array | string,
    txHash: Uint8Array | string,
  }
}

export class TxReceiptList extends jspb.Message {
  clearTxReceiptsList(): void;
  getTxReceiptsList(): Array<EvmTxReceipt>;
  setTxReceiptsList(value: Array<EvmTxReceipt>): void;
  addTxReceipts(value?: EvmTxReceipt, index?: number): EvmTxReceipt;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TxReceiptList.AsObject;
  static toObject(includeInstance: boolean, msg: TxReceiptList): TxReceiptList.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TxReceiptList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TxReceiptList;
  static deserializeBinaryFromReader(message: TxReceiptList, reader: jspb.BinaryReader): TxReceiptList;
}

export namespace TxReceiptList {
  export type AsObject = {
    txReceiptsList: Array<EvmTxReceipt.AsObject>,
  }
}

export class EvmTxReceipt extends jspb.Message {
  getTransactionIndex(): number;
  setTransactionIndex(value: number): void;

  getBlockHash(): Uint8Array | string;
  getBlockHash_asU8(): Uint8Array;
  getBlockHash_asB64(): string;
  setBlockHash(value: Uint8Array | string): void;

  getBlockNumber(): number;
  setBlockNumber(value: number): void;

  getCumulativeGasUsed(): number;
  setCumulativeGasUsed(value: number): void;

  getGasUsed(): number;
  setGasUsed(value: number): void;

  getContractAddress(): Uint8Array | string;
  getContractAddress_asU8(): Uint8Array;
  getContractAddress_asB64(): string;
  setContractAddress(value: Uint8Array | string): void;

  clearLogsList(): void;
  getLogsList(): Array<EventData>;
  setLogsList(value: Array<EventData>): void;
  addLogs(value?: EventData, index?: number): EventData;

  getLogsBloom(): Uint8Array | string;
  getLogsBloom_asU8(): Uint8Array;
  getLogsBloom_asB64(): string;
  setLogsBloom(value: Uint8Array | string): void;

  getStatus(): number;
  setStatus(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EvmTxReceipt.AsObject;
  static toObject(includeInstance: boolean, msg: EvmTxReceipt): EvmTxReceipt.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EvmTxReceipt, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EvmTxReceipt;
  static deserializeBinaryFromReader(message: EvmTxReceipt, reader: jspb.BinaryReader): EvmTxReceipt;
}

export namespace EvmTxReceipt {
  export type AsObject = {
    transactionIndex: number,
    blockHash: Uint8Array | string,
    blockNumber: number,
    cumulativeGasUsed: number,
    gasUsed: number,
    contractAddress: Uint8Array | string,
    logsList: Array<EventData.AsObject>,
    logsBloom: Uint8Array | string,
    status: number,
  }
}

export enum VMType {
  PLUGIN = 0,
  EVM = 1,
}

export enum EncodingType {
  JSON = 0,
  PROTOBUF3 = 1,
}

