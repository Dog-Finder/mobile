import React, { useState, useEffect } from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Constants from 'expo-constants'

import LostDogItem from '../components/LostDog/LostDogItem'
import { getLostDogList } from '../api'

const LostDogListScreen = ({ navigation }) => {
  const [lostDogList, setLostDogList] = useState([])
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const getCurrentLocation = async () => {
    navigator.geolocation.getCurrentPosition(async position => {
      setLatitude(parseFloat(position.coords.latitude))
      setLongitude(parseFloat(position.coords.longitude))
    })
  }
  useEffect(() => {
    // eslint-disable-next-line prettier/prettier
    (async () => {
      const { data } = await getLostDogList(1234)
      setLostDogList(data.resource)
      getCurrentLocation()
    })()
  }, [])

  const lostDogItems = lostDogList.map((lostDog, i) => {
    return (
      <LostDogItem
        key={i}
        dog={lostDog}
        navigator={navigation}
        userCoordinates={{
          latitude,
          longitude,
        }}
      ></LostDogItem>
    )
  })

  return (
    <SafeAreaView styles={styles.container}>
      <ScrollView styles={styles.scrollView}>{lostDogItems}</ScrollView>
    </SafeAreaView>
  )
}

LostDogListScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },

  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
})

export default LostDogListScreen
