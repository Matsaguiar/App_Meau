import { KeyboardAvoidingView, Platform, TextInput, Image, TouchableOpacity, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import { css } from '../assets/css/Css';
import { auth, db } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { collection } from '@react-native-firebase/firestore'

const Register = () => {
  const users_collection = db.collection('Users');

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [fullName, setFullName] = useState('')
  const [age, setAge] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')

  const navigation = useNavigation() 

  useEffect(() => {
    const logOut = auth.onAuthStateChanged(user => {
      if(user){
        navigation.replace("LoginScreen")
      }
    })
    return logOut
    
  }, [])

  const registerSingUp = () => {
    users_collection.doc(auth.currentUser?.email)
      .set({
        fullName: fullName,
        age: parseInt(age),
        state: state,
        city: city,
        address: address,
        phone: parseInt(phone),
      })
      .then(() => {
        console.log(fullName, " - phone:", phone, " - Cadastrado com sucesso");
        navigation.replace("LoginScreen")
      })
      .catch((error) => {
        console.error("Erro escrita DB: ", error);
      });
  }

  const loginSignUp = () => {
    if(password == confirmPass){
        auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Registrado com: ',user.email);
            registerSingUp();
        })
        .catch(error => alert(error.message))
    }else{
        alert('Senhas diferentes')
    }
  }

  return (
    //<KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={[css.container, css.bg]}>
    <KeyboardAvoidingView style={[css.container, css.bg]}>

      <View style = {css.loginLogomarca}>
        <Image source={require('../assets/img/logo.png')}/>
      </View>

      <View style={css.loginForm}>   
        <Text>INFORMAÇÕES DE PERFIL</Text>   
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
        <TextInput style={css.loginInput}
          placeholder="Confirmação de senha"
          value = {confirmPass}
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={text => setConfirmPass(text)}
          secureTextEntry
        />
        <Text>INFORMAÇÕES PESSOAIS</Text>
        <TextInput style={css.loginInput}
          placeholder="Nome Completo"
          value = {fullName}
          onChangeText={text => setFullName(text)}
        />
        <TextInput style={css.loginInput}
          placeholder="Idade"
          value = {age}
          onChangeText={text => setAge(text)}
          keyboardType="number-pad"
        />
        <TextInput style={css.loginInput}
          placeholder="Estado"
          value = {state}
          onChangeText={text => setState(text)}
        />
        <TextInput style={css.loginInput}
          placeholder="Cidade"
          value = {city}
          onChangeText={text => setCity(text)}
        />
        <TextInput style={css.loginInput}
          placeholder="Endereço"
          value = {address}
          onChangeText={text => setAddress(text)}
        />
        <TextInput style={css.loginInput}
          placeholder="Telefone"
          value = {phone}
          onChangeText={text => setPhone(text)}
        />
      </View>

      <View style={css.buttonContainer}>
        <TouchableOpacity 
          onPress={loginSignUp}
          style={[css.button, css.button]}
        >
          <Text style={css.buttonText}>Fazer Cadastro</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Register