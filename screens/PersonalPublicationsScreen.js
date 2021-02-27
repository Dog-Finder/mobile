import React, { useState, useEffect, useContext } from 'react'
import { View, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Constants from 'expo-constants'
import { Button } from 'react-native-elements'
import Context from '@context/context'
import MyPostedDogItem from '../components/MyPostedDog/MyPostedDogItem'
import { getUserFoundDogList, getUserLostDogList } from '../api'

const PersonalPublicationsScreen = ({ navigation }) => {
  const context = useContext(Context)
  const [myFoundDogList, setMyFoundDogList] = useState([])
  const [myLostDogList, setMyLostDogList] = useState([])
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const [showLostDogs, setShowLostDogs] = useState(true)
  const [showFoundDogs, setShowFoundDogs] = useState(true)
  const getCurrentLocation = async () => {
    navigator.geolocation.getCurrentPosition(async position => {
      setLatitude(parseFloat(position.coords.latitude))
      setLongitude(parseFloat(position.coords.longitude))
    })
  }
  //used to compare dog publications by date, to sort them
  function compareDogsByDate(field) {
    return function(dog1, dog2) {
      const dateDog1 = new Date(dog1[field]),
        dateDog2 = new Date(dog2[field])
      return dateDog2 - dateDog1
    }
  }

  useEffect(() => {
    // eslint-disable-next-line prettier/prettier
    (async () => {
      const { token } = context
      const { data } = await getUserFoundDogList(token)
      const orderDogDates = data.resource
      orderDogDates.sort(compareDogsByDate('date'))
      setMyFoundDogList(orderDogDates)
      getCurrentLocation()
    })()
  }, [])

  useEffect(() => {
    // eslint-disable-next-line prettier/prettier
    (async () => {
      const { token } = context
      const { data } = await getUserLostDogList(token)
      const orderDogDates = data.resource
      orderDogDates.sort(compareDogsByDate('date'))
      setMyLostDogList(orderDogDates)
    })()
  }, [])

  const foundDogItems = myFoundDogList.map((foundDog, i) => {
    return (
      <MyPostedDogItem
        key={i}
        dog={foundDog}
        navigator={navigation}
        userCoordinates={{
          latitude,
          longitude,
        }}
        type={'found'}
      ></MyPostedDogItem>
    )
  })
  const lostDogItems = myLostDogList.map((lostDog, i) => {
    return (
      <MyPostedDogItem
        key={i}
        dog={lostDog}
        navigator={navigation}
        userCoordinates={{
          latitude,
          longitude,
        }}
        type={'lost'}
      ></MyPostedDogItem>
    )
  })

  return (
    <SafeAreaView styles={styles.container}>
      <ScrollView styles={styles.scrollView}>
        <Button
          title="Mis perros perdidos"
          onPress={() => setShowLostDogs(!showLostDogs)}
        />
        {showLostDogs ? (
          <View style={styles.listView}>{lostDogItems}</View>
        ) : null}
        {/* Aca hay un bug raro en que a veces hay que apretar dos veces el de perros encontrados para que funcione */}
        <Button
          title="Mis perros encontrados"
          onPress={() => setShowFoundDogs(!showFoundDogs)}
        />
        {showFoundDogs ? (
          <View style={styles.listView}>{foundDogItems}</View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  )
}

PersonalPublicationsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },

  listView: {
    marginBottom: 10,
  },

  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
})

export default PersonalPublicationsScreen
