import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import { css } from '../assets/css/Css';

const Registrar = () => {
  const navigation = useNavigation()
  return(
    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={[css.container, css.bg]}>
      <View style={[css.container, css.bg, css.loginLogomarca]}>
        <Image source={require('../assets/img/logo.png')} />
      </View>

      <View style={css.container_home}>
          <Text style={css.title}>Olá!</Text>
          <Text style={css.title}>Bem vindo ao Meau!</Text>
          <Text style={css.title}>Aqui você pode adotar e doar cães com facilidade.</Text>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={css.button}
          >
            <Text style={css.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
  )
}

export default Registrar
