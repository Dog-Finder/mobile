export const actions = {
  POST_FOUND_DOG: 'POST_FOUND_DOG',
  POST_FOUND_DOG_SUCCESS: 'POST_FOUND_DOG_SUCCESS',
  POST_FOUND_DOG_FAIL: 'POST_FOUND_DOG_FAIL',
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
