import { Reducer, Store } from 'redux';
import { ContainerState as AppState } from '../containers/App/types';
import { ContainerState as TransactionModalState } from '../containers/TransactionModal/types';
import { UtilityState } from '../containers/PoolDetailsPage/types';
import { PoolState } from 'containers/App/poolsReducer';

export interface LifeStore extends Store<ApplicationRootState> {
  injectedReducers: any;
  injectedSagas: any;
  runSaga(saga: (() => IterableIterator<any>) | undefined, args: any | undefined): any;
  [Symbol.observable](): Observable<S>;
}

export interface InjectReducerParams {
  key: keyof ApplicationRootState;
  reducer: Reducer<any, any>;
}

export interface InjectSagaParams {
  key: keyof ApplicationRootState;
  saga: () => IterableIterator<any>;
  mode?: string | undefined;
}

// Your root reducer type, which is your redux state types also
export interface ApplicationRootState {
  readonly app: AppState;
  readonly transactionModal: TransactionModalState;
}
