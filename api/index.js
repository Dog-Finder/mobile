import axios from 'axios'

import { postFoundDogConfig, getFoundDogListConfig } from './foundDog'
import { postLostDogConfig, getLostDogListConfig } from './lostDog'
import { getSignedUrlConfig } from './images'
import { signUpConfig, logInConfig } from './user'

const client = axios.create({
  // baseURL: 'https://all31gfkx0.execute-api.us-east-1.amazonaws.com/dev',
  baseURL: 'http://localhost:3000/staging',
  responseType: 'json',
  requestType: 'json',
})

export function postFoundDog(authToken, data) {
  return client.request(postFoundDogConfig(authToken, data))
}
export function getFoundDogList(authToken) {
  return client.request(getFoundDogListConfig(authToken))
}
export function postLostDog(authToken, data) {
  return client.request(postLostDogConfig(authToken, data))
}
export function getLostDogList(authToken) {
  return client.request(getLostDogListConfig(authToken))
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
