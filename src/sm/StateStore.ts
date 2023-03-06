import { configureStore } from '@reduxjs/toolkit';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import { PageReducer } from './PageReducer';
import { WalletReducer } from './WalletStateReducer';
import { BrowserHistory, createBrowserHistory } from 'history';
import thunk from 'redux-thunk';

export const history = createBrowserHistory();

const rootReducer = (history : BrowserHistory) => ({
    pageReducer : PageReducer,
    walletStateReducer : WalletReducer,
    router: connectRouter(history)
});

const preloadedState = {};

export const StateStore = configureStore({
    middleware: [thunk, routerMiddleware(history)],
    reducer: rootReducer(history),
    preloadedState,
});