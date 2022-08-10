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
                    animalList.push()
                });
                setAnimals(animalList)
            }
        );
    }

    useEffect(loadData, []);

    console.log("LENGTH ANIMAL " + animals.length)
    for(let i = 0; i < animals.length; i++){        
        console.log("Animal" + i + " => " + animals[i])
    }

    if (image !== null) {

        const ref = storage.ref('imgAnimals/7d6e67e9-980d-4d2f-947a-c96edb97355e')
        ref.getDownloadURL().then(url => {
            console.log(url);
            setImage(url);
        }).catch(error => {
            console.log(error);
        });
    }

    return (
        <View>
            
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            <Text>List Animais</Text>
        </View>
    )
}

export default ListAnimals