import { KeyboardAvoidingView, Platform, TextInput, Image, TouchableOpacity, Text, View, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { StyleSheet } from "react-native";
import { css } from '../assets/css/Css';
import { auth, db } from '../firebase';
import { useNavigation } from '@react-navigation/native';
// import { collection } from '@react-native-firebase/firestore'
import { CheckBox } from 'react-native';

export default function Register({ }) {
  const users_collection = db.collection('Users')

  const defaultProfilePicture = 'https://firebasestorage.googleapis.com/v0/b/app-meau.appspot.com/o/imgUsers%2Fdefault-profile-icon.jpg?alt=media&token=bbfc22e1-0478-46d0-b5ba-83442c2917e9'

  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPass, setConfirmPass] = useState(null)
  const [fullName, setFullName] = useState(null)
  const [age, setAge] = useState(null)
  const [state, setState] = useState(null)
  const [city, setCity] = useState(null)
  const [address, setAddress] = useState(null)
  const [phone, setPhone] = useState('')
  const [isSelected, setSelected] = useState(null)
  const [errorEmail, setErrorEmail] = useState(null)
  const [errorPassword, setErrorPassword] = useState(null)
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(null)
  const [errorFullName, setErrorFullName] = useState(null)
  const [errorAge, setErrorAge] = useState(null)
  const [errorState, setErrorState] = useState(null)
  const [errorCity, setErrorCity] = useState(null)
  const [errorAddress, setErrorAddress] = useState(null)
  const [errorPhone, setErrorPhone] = useState(null)

  const navigation = useNavigation()

  useEffect(() => {
    const logOut = auth.onAuthStateChanged(user => {
      if (user) {
        users_collection.doc(user.email).get().then((docSnapshot) => {
          if (docSnapshot.exits) {
            navigation.navigate("AdoptionList")
          }
        })
      }
    })
    return logOut

  }, [])

  const registerSingUp = () => {

    users_collection.doc(email.toLowerCase())
      .set({
        fullName: fullName,
        age: parseInt(age),
        state: state,
        city: city,
        address: address,
        phone: phone,
        profilePicture: defaultProfilePicture,
      })
      .then(() => {
        console.log(fullName, " - phone:", phone, " - Cadastrado com sucesso");
        navigation.navigate("AdoptionList")
      })
      .catch((error) => {
        console.error("Erro escrita DB: ", error);
      });
  }

  const validate = () => {
    let error = false
    setErrorEmail(null)
    setErrorPassword(null)
    setErrorFullName(null)
    setErrorAge(null)
    setErrorState(null)
    setErrorCity(null)
    setErrorAddress(null)

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (!re.test(String(email).toLowerCase()) || email == null) {
      setErrorEmail("Preencha o e-mail corretamente!")
      error = true
    }
    if (password == null) {
      setErrorPassword("Preencha a senha!")
      error = true
    }
    if (confirmPass == null) {
      setErrorConfirmPassword("Preencha a confirmação de senha!")
      error = true
    }
    if (password != confirmPass) {
      setErrorPassword("Senhas são diferentes!")
      error = true
    }
    if (fullName == null) {
      setErrorFullName("Informe o nome completo!")
      error = true
    }
    if (age == null) {
      setErrorAge('Informe o sua idade!')
      error = true
    }
    if (state == null) {
      setErrorState('Informe o estado!')
      error = true
    }
    if (city == null) {
      setErrorCity('Informe a cidade!')
      error = true
    }
    if (address == null) {
      setErrorAddress('Informe o endereço!')
      error = true
    }
    if (phone == null) {
      setErrorPhone('Informe o telefone!')
      error = true
    }
    return !error
  }

  const loginSignUp = async () => {
    if (validate()) {
      await users_collection.doc(email).get().then((docSnapshot) => {
        if (docSnapshot.exists) {
          auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
              const user = userCredentials.user;
              console.log('Login com: ', user.email);
              registerSingUp();
            })
            .catch(error => alert("Erro ao logar: ", error.message))
        }
        else {
          auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
              const user = userCredentials.user;
              console.log('Registrado com: ', user.email);
            })
            .catch(error => alert("Erro ao cadastrar: ", error.message))
        }
      })
      registerSingUp();
    }
    else {
      console.log('ERRRRRROOOR')
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={[css.container, specificStyle.specificConteiner]}
    >
      <View>
        <Text style={specificStyle.header}>  Cadastro Pessoal</Text>
      </View>
      <ScrollView style={{ width: "100%" }}>
        <View style={css.loginLogomarca}>
          <Image source={require('../assets/img/logo.png')} />
        </View>

        <View>
          <Text style={[css.separator, css.greenText]}>INFORMAÇÕES DE PERFIL</Text>
          <TextInput style={css.loginInput}
            placeholder="E-mail"
            value={email}
            onChangeText={value => {
              setEmail(value)
              setErrorEmail(null)
            }}
            keyboardType="email-address"
            errorMessage={errorEmail}
          />
          <Text style={css.errorMessage}>{errorEmail}</Text>
          <TextInput style={css.loginInput}
            placeholder="Senha"
            value={password}
            leftIcon={{ type: 'font-awesome', name: 'lock' }}
            onChangeText={value => {
              setPassword(value)
              setErrorPassword(null)
            }}
            secureTextEntry
          />
          <Text style={css.errorMessage}>{errorPassword}</Text>
          <TextInput style={css.loginInput}
            placeholder="Confirmação de senha"
            value={confirmPass}
            leftIcon={{ type: 'font-awesome', name: 'lock' }}
            onChangeText={value => {
              setConfirmPass(value)
              setErrorConfirmPassword(null)
            }}
            secureTextEntry
            errorMessage={errorConfirmPassword}
          />
          <Text style={css.errorMessage}>{errorConfirmPassword}</Text>
          <Text style={[css.separator, css.greenText]}>INFORMAÇÕES PESSOAIS</Text>
          <TextInput style={css.loginInput}
            placeholder="Nome Completo"
            value={fullName}
            onChangeText={value => {
              setFullName(value)
              setErrorFullName(null)
            }}
            errorMessage={errorFullName}
          />
          <Text style={css.errorMessage}>{errorFullName}</Text>
          <TextInput style={css.loginInput}
            placeholder="Idade"
            value={age}
            keyboardType="number-pad"
            onChangeText={value => {
              setAge(value)
              setErrorAge(null)
            }}
            errorMessage={errorAge}
          />
          <Text style={css.errorMessage}>{errorAge}</Text>
          <TextInput style={css.loginInput}
            placeholder="Estado"
            value={state}
            onChangeText={value => {
              setState(value)
              setErrorState(null)
            }}
            errorMessage={errorState}
          />
          <Text style={css.errorMessage}>{errorState}</Text>
          <TextInput style={css.loginInput}
            placeholder="Cidade"
            value={city}
            onChangeText={value => {
              setCity(value)
              setErrorCity(null)
            }}
            errorMessage={errorCity}
          />
          <Text style={css.errorMessage}>{errorCity}</Text>
          <TextInput style={css.loginInput}
            placeholder="Endereço"
            value={address}
            onChangeText={value => {
              setAddress(value)
              setErrorAddress(null)
            }}
            errorMessage={errorAddress}
          />
          <Text style={css.errorMessage}>{errorAddress}</Text>
          <TextInput style={css.loginInput}
            placeholder="Telefone"
            value={phone}
            keyboardType="number-pad"
            onChangeText={value => {
              setPhone(value)
              setErrorPhone(null)
            }}
            errorMessage={errorPhone}
          />
          <Text style={css.errorMessage}>{errorPhone}</Text>
        </View>


        <View style={css.buttonContainer_Scroll}>
          <TouchableOpacity
            onPress={loginSignUp}
            style={[specificStyle.buttonGreen]}
          >
            <Text style={css.buttonText}>Fazer Cadastro</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const specificStyle = StyleSheet.create({
  specificConteiner: {
    backgroundColor: "#fff",
    padding: 10
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
})
