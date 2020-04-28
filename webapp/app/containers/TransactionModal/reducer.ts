/*
 *
 * TransactionModal reducer
 *
 */

import { ContainerState, ContainerActions } from './types';
import { setModalOpen, setTxContext, setTxHash } from './actions';
import { getType } from 'typesafe-actions';

export const initialState: ContainerState = {
  open: false,
  txContext: undefined,
  txHash: undefined,
};

function transactionModalReducer(state: ContainerState = initialState, action: ContainerActions) {
  switch (action.type) {
    case getType(setModalOpen):
      return {
        ...state,
        open: action.payload,
      };
    case getType(setTxContext):
      return {
        ...state,
        txContext: action.payload,
      }
    case getType(setTxHash):
      return {
        ...state,
        txHash: action.payload,
      }
    default:
      return state;
  }
}

export default transactionModalReducer;
