import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ShowFoundDogInfoScreen from '../../screens/ShowFoundDogInfoScreen'
import FoundDogListScreen from '../../screens/FoundDogListScreen'
import SimilarDogListScreen from '../../screens/SimilarDogListScreen'

const Stack = createStackNavigator()
const FoundDogListStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FoundDogList"
        component={FoundDogListScreen}
        options={{
          headerStyle: { height: 7 },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SimilarDogList"
        component={SimilarDogListScreen}
        options={{
          headerStyle: { height: 7 },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ShowFoundDogInfo"
        component={ShowFoundDogInfoScreen}
        options={{ title: null }}
      />
    </Stack.Navigator>
  )
}

export default FoundDogListStack
