import { Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { css } from '../assets/css/Css'
import { auth, db, storage } from '../firebase'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker';
import { useState, useEffect } from 'react'
import { Image, FlatList } from 'react-native'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const AdoptionList = () => {

  const navigation = useNavigation()
  const user_collection = db.collection('Users');
  const animals_collections = db.collection('Animals');

  const [image, setImage] = useState();
  const [animals, setAnimals] = useState([]);

  const loadData = () => {
    animals_collections.get()
      .then((querySnapshot) => {
        const adoptionList = [];
        querySnapshot.forEach((doc) => {
          adoptionList.push(doc.data())
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
        style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8' }}
      />
    );
  };

  const renderItem = ({ item }) => {
    console.log(item)
    //if(item.ProfilePicture === undefined) {
    return (
      <View>
        {/* <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>
              Idade: {item.age}
            </Card.Text>
            <TouchableOpacity
              onPress={() => navigation.replace("AnimalPage", { animal: item})}
              style={css.buttonGreen}
            >
              <Text style={css.buttonText}>Mais Detalhes</Text>
            </TouchableOpacity>
          </Card.Body>
        </Card> */}
        <Text>Nome: {item.name}</Text>
        <Text>Idade: {item.age}</Text>
      </View>
    )
  };

  return (
    <View>
      <Text >List Animais</Text>

      <FlatList
        data={animals}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        ItemSeparatorComponent={ItemSeparatorView}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate("LoginScreen")}
        style={css.buttonGreen}
      >
        <Text style={css.buttonText}>Sair</Text>
      </TouchableOpacity>

    </View>
  )
}

export default AdoptionList