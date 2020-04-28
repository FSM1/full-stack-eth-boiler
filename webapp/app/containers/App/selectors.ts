
import { createStructuredSelector, createSelector } from 'reselect';
import { RootState } from './types';
import { StateProps } from 'containers/App';
import { ApplicationRootState } from 'types';

export const selectEthAddress = createSelector((state: ApplicationRootState) => state.app.ethAddress, substate => substate);

const selectApp = createStructuredSelector<RootState, StateProps>({
  isMetamaskInstalled: createSelector((state: ApplicationRootState) => state.app.isMetamaskInstalled, substate => substate),
  ethAddress: selectEthAddress,
  authorizedNetwork: createSelector((state: ApplicationRootState) => state.app.approvedNetwork, substate => substate),
  approvedNetworkName: createSelector((state: ApplicationRootState) => state.app.approvedNetworkName, substate => substate),
});

export default selectApp;
