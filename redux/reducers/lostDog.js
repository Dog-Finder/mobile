import { actions as lostDogActions } from '../actions/lostDog'

export default function lostDogReducer(state = {}, action) {
  switch (action.type) {
    case lostDogActions.POST_LOST_DOG:
      return { ...state, loading: true }
    case lostDogActions.POST_LOST_DOG_SUCCESS:
      return { ...state, loading: false }
    case lostDogActions.POST_LOST_DOG_FAIL:
      return { ...state, loading: false }
    default:
      return state
  }
}
