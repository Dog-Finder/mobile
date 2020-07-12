import { combineReducers } from 'redux'
import lostDogReducer from './lostDog'
import foundDogReducer from './foundDog'
import imagesReducer from './images'

export default combineReducers({
  lostDog: lostDogReducer,
  foundDog: foundDogReducer,
  images: imagesReducer,
})
