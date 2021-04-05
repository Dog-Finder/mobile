import React, { useState, useEffect, useContext } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import PropTypes from 'prop-types'

import Context from '@context/context'
import { searchKNN } from '@api'
import FoundDogItem from '@components/FoundDog/FoundDogItem'

const SimilarDogListScreen = ({ route, navigation }) => {
  const { dog, similarIndex } = route.params
  const context = useContext(Context)
  const [foundDogList, setFoundDogList] = useState([])

  useEffect(() => {
    // eslint-disable-next-line prettier/prettier
    (async () => {
      const { token } = context
      const { data } = await searchKNN(token, dog.imageLinks, similarIndex)
      setFoundDogList(data.resource)
    })()
  }, [])

  const foundDogItems = foundDogList.map((foundDog, i) => {
    return (
      <FoundDogItem
        key={i}
        dog={foundDog}
        navigator={navigation}
      ></FoundDogItem>
    )
  })
  return (
    <SafeAreaView styles={styles.container}>
      <ScrollView styles={styles.scrollView}>{foundDogItems}</ScrollView>
    </SafeAreaView>
  )
}

SimilarDogListScreen.propTypes = {
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

export default SimilarDogListScreen
