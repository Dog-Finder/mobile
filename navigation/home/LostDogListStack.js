import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ShowLostDogInfoScreen from '../../screens/ShowLostDogInfoScreen'
import LostDogListScreen from '../../screens/LostDogListScreen'

const Stack = createStackNavigator()
const LostDogListStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LostDogList"
        component={LostDogListScreen}
        options={{
          headerStyle: { height: 7 },
          headerShown: false,
        }}
      />
      <Stack.Screen name="ShowLostDogInfo" component={ShowLostDogInfoScreen} />
    </Stack.Navigator>
  )
}

export default LostDogListStack
