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


const AnimalPage = ({route}) => {

    const navigation = useNavigation()

    const user_collection = db.collection('Users');
    const animals_collections = db.collection('Animais');

    const [image, setImage] = useState();
    

    return (

        <View>

            <Text >{route.params.animal.Nome}</Text>

            <TouchableOpacity 
                onPress={() => navigation.navigate("LoginScreen")}
                style={css.buttonGreen}
            > 
                <Text style={css.buttonText}>Adotar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={() => navigation.navigate("AdoptionList")}
                style={css.buttonGreen}
            > 
                <Text style={css.buttonText}>Voltar</Text>
            </TouchableOpacity>

        </View>
    )
}

export default AnimalPage