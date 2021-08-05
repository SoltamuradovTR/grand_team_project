import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger/src';
import requests from './features/requests'

const logger = createLogger({
  diff: true,
  collapsed: true
})

export const store = createStore(
  combineReducers( {requests: requests}),
  applyMiddleware( thunk, logger)
)