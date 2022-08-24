import { Text, View} from 'react-native'
import React from 'react'
import { css } from '../assets/css/Css'
import { auth, db, storage } from '../firebase'
import { useNavigation } from '@react-navigation/native'
import { useState, useEffect } from 'react'
import { Image, FlatList } from 'react-native'

const ListAnimals = () => {
    
    const [animals, setAnimals] = useState([])

    const loadData = () => {
        
        const animalList = [];

        db.collection("Users").doc(auth.currentUser?.email).collection("Meus_animais").get()
        .then((querySnapshot) => {

            querySnapshot.forEach((doc) => { animalList.push(doc.data()) });

            setAnimals(animalList)
        });
    }

    useEffect(loadData, []);    

    

    const ItemSeparatorView = () => {
        return (
          //Item Separator
          <View
            style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}}
          />
        );
    };


    const renderItem = ({ item }) => {

        if(item.profilePicture === undefined || item.profilePicture === '') {
            return (
                <View>
                    <Text>{item.name}</Text>
                </View>
            );
        }
        
        return (
            <View>
                <Image source={{ uri: item.profilePicture }} style={{ width: 200, height: 200 }} />
                <Text>{item.name}</Text>
            </View>
        );
    }

    return (

        <View>

            <Text >List Animais</Text>

            <FlatList
                data = {animals}
                renderItem = {renderItem}
                keyExtractor = {(item) => item.name}
                ItemSeparatorComponent = {ItemSeparatorView}
            />

            {/* <Text>Usando map:</Text>

            {
                animals.map((animal) => {<Text>{animal.name}</Text>})
            } */}

        </View>
    )
}

export default ListAnimals