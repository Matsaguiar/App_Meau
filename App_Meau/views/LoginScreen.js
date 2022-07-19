import { Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { css } from '../assets/css/Css'
import { auth, db } from '../firebase'
import { useNavigation } from '@react-navigation/native'

const LoginScreen = () => {
  const users_collection = db.collection('Usuários');
  const user_email = auth.currentUser?.email;

  const [name, setName] = React.useState('')

  const navigation = useNavigation()

  const hendleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message)) 
  }

  users_collection.doc(user_email).get().then((doc) => {
    setName(doc.get("Nome"));
  }).catch((error) => {
    console.log("Error getting document:", error);
  });
  return (
    <View style={css.container}>
      <Text>Bem vindo: {name}</Text>
      <TouchableOpacity 
        onPress={hendleSignOut}
        style={css.button}
      > 
        <Text style={css.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  )
  
}

export default LoginScreen
