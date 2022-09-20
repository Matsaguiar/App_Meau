import { KeyboardAvoidingView, Platform, Image, TouchableOpacity, Text, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react'
import { css } from '../assets/css/Css'
import { StyleSheet } from "react-native";
import { auth, db, storage } from '../firebase'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';


const LoginScreen = () => {

  const [image, setImage] = useState('')
  const [imageUuid, setImageUuid] = useState('');

  const [userProfilePicture, setUserProfilePicture] = useState('')

  const navigation = useNavigation()

  const func = async () => {

    const user = auth.currentUser?.email;

    let profilePicture;

    await db.collection('Users').doc(user).get().then(doc => {
      profilePicture = doc.data().profilePicture;
      console.log(profilePicture)
      setUserProfilePicture(profilePicture)
    }).catch(error => {
      console.log(error)
    });
  };

  useEffect(() => {
    func();
  });

  const hendleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Home")
      })
      .catch(error => alert(error.message))
  }

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      console.log(result.uri);

      setImage(result.uri);
      setImageUuid(uuid.v4());
    }

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
  }
  const deleteOldImage = async () => {

    const ref = storage.refFromURL(userProfilePicture);

    ref.delete()
      .then(() => {
        console.log("Imagem " + userProfilePicture + " deletada com sucesso")
      }).catch(error => {
        console.log(error)
      });
  }

  const updateUserImage = async (uri, imageName) => {

    await uploadImage(uri, imageName)

    let newImageUrl = await storage.ref('imgUsers/' + imageUuid).getDownloadURL();

    deleteOldImage();

    db.collection('Users').doc(auth.currentUser?.email).set({
      profilePicture: newImageUrl,
    })
      .then(() => {
        setUserProfilePicture(newImageUrl)
        setImage('')
      })
      .catch(error => {
        console.log(error)
      });
  }

  const uploadImage = async (uri, imageName) => {

    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = storage.ref().child('imgUsers/' + imageName);
    return ref.put(blob);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={[css.container, specificStyle.specificConteiner]}
    >
      <ScrollView style={{ width: "95%" }}>
        <View style={css.loginLogomarca}>
          {
            userProfilePicture !== '' ?
              <Image source={{ uri: userProfilePicture }} style={{ width: 150, height: 200, borderRadius: 200, borderWidth: 5, borderColor: '#88c9bf', marginBottom: 10 }} />
              : null
          }

          <Text>Bem vindo: {auth.currentUser?.email}</Text>
        </View>


        <View style={css.loginLogomarca}>

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
                onPress={() => updateUserImage(image, imageUuid)}
                style={css.buttonGreen}
              >
                <Text>Upload</Text>

              </TouchableOpacity>
              : null
          }

          <TouchableOpacity
            onPress={openCamera}
            style={css.buttonGreen}
          >
            <Text style={css.buttonText}>Foto Usuário usando Câmera</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('ListMyAnimals')}
            style={css.buttonGreen}
          >
            <Text style={css.buttonText}>Meus Animais</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('AnimalRegister')}
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

          <TouchableOpacity
            onPress={() => navigation.navigate("Notification")}
            style={css.buttonGreen}
          >
            <Text style={css.buttonText}>Notificação</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("UserChats")}
            style={css.buttonGreen}
          >
            <Text style={css.buttonText}>Minhas Conversas</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={hendleSignOut}
            style={css.buttonGreen}
          >
            <Text style={css.buttonText}>Sair</Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  )
}
const specificStyle = StyleSheet.create({
  specificConteiner: {
    backgroundColor: "#fff",
    padding: 10
  },
  title: {
    fontSize: 30,
    color: '#434343',
  },
})

export default LoginScreen