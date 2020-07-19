import React, { Component } from 'react'
import { View } from 'react-native'
import { Input } from 'react-native-elements'
import MapView, { Marker, Callout } from 'react-native-maps'

export default class MapInput extends Component {
  render() {
    return (
      <View style={{ height: 300 }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 51.5078788,
            longitude: -0.0877321,
            latitudeDelta: 0.009,
            longitudeDelta: 0.009,
          }}
        >
          <Marker
            draggable
            coordinate={{ latitude: 51.5078788, longitude: -0.0877321 }}
            title={'Mover el pin al punto donde encontraste al perro.'}
            onDragEnd={this.props.onDragEnd}
          />
        </MapView>
        <Input disabled placeholder="Calle" value={this.props.street}></Input>
        <Input disabled placeholder="Ciudad" value={this.props.city}></Input>
        <Input disabled placeholder="Pais" value={this.props.country}></Input>
      </View>
    )
  }
}
