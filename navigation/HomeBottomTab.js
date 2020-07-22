import React from 'react'
import { createBottomTabNavigator } from 'react-navigation'
import { Entypo } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import HomeScreen from '../screens/HomeScreen'
import LostDogListScreen from '../screens/LostDogListScreen'
import FoundDogListStack from './FoundDogListStack'

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
      screen: FoundDogListStack,
      navigationOptions: {
        tabBarLabel: 'Encontrados',
        tabBarIcon: FoundDogIcon,
      },
    },
    LostDog: {
      screen: LostDogListScreen,
      navigationOptions: {
        tabBarLabel: 'Perdidos',
        tabBarIcon: LostDogIcon,
      },
    },
  },
  {
    tabBarOptions: { activeTintColor: 'black' },
  }
)
