import { KeyboardAvoidingView, Platform, Image, TouchableOpacity, Text, View, ScrollView } from 'react-native';
import React from 'react'
import { StyleSheet } from "react-native";
import { css } from '../assets/css/Css'
import { auth, db } from '../firebase'
import { useNavigation } from '@react-navigation/native'
import { useState, useEffect } from 'react'
import { FlatList } from 'react-native'
import Card from '../components/AnimalCard';

const ListMyAnimals = () => {
  const navigation = useNavigation()
  const [animals, setAnimals] = useState([])

  const loadData = () => {
    const animalList = [];
    db.collection("Users")
    .doc(auth.currentUser?.email)
    .collection("Meus_animais").get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => { 
          animalList.push(doc.data()) 
        });
        setAnimals(animalList)
      });
  }

  useEffect(loadData, []);

  const ItemSeparatorView = () => {
    return (
      <View
        style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }}
      />
    );
  };

  const renderItem = ({ item }) => {
    return (
      <View>
          <Card style={{ width: '18rem' }}>
            <Text style={specificStyle.listAnimal}>{item.name}</Text>
            {
              item.profilePicture ?
                <Image source={{ uri: item.profilePicture }} style={[{ width: 344, height: 183 }]} />
                : null
            }
          </Card>
      </View >
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
          />

          {/* <TouchableOpacity
            onPress={() => navigation.navigate("LoginScreen")}
            style={[css.buttonGreen, specificStyle.center]}
          >
            <Text style={[css.buttonText]}>Voltar</Text>
          </TouchableOpacity> */}

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
  listAnimal: {
    backgroundColor: '#fee29b',
    width: 344,
    height: 32,
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingTop: 6,
    color: '#434343',
    fontFamily: 'Roboto',
    fontSize: 14,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 80,
    flex: 1
  },
})

export default ListMyAnimals