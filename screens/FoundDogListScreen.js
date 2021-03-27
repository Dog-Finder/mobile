import React, { useState, useEffect, useContext } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ButtonGroup } from 'react-native-elements'
import PropTypes from 'prop-types'
import getDistance from 'geolib/es/getDistance'

import Context from '@context/context'
import { getFoundDogList } from '../api'
import FoundDogItem from '../components/FoundDog/FoundDogItem'

const FoundDogListScreen = ({ navigation }) => {
  const context = useContext(Context)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const buttons = ['Más cercanos', 'Más recientes']
  const [foundDogList, setFoundDogList] = useState([])
  const [latitude, setLatitude] = useState(context.latitude)
  const [longitude, setLongitude] = useState(context.longitude)
  const getCurrentLocation = async () => {
    navigator.geolocation.getCurrentPosition(async position => {
      setLatitude(parseFloat(position.coords.latitude))
      setLongitude(parseFloat(position.coords.longitude))
    })
  }

  //used to compare dog publications by date, to sort them
  function compareDogsByDate() {
    return function(dog1, dog2) {
      const dateDog1 = new Date(dog1['date']),
        dateDog2 = new Date(dog2['date'])
      return dateDog2 - dateDog1
    }
  }
  //used to compare dog publications by distance, to sort them
  function compareDogsByDistance() {
    return function(dog1, dog2) {
      return dog1['distance'] - dog2['distance']
    }
  }

  useEffect(() => {
    // eslint-disable-next-line prettier/prettier
    (async () => {
      const { token } = context
      const { data } = await getFoundDogList(token)
      getCurrentLocation().then(
        data.resource.forEach(
          dog =>
            (dog.distance = getDistance(dog['marker'], {
              latitude: latitude,
              longitude: longitude,
            }))
        )
      )
      data.resource.sort(compareDogsByDistance())
      setFoundDogList(data.resource)
    })()
  }, [])

  function OnSortingPress(index, selectedIndex) {
    if (selectedIndex === 0 && index === 1) {
      foundDogList.sort(compareDogsByDate())
    } else if (selectedIndex === 1 && index === 0) {
      foundDogList.sort(compareDogsByDistance())
    }
    setSelectedIndex(index)
  }

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
      <ScrollView styles={styles.scrollView}>
        <ButtonGroup
          onPress={index => OnSortingPress(index, selectedIndex)}
          selectedIndex={selectedIndex}
          buttons={buttons}
        />
        {foundDogItems}
      </ScrollView>
    </SafeAreaView>
  )
}

FoundDogListScreen.propTypes = {
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

export default FoundDogListScreen
