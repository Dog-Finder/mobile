import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import * as Location from 'expo-location'
import { Input, Card, Image, Button } from 'react-native-elements'
import DateTimeInput from 'components/inputs/DateTimeInput'
import { SexInput } from 'components/inputs/SexInput'
import MapInput from 'components/inputs/MapInput'

const FoundDogForm = ({ onSubmitHandler, pressPicture, imagePath }) => {
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
    setNumber(name)
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

  const onSubmit = () => {
    setLoading(true)
    const data = {
      sex,
      commentary,
      date,
      marker,
      address: { street, city, country },
    }
    onSubmitHandler(data)
  }

  return (
    <View>
      <Card title="Información General">
        <TouchableOpacity onPress={pressPicture}>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={{ uri: imagePath }}
          />
        </TouchableOpacity>
        <DateTimeInput
          placeholder="¿Cuándo lo encontraste?"
          isVisible={false}
          onConfirm={date => setDate(date)}
          onCancel={() => {}}
        />
        <SexInput onValueChange={sex => setSex(sex)} />
        <Input
          placeholder="Descripción"
          onChangeText={commentary => setCommentary(commentary)}
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
          onChangeStreet={street => setStreet(street)}
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

FoundDogForm.propTypes = {
  onSubmitHandler: PropTypes.func.isRequired,
  imagePath: PropTypes.string.isRequired,
  pressPicture: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: 300,
    width: null,
  },
})

export default FoundDogForm
