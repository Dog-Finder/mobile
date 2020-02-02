export const actions = {
  POST_LOST_DOG: 'POST_LOST_DOG',
  POST_LOST_DOG_SUCCESS: 'POST_LOST_DOG_SUCCESS',
  POST_LOST_DOG_FAIL: 'POST_LOST_DOG_FAIL',
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
