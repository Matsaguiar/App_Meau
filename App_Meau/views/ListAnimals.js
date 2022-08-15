import { Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { css } from '../assets/css/Css'
import { auth, db, storage } from '../firebase'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker';
import { useState, useEffect } from 'react'
import { Image, FlatList } from 'react-native'

const ListAnimals = () => {

    const [image, setImage] = useState('');
    const [animals, setAnimals] = useState([]);
        
    const loadData = async () => {

        await db.collection("Users").doc(auth.currentUser?.email).collection("Meus_animais").get()
        .then((querySnapshot) => {
            
            const animalList = [];

            querySnapshot.forEach((doc) => {
                
                let animal = doc.data()
                
                if(doc.data().ProfilePicture !== undefined) {
                    

                    const ref = storage.ref('imgAnimals/' + animal.ProfilePicture)
                    
                    ref.getDownloadURL().then(url => {
                        
                        console.log(animal.Nome + ' ' + url)

                        setImage(url);
                        
                        console.log(animal.Nome + ' ' + image)
                        animal.ProfilePicture = url;

                    }).catch(error => {
                        console.log(error);
                    });                
                }
                
                animalList.push(animal);
            });

            setAnimals(animalList)
        });
        
        
    }

    useEffect(loadData, []);    

    const ItemSeparatorView = () => {
        return (
          //Item Separator
          <View
            style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8', marginTop: '10px', marginBottom: '10px' }}
          />
        );
    };

    const renderItem = ({ item }) => {

        if(item.ProfilePicture === undefined || item.ProfilePicture === '') {

            return (
                <View>
                    <Text>No pic</Text>
                    <Text>{item.Nome}</Text>
                </View>
            )
        }
    
        // const ref = storage.ref('imgAnimals/' + item.ProfilePicture)
        
        // ref.getDownloadURL().then(url => {

        //     setImage(url);

        // }).catch(error => {
        //     console.log(error);
        // });                

        return (
            <View>

                {<Image source={{ uri: item.ProfilePicture }} style={{ width: 200, height: 200 }} />}

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

        </View>
    )
}

export default ListAnimals