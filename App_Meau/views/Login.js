import { KeyboardAvoidingView, Platform, TextInput, Image, TouchableOpacity, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import { css } from '../assets/css/Css';
import { auth, db } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { collection } from '@react-native-firebase/firestore'


const Login = () => {
  const users_collection = db.collection('Usuários');

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()  


  useEffect(() => {
    const logOut = auth.onAuthStateChanged(user => {
      if(user){
        if(users_collection.doc(user.email).exists){
          navigation.replace("LoginScreen")
        }
        else{
          console.log('Esse brother n ta na base de dados: ',user.email);
        }
      }
    })
    return logOut;
  }, [])


  const loginSignUp = () => {
    response = auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registrado com: ',user.email);
      })
      .catch(error => alert(error.message));
  }

  const loginSignIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log(user.email);
    })
    .catch(error => alert(error.message))
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={[css.container, css.bg]}>

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

        <TouchableOpacity 
          onPress={loginSignUp}
          style={[css.button, css.buttonOutline]}
        >
          <Text style={css.buttonOutlineText}>Registrar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Login