import axios from 'axios'

import {
  postFoundDogConfig,
  getFoundDogListConfig,
  getUserFoundDogListConfig,
  deleteFoundDogConfig,
} from './foundDog'
import {
  postLostDogConfig,
  getLostDogListConfig,
  getUserLostDogListConfig,
  deleteLostDogConfig,
} from './lostDog'
import { getSignedUrlConfig } from './images'
import { signUpConfig, logInConfig, getUserDetailConfig } from './user'
import { searchKNNConfig } from './search'

const client = axios.create({
  // baseURL: 'https://all31gfkx0.execute-api.us-east-1.amazonaws.com/dev', // production
  // baseURL: 'https://yi54rctdb2.execute-api.us-east-1.amazonaws.com/staging', // staging
  baseURL: 'http://localhost:3000/dev', // local
  responseType: 'json',
  requestType: 'json',
})

export function postFoundDog(authToken, data) {
  return client.request(postFoundDogConfig(authToken, data))
}
export function getFoundDogList(authToken) {
  return client.request(getFoundDogListConfig(authToken))
}
export function getUserFoundDogList(authToken) {
  return client.request(getUserFoundDogListConfig(authToken))
}
export function postLostDog(authToken, data) {
  return client.request(postLostDogConfig(authToken, data))
}
export function getLostDogList(authToken) {
  return client.request(getLostDogListConfig(authToken))
}
export function getUserLostDogList(authToken) {
  return client.request(getUserLostDogListConfig(authToken))
}
export function getSignedUrl(authToken) {
  return client.request(getSignedUrlConfig(authToken))
}
export function signUp(data) {
  return client.request(signUpConfig(data))
}
export function logIn(data) {
  return client.request(logInConfig(data))
}
export function getUserDetail(authToken) {
  return client.request(getUserDetailConfig(authToken))
}
export function deleteLostDog(authToken, lostId) {
  return client.request(deleteLostDogConfig(authToken, lostId))
}
export function deleteFoundDog(authToken, foundId) {
  return client.request(deleteFoundDogConfig(authToken, foundId))
}
export function searchKNN(authToken, imageLink, index) {
  return client.request(searchKNNConfig(authToken, imageLink, index))
}
