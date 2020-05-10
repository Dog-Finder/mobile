import React from 'react'
import { createBottomTabNavigator } from 'react-navigation'
import { Entypo } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import HomeScreen from '../screens/HomeScreen'

const HomeIcon = props => (
  <Entypo name="home" size={24} color={props.focused ? 'black' : 'gray'} />
)
const LostDogIcon = props => (
  <Entypo
    name="magnifying-glass"
    size={24}
    color={props.focused ? 'black' : 'gray'}
  />
)

const FoundDogIcon = props => (
  <MaterialCommunityIcons
    name="dog"
    size={24}
    color={props.focused ? 'black' : 'gray'}
  />
)

export default createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: HomeIcon,
      },
    },
    FoundDog: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: 'Perro Perdido',
        tabBarIcon: FoundDogIcon,
      },
    },
    LostDog: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: 'Perro Encontrado',
        tabBarIcon: LostDogIcon,
      },
    },
  },
  {
    tabBarOptions: { activeTintColor: 'black' },
  }
)
