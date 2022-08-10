import { Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { css } from '../assets/css/Css'
import { auth, db, storage } from '../firebase'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid'; 

const LoginScreen = () => {

  const [image, setImage] = useState('')
  const [imageUuid, setImageUuid] = useState(null);



  const navigation = useNavigation()

  const hendleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Home")
      })
      .catch(error => alert(error.message)) 
  }

  let openImagePickerAsync = async () => {

    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
        console.log("cancelled");
        return;
    }
    
    let imageId = uuid.v4();
    
    setImage(pickerResult.uri);
    setImageUuid(imageId);

    console.log(image)
    console.log(imageUuid)

    uploadImage(image, imageUuid)
  }
  
  const uploadImage = async (uri, imageName) => {

    db.collection('Users').doc(auth.currentUser?.email).set({
      profilePicture: imageName
    }
    )

    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = storage.ref().child('imgUsers/' + imageName);
    return ref.put(blob);
}

  const listAnimals = () => {
    navigation.replace("ListAnimals")
  }

  const registerAnimal = () => {
    navigation.replace("AnimalRegister")
  }

  return (
    <View style={css.container}>

      <Text>Bem vindo: {auth.currentUser?.email}</Text>
      <TouchableOpacity 
        onPress={hendleSignOut}
        style={css.buttonGreen}
      > 
        <Text style={css.buttonText}>Sair</Text>
      </TouchableOpacity>
      
    <TouchableOpacity
      onPress={openImagePickerAsync}
      style={css.buttonGreen}
    >
      <Text style={css.buttonText}>Foto Usuário</Text>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={listAnimals}
      style={css.buttonGreen}
    >
      <Text style={css.buttonText}>Meus Animais</Text>
    </TouchableOpacity>

      <TouchableOpacity 
        onPress={registerAnimal}
        style={css.buttonGreen}
      > 
        <Text style={css.buttonText}>Cadastrar Animal</Text>
      </TouchableOpacity>

    </View>
  )
}

export default LoginScreen
