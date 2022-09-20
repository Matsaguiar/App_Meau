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
  const notification_colletions = db.collection('Notifications');

  const [image, setImage] = useState();

  const notification = () => {
    notification_colletions.doc()
      .set({
        owner: route.params.animal.owner,
        animal: route.params.animal.name,
        newOwner: (auth.currentUser?.email),
        idAnimal: route.params.idAnimal,
        notify: false,
      })
      .then(() => {
        Alert.alert(' Notificação enviada com sucesso!')
        console.log(' Notificação enviada com sucesso!')
        navigation.navigate("AdoptionList")
      })
      .catch((error) => {
        console.error("Erro escrita DB: ", error);
      })
  }


  return (
    // <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={[css.container, css.bg]}>
    <KeyboardAvoidingView style={[specificStyle.container]}>
      <View style={[css.container]}>

      </View>
      {
        route.params.animal.profilePicture ?
          <Image source={{ uri: route.params.animal.profilePicture }} style={{ width: 360, height: 184, marginHorizontal: 30 }} />
          : null
      }

      <Text style={[specificStyle.textYellow]}>Nome</Text>
      <Text style={[specificStyle.text]}>{route.params.animal.name}</Text>
      <Text style={[specificStyle.textYellow]}>Idade: </Text>
      <Text style={[specificStyle.text]}>{route.params.animal.age}</Text>
      <Text style={[specificStyle.textYellow]}>Sexo</Text>
      <Text style={[specificStyle.text]}>{route.params.animal.sex}</Text>
      <Text style={[specificStyle.textYellow]}>Tamanho</Text>
      <Text style={[specificStyle.text]}>{route.params.animal.size}</Text>
      <Text style={[specificStyle.textYellow]}>Idade</Text>
      <Text style={[specificStyle.text]}>{route.params.animal.age}</Text>
      <Text style={[specificStyle.textYellow]}>Temperamento</Text>
      <Text style={[specificStyle.text]}>{route.params.animal.temperament}</Text>
      <Text style={[specificStyle.textYellow]}>Saúde</Text>
      <Text style={[specificStyle.text]}>{route.params.animal.health}</Text>
      <Text style={[specificStyle.textYellow]}>Doenças</Text>
      <Text style={[specificStyle.text]}>{route.params.animal.sick}</Text>
      <Text style={[specificStyle.textYellow]}>Historia</Text>
      <Text style={[specificStyle.text]}>{route.params.animal.history}</Text>

      <TouchableOpacity
        onPress={notification}
        style={[css.buttonGreen, specificStyle.center]}
      >
        <Text style={css.buttonText}>Adotar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("AdoptionList")}
        style={[css.buttonGreen, specificStyle.center]}
      >
        <Text style={css.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

const specificStyle = StyleSheet.create({
  specificConteiner: {
    flex:1,
    backgroundColor: "#fff",
    padding: 10
  },
  title: {
    fontSize: 30,
    color: '#434343',
  },
  textYellow: {
    marginHorizontal: 25,
    color: '#f7a800',
    fontFamily: 'Roboto',
    fontSize: 14,
    display: 'flex',
    fontWeight: 'bold',
    flex: 1,
  },
  text: {
    marginHorizontal: 25,
    color: '#757575',
    fontFamily: 'Roboto',
    fontSize: 14,
    display: 'flex',
    justifyContent: 'space-around',
    flex: 1,
  },
  container: {
    marginTop: 10,
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 80,
    flex: 1
  },
})

export default AnimalPage