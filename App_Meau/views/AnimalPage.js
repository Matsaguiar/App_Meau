import { Text, View, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { css } from '../assets/css/Css'
import { StyleSheet } from "react-native";
import { auth, db, storage } from '../firebase'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker';
import { useState, useEffect } from 'react'
import { Image, FlatList } from 'react-native'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


const AnimalPage = ({ route }) => {

  const navigation = useNavigation()

  const user_collection = db.collection('Users');
  const animals_collections = db.collection('Animals');
  const notification_colletions = db.collection('Notifications');

  const [image, setImage] = useState();

  const notification = () => {
    notification_colletions.doc()
      .set({
        owner: route.params.animal.owner,
        animal: route.params.animal.name,
        newOwner: db.collection('Users').doc(auth.currentUser?.email),
       // idAnimal: route.params.animal.id,
      })
      .then(() => {
        Alert.alert(' Notificação enviada com sucesso!')
        console.log(' Notificação enviada com sucesso!')
        navigation.replace("LoginScreen")
      })
      .catch((error) => {
        console.error("Erro escrita DB: ", error);
      })
  }


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={[specificStyle.specificConteiner]}
    >
      {
        route.params.animal.profilePicture ?
          <Image source={{ uri: route.params.animal.profilePicture }} style={{ width: 200, height: 250 }} />
          : null
      }
      <Text >Nome: {route.params.animal.name}</Text>
      <Text >Idade: {route.params.animal.age}</Text>
      <Text>Sexo: {route.params.animal.sex}</Text>
      <Text>Tamanho: {route.params.animal.size}</Text>
      <Text>Idade: {route.params.animal.age}</Text>
      <Text>Temperamento: {route.params.animal.temperament}</Text>
      <Text>Saúde: {route.params.animal.health}</Text>
      <Text>Doenças: {route.params.animal.sick}</Text>
      <Text>Historia: {route.params.animal.history}</Text>

      <TouchableOpacity
        onPress={notification}
        style={css.buttonGreen}
      >
        <Text style={css.buttonText}>Adotar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("AdoptionList")}
        style={css.buttonGreen}
      >
        <Text style={css.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

const specificStyle = StyleSheet.create({
  specificConteiner: {
    backgroundColor: "#fff",
    padding: 10
  },
  title: {
    fontSize: 30,
    color: '#434343',
  },
})

export default AnimalPage