import { KeyboardAvoidingView, Platform, TextInput, Image, TouchableOpacity, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import { css } from '../assets/css/Css';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation() 

  useEffect(() => {
    const logOut = auth.onAuthStateChanged(user => {
      if(user){
        navigation.replace("LoginScreen")
      }
    })
    return logOut
  }, [])

  const loginSignIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registrado com: ',user.email);
    })
    .catch(error => alert(error.message))
  }

  return (
    //<KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={[css.container, css.bg]}>
    <KeyboardAvoidingView style={[css.container, css.bg]}>

      <View style = {css.loginLogomarca}>
        <Image source={require('../assets/img/logo.png')}/>
      </View>

      <View style={css.loginForm}>   
        <TextInput style={css.loginInput}
          placeholder="E-mail"
          value = {email}
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
        />
        <TextInput style={css.loginInput}
          placeholder="Senha"
          value = {password}
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
      </View>

      <View style={css.buttonContainer}>
        <TouchableOpacity  
          onPress={loginSignIn}
          style={css.button}
        >
          <Text style={css.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Login