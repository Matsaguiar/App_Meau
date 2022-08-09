import { Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { css } from '../assets/css/Css'
import { auth, db, storage } from '../firebase'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker';
import { useState, useEffect } from 'react'
import { Image, FlatList } from 'react-native'

const ListAnimals =  () => {

    let animalList = []
    const [image, setImage] = useState();
    const [animals, setAnimals] = useState([]);

    db.collection("Users").doc(auth.currentUser?.email).collection("Meus_animais").get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data().Nome)
            animalList.push(doc.data().Nome)
        })
      }
    )

    for(let i = 0; i < animalList.length; i++){        
        console.log("Animal" + i + " => " + animalList[i])
    }

    // setAnimals(animalList)

    // console.log("animals Length: " + animals.length)

    if(image !== null){

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
            {image && <Image source={{uri: image}} style={{width: 200, height: 200}} />}
            <Text>List Animais</Text>
        </View>
    )
}

export default ListAnimals