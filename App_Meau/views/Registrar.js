import { KeyboardAvoidingView, Platform, TextInput, Image, TouchableOpacity, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import { css } from '../assets/css/Css';
import { auth, db } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { collection } from '@react-native-firebase/firestore'


const Registrar = () => {
  const users_collection = db.collection('Usuários');

  const [name, setName] = useState('')
  const [tel, setTel] = useState('')

  const navigation = useNavigation()  

  useEffect(() => {
    
  }, [])

  const Register = () => {
    users_collection.doc(auth.currentUser?.email).set({
      Nome: name,
      telefone: parseInt(tel),
    })
    .then(() => {
      console.log(name, "cadastardo com sucesso!!");
      navigation.replace("LoginScreen")
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
  }

  const hendleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message)) 
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={[css.container, css.bg]}>

      <View style = {css.registrarLogomarca}>
        <Image source={require('../assets/img/logo.png')}/>
      </View>

      <View style={css.registrarForm}>      
        <TextInput style={css.registrarInput}
          placeholder="name"
          value = {name}
          onChangeText={text => setName(text)}
          keyboardType="text"
        />
        <TextInput style={css.loginInput}
          placeholder="tel."
          value = {tel}
          onChangeText={text => setTel(text)}
          keyboardType="numeric"
        />
      </View>

      <View style={css.buttonContainer}>
        <TouchableOpacity  
          onPress={Register}
          style={css.button}
        >
          <Text style={css.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

      <TouchableOpacity 
      onPress={hendleSignOut}
      style={[css.button, css.buttonOutline]}
      >
        <Text style={css.buttonOutlineText}>Sair</Text>
      </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Registrar