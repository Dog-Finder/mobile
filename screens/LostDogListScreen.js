import React, { useState, useEffect, useContext } from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ButtonGroup } from 'react-native-elements'
import PropTypes from 'prop-types'

import Context from '@context/context'
import LostDogItem from '../components/LostDog/LostDogItem'
import { getLostDogList } from '../api'

const LostDogListScreen = ({ navigation }) => {
  const context = useContext(Context)
  const buttons = ['Más cercanos', 'Más recientes']
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
      const { token } = context
      const { data } = await getLostDogList(token)
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
      <ScrollView styles={styles.scrollView}>
        <ButtonGroup
          //onPress={this.updateIndex}
          //selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{ height: 50 }}
        />
        {lostDogItems}
      </ScrollView>
    </SafeAreaView>
  )
}

LostDogListScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
})

export default LostDogListScreen
