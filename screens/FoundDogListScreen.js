import React, { useState, useEffect, useContext } from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import Constants from 'expo-constants'

import Context from '@context/context'
import { getFoundDogList } from '../api'
import FoundDogItem from '../components/FoundDog/FoundDogItem'

const FoundDogListScreen = ({ navigation }) => {
  const context = useContext(Context)
  const [foundDogList, setFoundDogList] = useState([])
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
      const { token } = context
      const { data } = await getFoundDogList(token)
      setFoundDogList(data.resource)
      getCurrentLocation()
    })()
  }, [])
  const foundDogItems = foundDogList.map((foundDog, i) => {
    return (
      <FoundDogItem
        key={i}
        dog={foundDog}
        navigator={navigation}
        userCoordinates={{
          latitude: latitude,
          longitude: longitude,
        }}
      ></FoundDogItem>
    )
  })
  return (
    <SafeAreaView styles={styles.container}>
      <ScrollView styles={styles.scrollView}>{foundDogItems}</ScrollView>
    </SafeAreaView>
  )
}

FoundDogListScreen.propTypes = {
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

export default FoundDogListScreen
