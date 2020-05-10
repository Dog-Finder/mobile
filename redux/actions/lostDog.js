export const actions = {
  POST_LOST_DOG: 'POST_LOST_DOG',
  POST_LOST_DOG_SUCCESS: 'POST_LOST_DOG_SUCCESS',
  POST_LOST_DOG_FAIL: 'POST_LOST_DOG_FAIL',
  LOST_DOG_LIST: 'LOST_DOG_LIST',
  LOST_DOG_LIST_SUCCESS: 'LOST_DOG_LIST_SUCCESS',
  LOST_DOG_LIST_FAIL: 'LOST_DOG_LIST_FAIL',
}

export function postLostDog(authToken, data) {
  return {
    type: actions.POST_LOST_DOG,
    payload: {
      request: {
        url: `/lost-dog`,
        method: 'post',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        data,
      },
    },
  }
}

export function getLostDogList(authToken) {
  return {
    type: actions.LOST_DOG_LIST,
    payload: {
      request: {
        url: '/lost-dog',
        method: 'get',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    },
  }
}
