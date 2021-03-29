const getCurrentLocation = async context => {
  navigator.geolocation.getCurrentPosition(async position => {
    context.setUserLatitude(parseFloat(position.coords.latitude))
    context.setUserLongitude(parseFloat(position.coords.longitude))
  })
}
export default getCurrentLocation
