import { createStore, compose, Store } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { RootReducer } from './reducers';
import { StoreState } from "./types";

// Persist store config
const persistConfig = {
    key: 'root',
    storage
};


let composeEnhancers;
const persistedReducer = persistReducer(persistConfig, RootReducer);

// @ts-ignore
if (process.env.NODE_ENV.includes("development")) {
    // @ts-ignore
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
} else {
    composeEnhancers = compose;
}

export const AppStore = createStore(
    persistedReducer,
    composeEnhancers()
) as Store<StoreState>;
export const AppPersistStore = persistStore(AppStore);
