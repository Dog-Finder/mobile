export const actions = {
  POST_FOUND_DOG: 'POST_FOUND_DOG',
  POST_FOUND_DOG_SUCCESS: 'POST_FOUND_DOG_SUCCESS',
  POST_FOUND_DOG_FAIL: 'POST_FOUND_DOG_FAIL',
  FOUND_DOG_LIST: 'FOUND_DOG_LIST',
  FOUND_DOG_LIST_SUCCESS: 'FOUND_DOG_LIST_SUCCESS',
  FOUND_DOG_LIST_FAIL: 'FOUND_DOG_LIST_FAIL',
}

export function postFoundDog(authToken, data) {
  return {
    type: actions.POST_FOUND_DOG,
    payload: {
      request: {
        url: `/found-dog`,
        method: 'post',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        data,
      },
    },
  }
}

export function getFoundDogList(authToken) {
  return {
    type: actions.FOUND_DOG_LIST,
    payload: {
      request: {
        url: '/found-dog',
        method: 'get',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    },
  }
}
