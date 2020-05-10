import { createStore, applyMiddleware } from 'redux'
import axiosMiddleware from 'redux-axios-middleware'
import thunk from 'redux-thunk'
import axios from 'axios'

import rootReducer from './reducers'

export const client = axios.create({
  baseURL: 'https://oc4igqmvr3.execute-api.us-east-1.amazonaws.com/playground',
  responseType: 'json',
  requestType: 'json',
})

const middlewares = [axiosMiddleware(client), thunk]

export default createStore(rootReducer, applyMiddleware(...middlewares))
