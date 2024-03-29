import { KeyboardAvoidingView, Platform, TextInput, Image, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { css } from '../assets/css/Css';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';

const ForgotPassword = () => {
  const [email, setEmail] = useState(null)
  const [errorEmail, setErrorEmail] = useState(null)

  const navigation = useNavigation()

  const validate = () => {
    let error = false
    setErrorEmail(null)

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (!re.test(String(email).toLowerCase()) || email == null) {
      setErrorEmail("Informe o e-mail corretamente!")
      error = true
    }
    return !error;
  }

  const sendEmail = () => {
    if (validate()) {
      auth
        .sendPasswordResetEmail(email)
        .then(userCredentials => {
          //const user = userCredentials.user;
          console.log('Email enviado para: ' + email);
        })
        .catch(error => alert(error.message))
    } else {
      console.log('ERRRRRROOOR')
    }
  }

  return (
    //<KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={[css.container, css.bg]}>
    <KeyboardAvoidingView style={[specificStyle.container]}>

      <View>
        <Text style={specificStyle.header}>  Cadastro Pessoal</Text>
      </View>

      <View style={specificStyle.loginLogomarca}>
        <Image source={require('../assets/img/logo.png')} />
      </View>
      <View style={css.registration}></View>
      <View style={{ width: "80%" }}>
        <TextInput style={css.loginInput}
          placeholder="E-mail"
          value={email}
          onChangeText={value => {
            setEmail(value)
            setErrorEmail(null)
          }}
          keyboardType="email-address"
        />
        <Text style={css.errorMessage}>{errorEmail}</Text>
      </View>

      <View style={css.buttonContainer}>
        <TouchableOpacity
          onPress={sendEmail}
          style={css.buttonGreen}
        >
          <Text
            style={css.button}
            onPress={() => [alert('Verifique o SPAM! Siga as orientações no email enviado para altereção da senha.'), navigation.navigate("Login")]}>Enviar e-mail</Text>
        </TouchableOpacity>
        <View style={{ height: 100 }} />
      </View>
    </KeyboardAvoidingView>
  )
}

const specificStyle = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#cfe9e5',
    width: 420,
    height: 60,
    marginTop: 20,
    paddingTop: 12,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: '#434343',
    fontSize: 24,
  },
  buttonGreen: {
    marginTop: 35,
    marginVertical: 40,
    backgroundColor: '#88c9bf',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  loginLogomarca: {
    marginTop: 275,
    marginBottom: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default ForgotPassword