import React, { useRef, useEffect, useState } from 'react'
import { StyleSheet, ScrollView, Dimensions, View } from 'react-native'
import PropTypes from 'prop-types'
import { Icon, ListItem, Button } from 'react-native-elements'
import MapView, { Marker } from 'react-native-maps'
import Image from 'react-native-scalable-image'
import ShowMyPostedDogOptionsModal from '@components/MyPostedDog/ShowMyPostedDogOptionsModal'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const ShowMyPostedLostDogInfoScreen = ({ navigation, route }) => {
  const map = useRef(null)
  const { dog } = route.params
  const [dotsModalVisible, setDotsModalVisible] = useState(false) //modal for the dots button at header, for deleting or editing the post
  const handleModalPress = opts => {
    if (typeof opts !== undefined) {
      setDotsModalVisible(opts)
    }
    setDotsModalVisible(!dotsModalVisible)
  }
  useEffect(() => {
    navigation.setOptions({ title: dog.name || '' })
    navigation.setOptions({
      // eslint-disable-next-line react/display-name
      headerRight: () => (
        <Button
          onPress={() => setDotsModalVisible(!dotsModalVisible)}
          icon={<Icon name="ellipsis-h" type="font-awesome" color="black" />}
          buttonStyle={styles.dotsButtonStyle}
        />
      ),
    })
  })
  const parsedDate = new Date(dog.date)
  const info = [
    {
      title: 'Fecha aviso: ' + parsedDate.toDateString(),
      icon: <Icon name="calendar" type="font-awesome" color="#517fa4" />,
    },
    {
      title: dog.sex,
      icon: (
        <Icon
          name="gender-male-female"
          type="material-community"
          color="#517fa4"
        />
      ),
    },
    {
      title: dog.commentary,
      icon: <Icon name="info" type="material" color="#517fa4" />,
    },
  ]
  const goToSimilar = () => {
    const similarIndex = 'found'
    navigation.push('SimilarDogList', { dog, similarIndex })
  }
  return (
    <View>
      <ShowMyPostedDogOptionsModal
        navigator={navigation}
        dog={dog}
        type={'lost'}
        dotsModalVisible={dotsModalVisible}
        handleModalPress={handleModalPress}
      ></ShowMyPostedDogOptionsModal>
      <ScrollView>
        <Image
          source={{ uri: dog.imageLinks }}
          style={styles.image}
          width={width * 0.6}
        />
        {info.map((item, i) => (
          <ListItem
            key={i}
            title={item.title}
            leftIcon={item.icon}
            bottomDivider
          />
        ))}
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: dog.marker.latitude,
            longitude: dog.marker.longitude,
            latitudeDelta: 0.0025,
            longitudeDelta: 0.0025,
          }}
          showsBuildings={false}
          loadingEnabled={true}
          ref={map}
        >
          <Marker
            coordinate={{
              latitude: dog.marker.latitude,
              longitude: dog.marker.longitude,
            }}
            title={'Acá se perdió.'}
          />
        </MapView>
        <Button
          title="Buscar Perros Encontrados"
          onPress={goToSimilar}
        ></Button>
      </ScrollView>
    </View>
  )
}

ShowMyPostedLostDogInfoScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
}
const styles = StyleSheet.create({
  dotsButtonStyle: { backgroundColor: 'white', paddingRight: 15 },
  image: {
    alignSelf: 'center',
    marginTop: 5,
    resizeMode: 'stretch',
  },
  mapStyle: {
    alignSelf: 'center',
    height: height * 0.45,
    marginBottom: 5,
    marginTop: 5,
    width: width * 0.85,
  },
})

export default ShowMyPostedLostDogInfoScreen
