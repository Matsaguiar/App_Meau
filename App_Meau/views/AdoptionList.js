import { KeyboardAvoidingView, Platform, TextInput, Image, Alert, TouchableOpacity, Text, View, ScrollView } from 'react-native';
import React from 'react'
import { StyleSheet } from "react-native";
import { css } from '../assets/css/Css'
import { auth, db, storage } from '../firebase'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker';
import { useState, useEffect } from 'react'
import { FlatList } from 'react-native'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const AdoptionList = () => {

  const navigation = useNavigation()
  const user_collection = db.collection('Users');
  const animals_collections = db.collection('Animals');

  const [image, setImage] = useState();
  const [animals, setAnimals] = useState([]);

  const loadData = () => {
    animals_collections
      .where( 'adoption', '==', true)
//      .where('owner', '!=', (auth.currentUser?.email))
      .get()
      .then((querySnapshot) => {
        const adoptionList = [];
        querySnapshot.forEach((doc) => {
          if(doc.data().owner != auth.currentUser?.email){
            adoptionList.push(doc)
          }
        });
        setAnimals(adoptionList)
      }
      );
  }

  useEffect(loadData, []);

  const ItemSeparatorView = () => {
    return (
      //Item Separator
      <View
        style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8', marginTop: 10, marginBottom: 10 }}
      />
    );
  };

  const renderItem = ({ item }) => {

    return (
      <View>

        {/* <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{item.data().name}</Card.Title>
            <Card.Text>
              Idade: {item.data().age}
            </Card.Text>
            <TouchableOpacity
              onPress={() => navigation.replace("AnimalPage", { animal: item})}
              style={css.buttonGreen}
            >
              <Text style={css.buttonText}>Mais Detalhes</Text>
            </TouchableOpacity>
            </Card.Body>
          </Card> */}
        {
          item.data().profilePicture ?
            <Image source={{ uri: item.data().profilePicture }} style={{ width: 200, height: 250 }} />
            : null
        }

        <Text>Nome: {item.data().name}</Text>
        <Text>Idade: {item.data().age}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("AnimalPage", { animal: item.data(), idAnimal: item.id })}
          style={css.buttonGreen}
        >
          <Text style={css.buttonText}>Mais Detalhes</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={[css.container, specificStyle.specificConteiner]}
    >
      <ScrollView style={{ width: "95%" }}>
        <View>
          <FlatList
            data={animals}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={ItemSeparatorView}
          />

          <TouchableOpacity
            onPress={() => navigation.navigate("LoginScreen")}
            style={css.buttonGreen}
          >
            <Text style={css.buttonText}>Voltar</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
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

export default AdoptionList