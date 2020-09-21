import React, { useRef } from 'react'
import { StyleSheet, ScrollView, Dimensions } from 'react-native'
import PropTypes from 'prop-types'
import { Icon, ListItem } from 'react-native-elements'
import MapView, { Marker } from 'react-native-maps'
import Image from 'react-native-scalable-image'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const ShowFoundDogInfoScreen = ({ route }) => {
  const map = useRef(null)
  const { dogInfo } = route.params
  const parsedDate = new Date(dogInfo.date)
  const info = [
    {
      title: 'Fecha aviso: ' + parsedDate.toDateString(),
      icon: <Icon name="calendar" type="font-awesome" color="#517fa4" />,
    },
    {
      title: dogInfo.sex,
      icon: (
        <Icon
          name="gender-male-female"
          type="material-community"
          color="#517fa4"
        />
      ),
    },
    {
      title: dogInfo.commentary,
      icon: <Icon name="info" type="material" color="#517fa4" />,
    },
  ]
  return (
    <ScrollView>
      <Image
        source={{ uri: dogInfo.imageLinks }}
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
          latitude: dogInfo.marker.latitude,
          longitude: dogInfo.marker.longitude,
          latitudeDelta: 0.0025,
          longitudeDelta: 0.0025,
        }}
        showsBuildings={false}
        loadingEnabled={true}
        ref={map}
      >
        <Marker
          coordinate={{
            latitude: dogInfo.marker.latitude,
            longitude: dogInfo.marker.longitude,
          }}
          title={'Acá fue encontrado.'}
        />
      </MapView>
    </ScrollView>
  )
}

ShowFoundDogInfoScreen.propTypes = {
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

export default ShowFoundDogInfoScreen
