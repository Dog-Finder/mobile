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

export function getUserFoundDogListConfig(authToken) {
  return {
    url: '/found-dog/user',
    method: 'get',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }
}

export function deleteFoundDogConfig(authToken, foundId) {
  return {
    url: `/found-dog/${foundId}`,
    method: 'delete',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }
}
