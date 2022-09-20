import { KeyboardAvoidingView, Platform, Image, TouchableOpacity, Text, View, ScrollView } from 'react-native';
import React from 'react'
import { StyleSheet } from "react-native";
import { css } from '../assets/css/Css'
import { auth, db } from '../firebase'
import { useNavigation } from '@react-navigation/native'
import { useState, useEffect } from 'react'
import { FlatList } from 'react-native'
import Card from '../components/AnimalCard';

const AdoptionList = () => {

  const navigation = useNavigation()
  const animals_collections = db.collection('Animals');

  const [image, setImage] = useState();
  const [animals, setAnimals] = useState([]);

  const loadData = () => {
    animals_collections
      .where('adoption', '==', true)
      //      .where('owner', '!=', (auth.currentUser?.email))
      .get()
      .then((querySnapshot) => {
        const adoptionList = [];
        querySnapshot.forEach((doc) => {
          if (doc.data().owner != auth.currentUser?.email) {
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
      <View
        style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8', marginTop: 10, marginBottom: 10 }}
      />
    );
  };

  const renderItem = ({ item }) => {
    return (
      <View>
        <TouchableOpacity onPress={() => navigation.navigate("AnimalPage", { animal: item.data(), idAnimal: item.id })}>
          <Card style={{ width: '18rem' }}>
            <Text style={specificStyle.listAnimal}>{item.data().name}</Text>
            {
              item.data().profilePicture ?
                <Image source={{ uri: item.data().profilePicture }} style={[{ width: 344, height: 183 }]} />
                : null
            }
            <Text style={specificStyle.listAnimal}>{item.data().sex}                         {item.data().age}                             {item.data().size}</Text>
          </Card>
        </TouchableOpacity>
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

export default AdoptionList