import { Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { css } from '../assets/css/Css'
import { auth, db, storage } from '../firebase'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';


const LoginScreen = () => {

  const [image, setImage] = useState('')
  const [imageUuid, setImageUuid] = useState('');

  const [userProfilePicture, setUserProfilePicture] = useState('')

  const navigation = useNavigation()

  useEffect(async () => {

    const user = auth.currentUser?.email;

    let profilePicture;

    await db.collection('Users').doc(user).get().then(doc => {
      profilePicture = doc.data().profilePicture;
      console.log(profilePicture)
      setUserProfilePicture(profilePicture)
    }).catch(error => {
      console.log(error)
    });
  }, []);

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

  }

  const uploadImage = async (uri, imageName) => {

    db.collection('Users').doc(auth.currentUser?.email).set({
      profilePicture: imageName
    });

    console.log("Image: ", image + " ImageUuid: ", imageUuid);

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

      {
        userProfilePicture !== '' ?
          <Image source={{ uri: userProfilePicture }} style={{ width: 150, height: 200, borderRadius: 200, borderWidth: 5, borderColor: '#88c9bf', marginBottom: 10 }} />
          : null
      }

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

      {
        image !== '' ? <Image source={{ uri: image }} style={{ width: 150, height: 200, borderRadius: 200, borderWidth: 5, borderColor: '#88c9bf', marginBottom: 10 }} /> : null
      }
      
      {
        image !== '' ? 
        <TouchableOpacity
          onPress={() => uploadImage(image, imageUuid)}
          style={css.buttonGreen}
        >
          <Text>Upload</Text>

        </TouchableOpacity>
        : null
      }

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

      <TouchableOpacity
        onPress={() => navigation.navigate("AdoptionList")}
        style={css.buttonGreen}
      >
        <Text style={css.buttonText}>Lista de Adoção</Text>
      </TouchableOpacity>

    </View>
  )
}

export default LoginScreen
