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

export function getUserLostDogListConfig(authToken) {
  return {
    url: '/lost-dog/user',
    method: 'get',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }
}

export function deleteLostDogConfig(authToken, lostId) {
  return {
    url: `/lost-dog/${lostId}`,
    method: 'delete',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }
}
