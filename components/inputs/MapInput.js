import React, { useEffect } from 'react'
import { View } from 'react-native'
import { Input } from 'react-native-elements'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import PropTypes from 'prop-types'

const MapInput = props => {
  useEffect(() => {
    async function initialLocation() {
      const { status } = await Location.requestPermissionsAsync()
      if (status === 'granted') {
        props.getCurrentLocation(this.mapView)
      }
    }
    initialLocation()
  }, [])
  return (
    <View style={{ height: 300 }}>
      <MapView
        style={{ flex: 1 }}
        initialregion={props.initialRegion}
        onPress={props.onDragEnd}
        ref={ref => (this.mapView = ref)}
      >
        <Marker
          draggable
          coordinate={props.marker}
          title={'Mover al punto donde encontraste al perro.'}
          onDragEnd={props.onDragEnd}
        />
      </MapView>
      <Input
        onChangeText={props.onChangeStreet}
        placeholder="Calle"
        value={props.street + ' ' + props.number}
        disabled={true}
      ></Input>
      <Input
        onChangeText={props.onChangeCity}
        placeholder="Ciudad"
        value={props.city}
        disabled={true}
      ></Input>
      <Input
        onChangeText={props.onChangeCountry}
        placeholder="Pais"
        value={props.country}
        disabled={true}
      ></Input>
    </View>
  )
}

MapInput.propTypes = {
  marker: PropTypes.object.isRequired,
  number: PropTypes.string,
  street: PropTypes.string,
  city: PropTypes.string,
  country: PropTypes.string,
  initialRegion: PropTypes.object.isRequired,
  onDragEnd: PropTypes.func.isRequired,
  onChangeStreet: PropTypes.func.isRequired,
  onChangeCity: PropTypes.func.isRequired,
  onChangeCountry: PropTypes.func.isRequired,
  getCurrentLocation: PropTypes.func.isRequired,
}

export default MapInput
