import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View, TouchableOpacity, Image, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { css } from '../assets/css/Css';

const Home = () => {
  const navigation = useNavigation()
  return (
    //<KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={[css.container, css.bg]}>
    <KeyboardAvoidingView style={[specificStyle.container]}>
      <View style={css.loginLogomarca}>
        <Image source={require('../assets/img/logo.png')} />
      </View>

      <View style={css.container_home}>
        <Text style={css.titleOla}>Olá!</Text>
        <Text style={css.title}>Bem vindo ao Meau!</Text>
        <Text style={css.title}>Aqui você pode adotar</Text>
        <Text style={css.title}>e doar cães com</Text>
        <Text style={css.title}>facilidade.</Text>
      </View>

      <View style={css.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={css.buttonYellow}
        >
          <Text style={css.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}
const specificStyle = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Home
