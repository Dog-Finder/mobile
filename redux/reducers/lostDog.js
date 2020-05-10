import { actions as lostDogActions } from '../actions/lostDog'

export default function lostDogReducer(state = {}, action) {
  switch (action.type) {
    case lostDogActions.POST_LOST_DOG:
      return { ...state, loading: true }
    case lostDogActions.POST_LOST_DOG_SUCCESS:
      return { ...state, loading: false }
    case lostDogActions.POST_LOST_DOG_FAIL:
      return { ...state, loading: false }
    case lostDogActions.LOST_DOG_LIST:
      return { ...state, loading: true }
    case lostDogActions.LOST_DOG_LIST_SUCCESS:
      return { ...state, loading: false }
    case lostDogActions.LOST_DOG_LIST_FAIL:
      return { ...state, loading: false }
    default:
      return state
  }
}
