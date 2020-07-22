import React, { useState } from 'react'
import { View } from 'react-native'
import { Input } from 'react-native-elements'
import MapView, { Marker, Callout } from 'react-native-maps'
import PropTypes from 'prop-types'

const MapInput = props => {
  return (
    <View style={{ height: 300 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: props.marker.latitude,
          longitude: props.marker.longitude,
          latitudeDelta: 0.009,
          longitudeDelta: 0.009,
        }}
      >
        <Marker
          draggable
          coordinate={props.marker}
          title={'Mover el pin al punto donde encontraste al perro.'}
          onDragEnd={props.onDragEnd}
        />
      </MapView>
      <Input
        onChangeText={props.onChangeStreet}
        placeholder="Calle"
        value={props.street}
      ></Input>
      <Input
        onChangeText={props.onChangeCity}
        placeholder="Ciudad"
        value={props.city}
      ></Input>
      <Input
        onChangeText={props.onChangeCountry}
        placeholder="Pais"
        value={props.country}
      ></Input>
    </View>
  )
}

MapInput.propTypes = {
  marker: PropTypes.object.isRequired,
  street: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  onDragEnd: PropTypes.func.isRequired,
  onChangeStreet: PropTypes.func.isRequired,
  onChangeCity: PropTypes.func.isRequired,
  onChangeCountry: PropTypes.func.isRequired,
}

export default MapInput
