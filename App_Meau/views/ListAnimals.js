import { Text, View} from 'react-native'
import React from 'react'
import { css } from '../assets/css/Css'
import { auth, db, storage } from '../firebase'
import { useNavigation } from '@react-navigation/native'
import { useState, useEffect } from 'react'
import { Image, FlatList } from 'react-native'


const downloadImages = async (animal) => {

    console.log("Entrou no download")
    console.log(animal)
    
    const ref = storage.ref('imgAnimals/' + animal.ProfilePicture);
    const url = await ref.getDownloadURL();
    
    console.log("URL : " + url)
    console.log("Saiu do download")
    console.log("----------------------------------------------------")
    return url;
};

const renderItem = ({ item }) => {

    // const [image, setImage] = useState('')

    if(item.ProfilePicture === undefined || item.ProfilePicture === '') {
        return (
            <View>
                <Text>{item.Nome}</Text>
            </View>
        );
    }

    item.ProfilePicture = downloadImages(item)
    .catch(error => {
        console.log(error)
    });

        // setImage(item.ProfilePicture)
    
    return (
        <View>
            <Image source={{ uri: item.ProfilePicture }} style={{ width: 200, height: 200 }} />
            <Text>{item.Nome}</Text>
        </View>
    );
}

const ListAnimals = () => {
    
    const [animals, setAnimals] = useState([])
    const [loading, setLoading] = useState(true);
    // const [image, setImage] = useState('')

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
            style={{ height: 0.5, width: '100%', backgroundColor: '#C8C8C8', marginTop: '10px', marginBottom: '10px' }}
          />
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

            <Text>Usando map:</Text>

            {
                animals.map((animal) => {<Text>{animal.Nome}</Text>})
            }

        </View>
    )
}

export default ListAnimals