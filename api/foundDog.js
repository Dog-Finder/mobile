export function postFoundDogConfig(authToken, data) {
  return {
    url: `/found-dog`,
    method: 'post',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    data,
  }
}

export function getFoundDogListConfig(authToken) {
  return {
    url: '/found-dog',
    method: 'get',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }
}
