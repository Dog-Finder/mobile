import React, { useContext, useState } from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import PropTypes from 'prop-types'
import { Icon, Button } from 'react-native-elements'
import { deleteFoundDog, deleteLostDog } from '../../api'
import Context from '@context/context'
import Modal from 'react-native-modal'

const ShowMyPostedDogOptionsModal = props => {
  const [loading, setLoading] = useState(false)
  const navigator = props.navigator
  const context = useContext(Context)
  const { token } = context

  const onDeletePost = async (token, id, dogType) => {
    setLoading(true)
    if (dogType === 'found') {
      await deleteFoundDog(token, id)
    } else {
      await deleteLostDog(token, id)
    }
    setLoading(false)
    props.handleModalPress()
    navigator.push('PersonalPublications')
  }

  const deletePost = async () => {
    Alert.alert(
      props.dogInfo.name,
      '¿Desea eliminar esta publicación?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
          onPress: () => {
            props.handleModalPress()
          },
        },
        {
          text: 'Eliminar',
          onPress: () => {
            onDeletePost(token, props.dogInfo.id, props.type)
          },
        },
      ],
      { cancelable: true }
    )
  }
  return (
    <Modal
      animationIn="slideInDown"
      animationOut="slideOutDown"
      transparent={true}
      isVisible={props.dotsModalVisible}
      onBackdropPress={() => props.handleModalPress(false)}
      backdropOpacity={0.5}
      onRequestClose={() => {
        props.handleModalPress(false)
      }}
    >
      <View style={styles.modalView}>
        <Button
          buttonStyle={styles.deleteButtonStyle}
          icon={
            <Icon
              name="trash-o"
              type="font-awesome"
              color="black"
              backgroundColor="white"
              iconStyle={styles.deleteButtonIconStyle}
              size={40}
            />
          }
          title="Eliminar publicación"
          titleStyle={styles.deleteButtonTextStyle}
          loading={loading}
          onPress={deletePost}
        ></Button>
      </View>
    </Modal>
  )
}
const styles = StyleSheet.create({
  deleteButtonIconStyle: { marginRight: 50 },
  deleteButtonStyle: {
    backgroundColor: 'white',
    justifyContent: 'flex-start',
  },
  deleteButtonTextStyle: {
    color: 'black',
  },
  modalView: { flex: 1, justifyContent: 'flex-end' },
})
export default ShowMyPostedDogOptionsModal

ShowMyPostedDogOptionsModal.propTypes = {
  navigator: PropTypes.object.isRequired,
  dogInfo: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  dotsModalVisible: PropTypes.bool,
  handleModalPress: PropTypes.func.isRequired,
}
