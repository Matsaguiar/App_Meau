import { KeyboardAvoidingView, Platform, TextInput, Image, TouchableOpacity, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import { css } from '../assets/css/Css';
import { auth, db } from '../firebase';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const users_collection = db.collection('Users')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPassword, setErrorPassword] = useState('')

  const navigation = useNavigation() 

  useEffect(() => {
    const loginState = auth.onAuthStateChanged(user => {
        if(user){
          users_collection.doc(user.email).get().then((docSnapshot) => {
            if(docSnapshot.exists){
              navigation.replace("LoginScreen")
            }
            else{
              // navigation.replace("Register") 
            }
          })
        }
      })
  }, [])

  const validate = () => {
    let error = false
    setErrorEmail(null)
    setErrorPassword(null)

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if(!re.test(String(email).toLowerCase()) || email == null){
      setErrorEmail("Informe o e-mail corretamente!")
      error = true
    }
    if(password == null){
      setErrorPassword("Insira a senha!")
      error = true
    }
    return !error;
  }

  const loginSignIn = () => {
    if(validate()){
      auth
        .signInWithEmailAndPassword(email, password)
        .then(userCredentials => {
          const user = userCredentials.user;
          console.log('Login com: ',user.email);
          navigation.replace("LoginScreen")
      })
      .catch(error => alert(error.message))
    }else{
      console.log('ERRRRRROOOR')
    }
  }

  return (
    //<KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={[css.container, css.bg]}>
    <KeyboardAvoidingView style={[css.container]}>

      <View style = {css.loginLogomarca}>
        <Image source={require('../assets/img/logo.png')}/>
      </View>
      <View style={css.registration}></View>
      <View style={{width:"80%"}}>   
        <TextInput style={css.loginInput}
          placeholder="E-mail"
          value = {email}
          onChangeText={value => {
            setEmail(value)
            setErrorEmail(null)
          }}
          keyboardType="email-address"
        />
        <Text style={css.errorMessage}>{errorEmail}</Text>
        <TextInput style={css.loginInput}
          placeholder="Senha"
          value = {password}
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={value => {
            setPassword(value)
            setErrorPassword(null)
          }}
          secureTextEntry
        />
        <Text style={css.errorMessage}>{errorPassword}</Text>
        <Text 
          style={css.forgetPassword}
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          Esqueceu sua senha?
        </Text>
      </View>

      <View style={css.buttonContainer}>
        <TouchableOpacity  
          onPress={loginSignIn}
          style={css.buttonGreen}
        >
          <Text style={css.button}>Entrar</Text>
        </TouchableOpacity>
        <Text 
          style={css.greenText}
          onPress={() => navigation.navigate("Register")}
        >
          Criar nova conta 
        </Text>
      <View style={{height:100}}/>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Login