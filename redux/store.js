import { createStore, applyMiddleware } from 'redux'
import axiosMiddleware from 'redux-axios-middleware'
import thunk from 'redux-thunk'
import axios from 'axios'

import rootReducer from './reducers'
import foundDog from './models/foundDog'
import lostDog from './models/lostDog'

export const client = axios.create({
  // baseURL: 'https://oc4igqmvr3.execute-api.us-east-1.amazonaws.com/playground',
  baseURL: 'http://localhost:3000/playground',
  responseType: 'json',
  requestType: 'json',
})

const preloadedState = {
  lostDog,
  foundDog,
  images: {},
}

const middlewares = [axiosMiddleware(client), thunk]
const enhancer = applyMiddleware(...middlewares)

export default createStore(rootReducer, preloadedState, enhancer)
