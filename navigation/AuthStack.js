import React, { useState, useEffect, useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AuthLoadingScreen from 'screens/session/AuthLoadingScreen'
import AuthScreen from 'screens/session/AuthScreen'
import SignUpScreens from 'screens/session/SignUpScreens'
import SignInScreen from 'screens/session/SignInScreen'
import AppNavigator from './AppNavigator'
import Context from '@context/context'

const Stack = createStackNavigator()

const AuthStack = () => {
  const context = useContext(Context)
  const [loading, setLoading] = useState(true)
  const userToken = context.token !== ''
  useEffect(() => {
    const makeAsyncStuff = async () => {
      await new Promise(resolve => {
        setTimeout(resolve, 1000)
      })
      setLoading(false)
    }
    makeAsyncStuff()
  }, [])
  if (loading) return <AuthLoadingScreen />
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userToken ? (
        <Stack.Screen name="Home" component={AppNavigator} />
      ) : (
        <>
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          {Object.entries(SignUpScreens).map(([name, component], key) => (
            <Stack.Screen name={name} component={component} key={key} />
          ))}
        </>
      )}
    </Stack.Navigator>
  )
}

export default AuthStack
