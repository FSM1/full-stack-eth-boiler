import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import { ApplicationRootState } from 'types';

/* --- STATE --- */
interface TransactionModalState {
  readonly open: boolean;
  readonly txContext?: string;
  readonly txHash?: string;
}

/* --- ACTIONS --- */
type TransactionModalActions = ActionType<typeof actions>;

/* --- EXPORTS --- */

type RootState = ApplicationRootState;
type ContainerState = TransactionModalState;
type ContainerActions = TransactionModalActions;

export { RootState, ContainerState, ContainerActions };
