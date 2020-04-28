/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import '@babel/polyfill';

// Import all the third party stuff
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'sanitize.css/sanitize.css';

// Import root app
import App from 'containers/App';

// Load the favicon and the .htaccess file
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import 'file-loader?name=[name].[ext]!./.htaccess'; // eslint-disable-line import/extensions

import throttle from 'lodash/throttle';
import configureStore from './configureStore';
import history from './utils/history';
import { loadState } from './utils/localStorage';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { Router } from 'react-router';
import theme from 'theme';
import { SnackbarProvider } from 'notistack';
import ScrollToTop from './scrollToTop';

const persistedState = loadState();
const store = configureStore(persistedState);

store.subscribe(throttle(() => {

}, 1000));

const MOUNT_NODE = document.getElementById('app') as HTMLElement;

const render = (Component = App) => {
  ReactDOM.render(
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <SnackbarProvider
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          autoHideDuration={10000}
          maxSnack={5} >
          <Router history={history}>
            <ScrollToTop>
              <Component />
            </ScrollToTop>
          </Router>
        </SnackbarProvider>
      </MuiThemeProvider>
    </Provider>,
    MOUNT_NODE,
  );
};

declare const module: any;
if (module.hot) {
  module.hot.accept(['./containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    // tslint:disable-next-line:max-line-length
    const App = require('./containers/App').default; // https://github.com/webpack/webpack-dev-server/issues/100
    render(App);
  });
}

// We need the providers injected for the app to load
window.addEventListener('load', () => render(), { once: true });
