import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import * as Location from 'expo-location'
import { Input, Card, Image, Button } from 'react-native-elements'
import DateTimeInput from 'components/inputs/DateTimeInput'
import { SexInput } from 'components/inputs/SexInput'
import MapInput from 'components/inputs/MapInput'

const FoundDogForm = ({ onSubmitHandler, pressPicture, imagePath }) => {
  const [name, setName] = useState('')
  const [sex, setSex] = useState('')
  const [commentary, setCommentary] = useState('')
  const [date, setDate] = useState(new Date())
  const [marker, setMarker] = useState({
    latitude: 51.5078788,
    longitude: -0.0877321,
  })
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [loading, setLoading] = useState(false)

  const setAddress = async marker => {
    const address = await Location.reverseGeocodeAsync(marker)
    const { street, city, country } = address[0]
    setStreet(street)
    setCity(city)
    setCountry(country)
  }

  useEffect(() => {
    async function initialLocation() {
      const { status } = await Location.requestPermissionsAsync()
      if (status === 'granted') {
        setAddress(marker)
      }
    }
    initialLocation()
  }, [])

  const onDragEnd = async event => {
    const coordinate = event.nativeEvent.coordinate
    setMarker(coordinate)
    setAddress(coordinate)
  }

  const onSubmit = () => {
    setLoading(true)
    const data = {
      name,
      sex,
      commentary,
      date,
      marker,
      address: { street, city, country },
    }
    onSubmitHandler(1234, data)
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
        <Input
          placeholder="Nombre"
          onChangeText={name => setName(name)}
          value={name}
        />
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
          street={street}
          city={city}
          country={country}
          onDragEnd={onDragEnd}
          onChangeStreet={street => setStreet(street)}
          onChangeCity={setCity}
          onChangeCountry={setCountry}
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
