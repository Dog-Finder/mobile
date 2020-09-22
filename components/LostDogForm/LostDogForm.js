import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import * as Location from 'expo-location'
import { Input, Card, Image, Button } from 'react-native-elements'
import DateTimeInput from 'components/inputs/DateTimeInput'
import { SexInput } from 'components/inputs/SexInput'
import MapInput from 'components/inputs/MapInput'

const LostDogForm = ({ onSubmitHandler, pressPicture, imagePath }) => {
  const [name, setName] = useState('')
  const [sex, setSex] = useState('')
  const [commentary, setCommentary] = useState('')
  const [date, setDate] = useState(new Date())
  const [marker, setMarker] = useState({
    latitude: -33.4376,
    longitude: 70.6332,
  })
  const [initialRegion, setinitialRegion] = useState({
    latitude: -33.4376,
    longitude: 70.6332,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009,
  })
  const [number, setNumber] = useState('') //number in street is called name on address object
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [loading, setLoading] = useState(false)

  const setAddress = async marker => {
    const address = await Location.reverseGeocodeAsync(marker)
    const { name, street, city, country } = address[0]
    setNumber(name) //this name is the street number, do not confuse with dog name
    setStreet(street)
    setCity(city)
    setCountry(country)
  }
  const getCurrentLocation = async mapRef => {
    navigator.geolocation.getCurrentPosition(async position => {
      const region = {
        latitude: parseFloat(position.coords.latitude),
        longitude: parseFloat(position.coords.longitude),
        latitudeDelta: 0.009,
        longitudeDelta: 0.009,
      }
      setinitialRegion(region)
      setMarker({
        latitude: region.latitude,
        longitude: region.longitude,
      })
      setAddress({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })
      mapRef.animateToRegion(region)
    })
  }

  const onDragEnd = async event => {
    const coordinate = event.nativeEvent.coordinate
    setMarker(coordinate)
    setAddress(coordinate)
  }

  const onSubmit = async () => {
    setLoading(true)
    const data = {
      name,
      sex,
      commentary,
      date,
      marker,
      address: { street, city, country },
    }
    await onSubmitHandler(data)
    setLoading(false)
  }
  return (
    <View>
      <Card title="Información General">
        <TouchableOpacity onPress={pressPicture}>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={
              imagePath
                ? { uri: imagePath }
                : require('../../assets/images/chooseFromGallery.webp')
            }
          />
        </TouchableOpacity>
        <Input placeholder="Nombre" onChangeText={setName} value={name} />
        <DateTimeInput
          placeholder="¿Cuándo lo encontraste?"
          isVisible={false}
          onConfirm={setDate}
          onCancel={() => {}}
        />
        <SexInput onValueChange={setSex} />
        <Input
          placeholder="Descripción"
          onChangeText={setCommentary}
          value={commentary}
        ></Input>
      </Card>
      <Card title="Ubicación">
        <MapInput
          marker={marker}
          number={number} //number is street number of location
          street={street}
          city={city}
          country={country}
          initialRegion={initialRegion}
          onDragEnd={onDragEnd}
          onChangeStreet={setStreet}
          onChangeCity={setCity}
          onChangeCountry={setCountry}
          getCurrentLocation={getCurrentLocation}
        />
      </Card>
      <Card>
        <Button title="Submit" onPress={onSubmit} loading={loading}></Button>
      </Card>
    </View>
  )
}

LostDogForm.propTypes = {
  onSubmitHandler: PropTypes.func.isRequired,
  imagePath: PropTypes.string,
  pressPicture: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: 300,
    width: null,
  },
})

export default LostDogForm
