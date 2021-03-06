import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ShowFoundDogInfoScreen from '../../screens/ShowFoundDogInfoScreen'
import FoundDogListScreen from '../../screens/FoundDogListScreen'

const Stack = createStackNavigator()
const FoundDogListStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FoundDogList"
        component={FoundDogListScreen}
        options={{
          headerStyle: { height: 7 },
        }}
      />
      <Stack.Screen
        name="ShowFoundDogInfo"
        component={ShowFoundDogInfoScreen}
      />
    </Stack.Navigator>
  )
}

export default FoundDogListStack
