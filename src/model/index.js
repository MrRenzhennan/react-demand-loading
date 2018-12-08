/*
* store
**/

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import React from 'react'
import { createLogger } from 'redux-logger'

import reducers, { initialState } from './reducers'

let enhancer = applyMiddleware(thunk)

if (process.env.NOOE_ENV === 'development') {
    enhancer = compose(
        applyMiddleware(thunk, createLogger())
    )
}

let store = createStore(
    reducers,
    initialState,
    enhancer
)

if (process.env.NOOE_ENV === 'development') {
    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextRootRdeucer = require('./reducers').default
            store.replaceReducer(nextRootRdeucer)
        })
    }
}

export default store
