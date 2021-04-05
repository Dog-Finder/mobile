export function searchKNNConfig(authToken, imageLink, index) {
  return {
    url: '/search',
    method: 'post',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    data: { imageLink, index },
  }
}
