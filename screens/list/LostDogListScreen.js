import React, { useState, useEffect, useContext } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ButtonGroup } from 'react-native-elements'
import PropTypes from 'prop-types'
import getDistance from 'geolib/es/getDistance'
import getCurrentLocation from '@functions/getCurrentLocation'
import { compareDogsByDate, compareDogsByDistance } from '@functions/sorting'

import Context from '@context/context'
import LostDogItem from '@components/LostDog/LostDogItem'
import { getLostDogList } from '@api'

const LostDogListScreen = ({ navigation }) => {
  const context = useContext(Context)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const buttons = ['Más cercanos', 'Más recientes']
  const [lostDogList, setLostDogList] = useState([])

  useEffect(() => {
    // eslint-disable-next-line prettier/prettier
    (async () => {
      const { token } = context
      const { data } = await getLostDogList(token)
      getCurrentLocation(context).then(
        data.resource.forEach(
          dog =>
            (dog.distance = getDistance(dog['marker'], {
              latitude: context.userLatitude,
              longitude: context.userLongitude,
            }))
        )
      )
      data.resource.sort(compareDogsByDistance())
      setLostDogList(data.resource)
    })()
  }, [])

  function OnSortingPress(index, selectedIndex) {
    if (selectedIndex === 0 && index === 1) {
      lostDogList.sort(compareDogsByDate())
    } else if (selectedIndex === 1 && index === 0) {
      lostDogList.sort(compareDogsByDistance())
    }
    setSelectedIndex(index)
  }

  const lostDogItems = lostDogList.map((lostDog, i) => {
    return (
      <LostDogItem key={i} dog={lostDog} navigator={navigation}></LostDogItem>
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
