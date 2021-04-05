import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { getUserDetail } from '@api'
import Context from '@context/context'
import Constants from 'expo-constants'

const ProfileScreen = () => {
  const context = useContext(Context)
  const [name, setName] = useState(null)
  const [id, setId] = useState(null)
  const [email, setEmail] = useState(null)
  const [createdAt, setcreatedAt] = useState(null)

  useEffect(() => {
    // eslint-disable-next-line prettier/prettier
    (async () => {
      const { token } = context
      const { data } = await getUserDetail(token)
      setId(data.resource.id)
      setName(data.resource.user.name)
      setEmail(data.resource.user.email)
      setcreatedAt(data.resource.user.createdAt)
    })()
  }, [])

  return (
    <View style={styles.container}>
      <Text> {id} </Text>
      <Text> {name} </Text>
      <Text> {email} </Text>
      <Text> {createdAt} </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    top: Constants.statusBarHeight,
  },
})

export default ProfileScreen
