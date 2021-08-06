import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger/src';
import requests from './features/requests'
import agent from './features/agent';
import login from './features/login';
import { composeWithDevTools } from 'redux-devtools-extension';

const logger = createLogger({
  diff: true,
  collapsed: true
})

export const store = createStore(
  combineReducers( {requests: requests, agent: agent, login: login}),
  composeWithDevTools(applyMiddleware( thunk))
)