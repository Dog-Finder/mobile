export function postLostDogConfig(authToken, data) {
  return {
    url: `/lost-dog`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    data,
  }
}

export function getLostDogListConfig(authToken) {
  return {
    url: '/lost-dog',
    method: 'get',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }
}
