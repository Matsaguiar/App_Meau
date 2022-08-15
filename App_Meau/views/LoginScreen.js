import { Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { css } from '../assets/css/Css'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/native'

const LoginScreen = () => {

  const navigation = useNavigation()

  const hendleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Home")
      })
      .catch(error => alert(error.message)) 
  }

  const registerAnimal = () => {
    navigation.replace("AnimalRegister")
  }

  return (
    <View style={css.container}>

      <Text>Bem vindo: {auth.currentUser?.email}</Text>
      <TouchableOpacity 
        onPress={hendleSignOut}
        style={css.buttonGreen}
      > 
        <Text style={css.buttonText}>Sair</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        onPress={registerAnimal}
        style={css.buttonGreen}
      > 
        <Text style={css.buttonText}>Cadastrar Animal</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => navigation.navigate("AdoptionList")}
        style={css.buttonGreen}
      > 
        <Text style={css.buttonText}>Lista de Adoção</Text>
      </TouchableOpacity>

    </View>
  )
}

export default LoginScreen