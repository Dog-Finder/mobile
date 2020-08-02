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
