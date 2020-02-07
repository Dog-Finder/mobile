import { actions as imagesActions } from '../actions/images'

export default function imagesReducer(state = {}, action) {
  switch (action.type) {
    case imagesActions.GET_URL:
      return { ...state, loading: true }
    case imagesActions.GET_URL_SUCCESS:
      return { ...state, loading: false }
    case imagesActions.GET_URL_FAIL:
      return { ...state, loading: false }
    default:
      return state
  }
}
