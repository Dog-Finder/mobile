export function signUpConfig(data) {
  return {
    url: `/sign-up`,
    method: 'post',
    data,
  }
}

export function logInConfig(data) {
  return {
    url: '/log-in',
    method: 'post',
    data,
  }
}

export function getUserDetailConfig(authToken) {
  return {
    url: '/user',
    method: 'get',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }
}

export function restoreSessionConfig(authToken) {
  return {
    url: '/restore',
    method: 'post',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }
}
