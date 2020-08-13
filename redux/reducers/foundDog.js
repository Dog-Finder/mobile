import { actions as foundDogActions } from '../actions/foundDog'

export default function foundDogReducer(state = {}, action) {
  switch (action.type) {
    case foundDogActions.POST_FOUND_DOG:
      return { ...state, loading: true }
    case foundDogActions.POST_FOUND_DOG_SUCCESS:
      return { ...state, loading: false }
    case foundDogActions.POST_FOUND_DOG_FAIL:
      return { ...state, loading: false }
    case foundDogActions.FOUND_DOG_LIST:
      return { ...state, loading: true }
    case foundDogActions.FOUND_DOG_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        foundDogList: action.payload.data.resource,
      }
    case foundDogActions.FOUND_DOG_LIST_FAIL:
      return { ...state, loading: false }
    default:
      return state
  }
}
