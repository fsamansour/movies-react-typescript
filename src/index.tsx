import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { AppStore, AppPersistStore } from './Store';
import { PersistGate } from 'redux-persist/integration/react';
import { Router } from "react-router-dom";
import { createBrowserHistory } from 'history';

const history = createBrowserHistory({
    keyLength: 6
});

ReactDOM.render(
    <Provider store={AppStore}>
        <PersistGate loading={null} persistor={AppPersistStore}>
            <Router history={history}>
                <App/>
            </Router>
        </PersistGate>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
