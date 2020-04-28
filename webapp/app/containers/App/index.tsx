/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { connect } from 'react-redux';
import { Switch, withRouter } from 'react-router';
import { compose, Dispatch } from 'redux';
import { Redirect, Route } from 'react-router-dom';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { DAEMON } from 'utils/constants';
import saga from './saga';
import reducer from './reducer';

import selectApp from './selectors';

import AppWrapper from '../../components/AppWrapper/index';
import Notification from '../Notification'
import { connectMetamask } from './actions';
import TransactionModal from 'containers/TransactionModal';

interface OwnProps {
  isMetamaskInstalled: boolean,
  ethAddress?: string,
}

export interface StateProps {
  isMetamaskInstalled: boolean,
  ethAddress?: string,
  authorizedNetwork: boolean,
  approvedNetworkName: string,
}

export interface DispatchProps {
  connect(): void;
}

type Props = StateProps & DispatchProps & OwnProps;

const NotFoundRedirect = () => <Redirect to='/404' />

// const ProtectedRoute: React.FunctionComponent<any> = ({ component: Component, isAuthorized, ...rest }) => (
//   <Route
//     {...rest}
//     render={props => (
//       isAuthorized ? (
//         <Component {...props} />
//       ) : (
//           <Redirect
//             to={{
//               pathname: '/403',
//               state: { from: props.location },
//             }}
//           />
//         )
//     )}
//   />
// );

const App: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <>
      <Notification />
      <TransactionModal />
      <AppWrapper {...props}>
        <Switch>
          <Route exact path='/404'>Not Found</Route>
          <Route exact path='/403'>You are not authorized to view this page</Route>
          <Route component={NotFoundRedirect} />
        </Switch>
      </AppWrapper>
    </>
  );
};

const mapStateToProps = state => selectApp(state);

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  connect: () => dispatch(connectMetamask.request()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer<OwnProps>({ key: 'app', reducer: reducer });
const withSaga = injectSaga<OwnProps>({ key: 'app', saga: saga, mode: DAEMON });


export default compose(
  withRouter,
  withReducer,
  withSaga,
  withConnect,
)(App);