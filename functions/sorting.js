//used to compare dog publications by date, to sort them
export function compareDogsByDate() {
  return function(dog1, dog2) {
    const dateDog1 = new Date(dog1['date']),
      dateDog2 = new Date(dog2['date'])
    return dateDog2 - dateDog1
  }
}
//used to compare dog publications by distance, to sort them
export function compareDogsByDistance() {
  return function(dog1, dog2) {
    return dog1['distance'] - dog2['distance']
  }
}
