export function getSignedUrlConfig(authToken) {
  return {
    url: `/upload`,
    method: 'get',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }
}
