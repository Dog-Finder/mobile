export const actions = {
  GET_URL: 'GET_URL',
  GET_URL_SUCCESS: 'GET_URL_SUCCESS',
  GET_URL_FAIL: 'GET_URL_FAIL',
}

export function getSignedUrl(authToken) {
  return {
    type: actions.GET_URL,
    payload: {
      request: {
        url: `/upload`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    },
  }
}
