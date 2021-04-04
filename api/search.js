export function searchKNNConfig(authToken, imageLink) {
  return {
    url: '/search',
    method: 'post',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    data: { imageLink },
  }
}
