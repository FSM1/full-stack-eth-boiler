import { createAsyncAction, createStandardAction } from "typesafe-actions";

export const connectMetamask = createAsyncAction(
  'REQUEST/CONNECT_METAMASK',
  'SUCCESS/CONNECT_METAMASK',
  'FAILURE/CONNECT_METAMASK')
  <undefined,
    {
      approvedNetwork: boolean,
      ethAddress: string,
      networkName?: string,
      chainId: number
    },
    string>();

export const setWeb3 = createStandardAction('BLOCKCHAIN_READY')<{
  isMetamaskInstalled: boolean,
  approvedNetworkName: string,
  approvedChainId: number
}>();