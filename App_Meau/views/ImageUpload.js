import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { css } from '../assets/css/Css';
import {auth, db, storage} from '../firebase';
import uuid from 'react-native-uuid'

const ImageUpload = () => {

    // var imageId;
    // var imageUri;
    const [image, setImage] = React.useState(null);
    const [imageId, setImageId] = React.useState(null);

    // const [selectedImage, setSelectedImage] = React.useState(null);

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

        let imgId = uuid.v4()
    
        setImage(pickerResult.uri);
        setImageId(imgId);
    }

    const uploadImage = async (uri, imageName) => {

        const response = await fetch(image);
        const blob = await response.blob();
        const ref = storage.ref().child('testImages/' + imageId);
        return ref.put(blob);
    }

    return(

        <View style={css.container}>

            <Text>Image View</Text>

            <TouchableOpacity
                onPress={() => openImagePickerAsync()}
                style={css.buttonYellow}
            >
                <Text>Add Image</Text>
            </TouchableOpacity>

            {image && <Image source={{uri : image}} style={{width : 200, height : 200}}/>}
            <Text>IMAGE PREVIEW</Text>

            <TouchableOpacity
                onPress={() => uploadImage()}
                style={css.buttonYellow}
            >
                <Text>Upload Image</Text>
            </TouchableOpacity>


        </View>

    )

}

export default ImageUpload;