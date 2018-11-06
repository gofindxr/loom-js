#!/bin/bash

# To run this script with a locally built loom binary set the LOOM_BIN env var to point to your loom
# binary. If you plan on running the tests frequently you'll save a lot of time if you run the
# steps in the setup_weave_blueprint in another directory, and then set LOOM_BLUEPRINT_DIR env var
# to point to it, otherwise the contract will be recloned and rebuilt every time.

set -euxo pipefail

# Prepare env
DEFAULT_GOPATH=$GOPATH
BUILD_NUMBER=560
GANACHE_PORT=8545
REPO_ROOT=`pwd`
LOOM_DIR=`pwd`/tmp/e2e
# LOOM_BIN=$LOOM_DIR/loom
# PLASMA_CASH_DIR=$LOOM_DIR/plasma-cash


# Check available platforms
PLATFORM='unknown'
unamestr=`uname`
if [[ "$unamestr" == 'Linux' ]]; then
  PLATFORM='linux'
elif [[ "$unamestr" == 'Darwin' ]]; then
  PLATFORM='osx'
else
  echo "Platform not supported on this script yet"
  exit -1
fi

download_dappchain() {
  cd $LOOM_DIR
  wget https://private.delegatecall.com/loom/$PLATFORM/build-$BUILD_NUMBER/loom
  chmod +x loom
  LOOM_BIN=`pwd`/loom
}

download_plasma_cash() {
  cd $LOOM_DIR
  git clone https://github.com/loomnetwork/plasma-cash
  PLASMA_CASH_DIR=`pwd`/plasma-cash
}

setup_honest_dappchain() {
  cd $LOOM_DIR
  $LOOM_BIN init -f
  cp $PLASMA_CASH_DIR/loom_test/honest.genesis.json genesis.json
  cp $PLASMA_CASH_DIR/loom_test/loom-test.yml loom.yaml
  cp $PLASMA_CASH_DIR/loom_test/oracle.key .
  cp $PLASMA_CASH_DIR/loom_test/eth.key .
}

setup_plasma_cash() {
  cd $PLASMA_CASH_DIR/server
  yarn install
  yarn truffle deploy --network rpc
}

start_chains() {
  $REPO_ROOT/node_modules/.bin/ganache-cli -p $GANACHE_PORT -a 1000 -i 15 --gasLimit 50000000 -e 10000000000000 -m gravity top burden flip student usage spell purchase hundred improve check genre >> ganache.log &
  GANACHE_PID=$!

  cd $LOOM_DIR
  $LOOM_BIN reset
  $LOOM_BIN run &
  LOOM_PID=$!
  sleep 5
}

stop_chains() {
  kill -9 $GANACHE_PID
  kill -9 $LOOM_PID
}

run_tests() {
  cd $PLASMA_CASH_DIR/loom_js_test
  yarn install
  yarn build
  yarn test
  yarn tape:honest
}

cleanup() {
  stop_chains
}

rm -rf $LOOM_DIR; true
mkdir -p $LOOM_DIR

if [[ -z "${LOOM_BIN:-}" ]]; then
  download_dappchain
fi

if [[ -z "${PLASMA_CASH_DIR:-}" ]]; then
  download_plasma_cash
fi

setup_honest_dappchain

trap cleanup EXIT

start_chains

setup_plasma_cash

run_tests
