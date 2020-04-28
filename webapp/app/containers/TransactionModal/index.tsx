/**
 *
 * TransactionModal
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import { Dialog} from '@material-ui/core';
import selectTransactionModal from './selectors';
import TransactionPopup from 'components/TransactionPopup';

interface OwnProps { }

interface DispatchProps { }

export interface StateProps {
  open: boolean;
  txContext?: string;
  txHash?: string;
}

type Props = StateProps & DispatchProps & OwnProps;

const TransactionModal: React.FunctionComponent<Props> = ({ open, txContext, txHash }: Props) => (
  <Dialog open={open}>
   <TransactionPopup txContext={txContext} txHash={txHash}></TransactionPopup>
  </Dialog>
);

const mapStateToProps = (state) => selectTransactionModal(state);

const mapDispatchToProps = (
  dispatch: Dispatch,
  ownProps: OwnProps,
): DispatchProps => {
  return {
    dispatch: dispatch,
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

// Remember to add the key to ./app/types/index.d.ts ApplicationRootState
// <OwnProps> restricts access to the HOC's other props. This component must not do anything with reducer hoc
const withReducer = injectReducer<OwnProps>({
  key: 'transactionModal',
  reducer: reducer,
});
// <OwnProps> restricts access to the HOC's other props. This component must not do anything with saga hoc
const withSaga = injectSaga<OwnProps>({ key: 'transactionModal', saga: saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TransactionModal);
