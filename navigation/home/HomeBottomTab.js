import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Entypo } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import LostDogListStack from './LostDogListStack'
import FoundDogListStack from './FoundDogListStack'
import HomeScreen from '../../screens/HomeScreen'

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

const Tab = createBottomTabNavigator()

const HomeBottomTab = () => {
  return (
    <Tab.Navigator tabBarOptions={{ activeTintColor: 'black' }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: HomeIcon,
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="FoundDog"
        component={FoundDogListStack}
        options={{
          tabBarLabel: 'Encontrados',
          tabBarIcon: FoundDogIcon,
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="LostDog"
        component={LostDogListStack}
        options={{
          tabBarLabel: 'Perdidos',
          tabBarIcon: LostDogIcon,
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  )
}
export default HomeBottomTab
