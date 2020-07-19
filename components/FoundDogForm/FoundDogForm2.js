import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Card } from 'react-native-elements'
import DateTimeInput from 'components/inputs/DateTimeInput'
import { SexInput } from 'components/inputs/SexInput'

export default class FoundDogForm extends Component {
  render() {
    return (
      <View>
        <Card>
          <Input placeholder="Nombre" />
          <DateTimeInput
            isVisible={false}
            onConfirm={() => {}}
            onCancel={() => {}}
          />
          <SexInput onValueChange={() => {}} />
        </Card>
      </View>
    )
  }
}

const styles = StyleSheet.create({})
