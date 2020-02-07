import { combineReducers } from 'redux'
import lostDogReducer from './lostDog'
import imagesReducer from './images'

export default combineReducers({ lostDogReducer, imagesReducer })
