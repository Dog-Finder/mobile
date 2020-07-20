import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import * as Location from 'expo-location'
import { Input, Card, Image, Button } from 'react-native-elements'
import MapView, { Marker } from 'react-native-maps'
import DateTimeInput from 'components/inputs/DateTimeInput'
import { SexInput } from 'components/inputs/SexInput'
import MapInput from 'components/inputs/MapInput'

export default class FoundDogForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      sex: '',
      comentary: '',
      date: '',
      marker: {},
      address: {
        street: '',
        city: '',
        country: '',
      },
    }
    this.onDragEnd = this.onDragEnd.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
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

  onSubmit() {
    this.props.onSubmitHandler(1234, this.state)
  }

  render() {
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
            onChangeText={comentary => {
              this.setState({ comentary })
            }}
            value={this.state.comentary}
          ></Input>
        </Card>
        <Card title="Ubicación">
          <MapInput
            onDragEnd={this.onDragEnd}
            street={this.state.address.street}
            city={this.state.address.city}
            country={this.state.address.country}
          />
        </Card>
        <Card>
          <Button title="Submit" onPress={this.onSubmit}></Button>
        </Card>
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
