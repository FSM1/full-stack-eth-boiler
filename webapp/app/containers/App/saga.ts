import { getContext, put, call, take, fork } from "redux-saga/effects";
import { BlockchainContext } from "blockchainContext";
import { connectMetamask, setWeb3 } from "./actions";
import { getType } from "typesafe-actions";
import { eventChannel } from "redux-saga";

function* addressChangeListener() {
  const blockchainContext: BlockchainContext = yield getContext('blockchain');

  const accountChangedChannel = eventChannel(emit => {
    const { ethereum } = window as any;
    const accountChangedHandler = (accounts) => emit(accounts);
    ethereum.on('accountsChanged', accountChangedHandler);
    const chainChangedHandler = (chainId) => emit(chainId);
    ethereum.on('networkChanged', chainChangedHandler);
    return () => {
      ethereum.off('accountsChanged', accountChangedHandler);
      ethereum.off('networkChanged', chainChangedHandler);
    };
  });

  while (true) {
    yield take(accountChangedChannel);
    const result: BlockchainContext = yield call(blockchainContext.enableEthereum);
    yield put(connectMetamask.success({
      ethAddress: result.ethAddress || '',
      approvedNetwork: result.approvedNetwork,
      networkName: result.networkName,
      chainId: result.chainId || -1,
    }));
  }
}

function* initialiseWallet() {
  const blockchainContext: BlockchainContext = yield getContext('blockchain');
  const result: BlockchainContext = yield call(blockchainContext.enableEthereum);
  yield put(connectMetamask.success({
    ethAddress: result.ethAddress || '0x',
    approvedNetwork: result.approvedNetwork,
    networkName: result.networkName,
    chainId: result.chainId || -1,
  }));
}

function* connectMetamaskSaga() {

  yield take(getType(connectMetamask.request));
  try {
    yield call(initialiseWallet);
  } catch (error) {
    console.log(error);
    yield put(connectMetamask.failure(error.message));
  }
}



function* blockchain() {
  const { approvedChainId, approvedNetworkName, isMetamaskInstalled }: BlockchainContext = yield getContext('blockchain');
  yield put(setWeb3({
    approvedChainId: approvedChainId,
    approvedNetworkName: approvedNetworkName,
    isMetamaskInstalled: isMetamaskInstalled,
  }));

  while (isMetamaskInstalled) {
    yield call(connectMetamaskSaga);
    yield fork(addressChangeListener);
  }
}

export default function* root() {
  yield fork(blockchain);
}