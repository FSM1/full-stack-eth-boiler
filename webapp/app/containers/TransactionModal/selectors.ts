import { createSelector, createStructuredSelector } from 'reselect';
import { RootState } from './types';
import { StateProps } from '.';

/**
 * Direct selector to the transactionModal state domain
 */

const selectTransactionModal = createStructuredSelector<RootState, StateProps>({
  open: createSelector((state: RootState) => state.transactionModal.open, (substate) => substate),
  txContext: createSelector((state: RootState) => state.transactionModal.txContext, (substate) => substate),
  txHash: createSelector((state: RootState) => state.transactionModal.txHash, (substate) => substate),
});

export default selectTransactionModal;