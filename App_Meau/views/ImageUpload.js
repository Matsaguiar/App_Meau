import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { css } from '../assets/css/Css';
import {auth, db, storage} from '../firebase';

const ImageUpload = () => {

    const [image, setImage] = React.useState(null);

    let openImagePickerAsync = async () => {

        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("Permission to access camera roll is required!");
          return;
        }
    
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        console.log(pickerResult);

        if (pickerResult.cancelled === true) {
            console.log("cancelled");
            return;
        }

        uploadImage(pickerResult.uri, 'gatoTeste.jpg')
        .then(() => {
            console.log('Uploaded');
        }).catch(error => {
            console.log('ERRO >>>\nA' + error);
        }); 

        setImage(pickerResult.uri);
    }

    const uploadImage = async (uri, imageName) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        const ref = storage.ref().child('testImages/' + imageName);
        return ref.put(blob);
    }

    if(image !== null){

        console.log("entrou");

        const ref = storage.ref().child('testImages/');
        ref.getDownloadURL().then(url => {
            console.log(url);
        }).catch(error => {
            console.log(error);
        });


        return (
            <View style={css.container}>
                <View>
                    <Image source={{ uri: image }} style={{width:450, height:450}} />
                </View>
                <View>
                    <Text>Uri</Text>
                </View>
            </View>
        );
    }

    return(

        <View style={css.container}>

            <Text>Image View</Text>

            <TouchableOpacity
                onPress={() => openImagePickerAsync()}
                style={css.buttonYellow}
            >
                <Text>Upload Image</Text>
            </TouchableOpacity>


        </View>

    )

}

export default ImageUpload;