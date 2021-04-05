import React, { useRef } from 'react'
import { StyleSheet, ScrollView, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import { Icon, ListItem, Button } from 'react-native-elements'
import MapView, { Marker } from 'react-native-maps'
import Image from 'react-native-scalable-image'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const ShowLostDogInfoScreen = ({ navigation, route }) => {
  const map = useRef(null)
  const { dog } = route.params
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
    const similarIndex = 'lost'
    navigation.push('SimilarDogList', { dog, similarIndex })
  }
  return (
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
      <Button title="Buscar Similares" onPress={goToSimilar}></Button>
    </ScrollView>
  )
}

ShowLostDogInfoScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
}
const styles = StyleSheet.create({
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

export default ShowLostDogInfoScreen
