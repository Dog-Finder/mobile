import React, { Component, useState } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import * as Location from 'expo-location'
import { Input, Card, Image } from 'react-native-elements'
import MapView, { Marker, Callout } from 'react-native-maps'
import DateTimeInput from 'components/inputs/DateTimeInput'
import { SexInput } from 'components/inputs/SexInput'
import MapInput from 'components/inputs/MapInput'

export default class FoundDogForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      sex: '',
      commentary: '',
      date: '',
      marker: {},
      address: {
        street: '',
        city: '',
        country: '',
      },
    }
    this.onDragEnd = this.onDragEnd.bind(this)
  }

  async onDragEnd(event) {
    const coordinate = event.nativeEvent.coordinate
    this.setState({ marker: coordinate })
    const address = await Location.reverseGeocodeAsync(coordinate)
    this.setState({
      address: {
        street: address[0].street,
        city: address[0].city,
        country: address[0].country,
      },
    })
  }

  // console.log(this.state)
  render() {
    // console.log(this.state)
    return (
      <View>
        <Card title="Información General">
          <TouchableOpacity onPress={this.props.pressPicture}>
            <Image
              style={styles.image}
              resizeMode="cover"
              source={{ uri: this.props.imagePath }}
            />
          </TouchableOpacity>
          <Input
            placeholder="Nombre"
            onChangeText={name => {
              this.setState({ name })
            }}
            value={this.state.name}
          />
          <DateTimeInput
            placeholder="¿Cuándo lo encontraste?"
            isVisible={false}
            onConfirm={date => {
              this.setState({ date })
            }}
            onCancel={() => {}}
          />
          <SexInput
            onValueChange={sex => {
              this.setState({ sex })
            }}
          />
          <Input
            placeholder="Descripción"
            onChangeText={commentary => {
              this.setState({ commentary })
            }}
            value={this.state.commentary}
          ></Input>
        </Card>
        {/* <Card title="Ubicación">
        <MapInput
          onDragEnd={this.onDragEnd}
          street={this.state.address.street}
          city={this.state.address.city}
          country={this.state.address.country}
        />
      </Card> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: 300,
    width: null,
  },
})
