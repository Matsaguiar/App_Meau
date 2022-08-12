import { Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { css } from '../assets/css/Css'
import { auth, db, storage } from '../firebase'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker';
import { useState, useEffect } from 'react'
import { Image, FlatList } from 'react-native'

const ListAnimals = () => {

    const user_collection = db.collection('Users');
    const animals_collections = db.collection('Animais');

    const [image, setImage] = useState();
    const [animals, setAnimals] = useState([]);
    
    
    const loadData = () => {
        db.collection("Users").doc(auth.currentUser?.email).collection("Meus_animais").get()
        .then((querySnapshot) => {
            const animalList = [];
            querySnapshot.forEach((doc) => {
                animalList.push(doc.data())
            });
            setAnimals(animalList)
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

        if(item.ProfilePicture === undefined) {

            return (
                <View>
                    <Text>{item.Nome}</Text>
                </View>
            )

        }

        if(item.ProfilePicture !== null) {
            const ref = storage.ref('imgAnimals/' + item.ProfilePicture)
                ref.getDownloadURL().then(url => {
                    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAA ENTROU NA FUNCAO")
                    console.log(url);
                    setImage(url);
                    
                }).catch(error => {
                    console.log(error);
                });
                
            }
            
            return (
                <View>
    
                    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                    <Text>{item.Nome}</Text>
    
                </View>
            );
    };

    return (

        <View>

            <Text >List Animais</Text>

            <FlatList
                data = {animals}
                renderItem = {renderItem}
                keyExtractor = {(item) => item.Nome}
                ItemSeparatorComponent = {ItemSeparatorView}
            />

            {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
        </View>
    )
}

export default ListAnimals