import React from 'react'
import { createBottomTabNavigator } from 'react-navigation'
import { Entypo } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import LostDogListStack from './LostDogListStack'
import FoundDogListStack from './FoundDogListStack'
import LostDogScreen from '../screens/LostDogScreen'

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
      screen: LostDogScreen,
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
      screen: LostDogListStack,
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
