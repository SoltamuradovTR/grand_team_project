import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger/src";
import requests from "./features/requests";
import agent from "./features/agent";
import login from "./features/login";
import { composeWithDevTools } from "redux-devtools-extension";
import registration from "./features/registration";
import review from "./features/review";

const logger = createLogger({
  diff: true,
  collapsed: true,
});

export const lsLogin = localStorage.getItem("login-reducer");

export const store = createStore(
  combineReducers({ requests, agent, login, registration, review }),
  {
    login: lsLogin ? JSON.parse(lsLogin) : undefined,
  },
  composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("login-reducer", JSON.stringify(state.login));
});
