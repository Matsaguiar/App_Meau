import { KeyboardAvoidingView, Platform, TextInput, Image, Alert, TouchableOpacity, Text, View, ScrollView } from 'react-native';
import React, { useEffect, useState, useRef } from 'react'
import { css } from '../assets/css/Css'
import { StyleSheet } from "react-native";
import { auth, db, storage } from '../firebase'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';

const UserData = () => {
  const [image, setImage] = useState('')
  const [imageUuid, setImageUuid] = useState('');
  const [userProfilePicture, setUserProfilePicture] = useState('')
  const [user, setUser] = useState('')
  const navigation = useNavigation()

  const loadData = () => {
    console.log("auth: "+auth.currentUser?.email)
    db.collection('Users').doc(auth.currentUser?.email)
      .get()
      .then((querySnapshot) => {
        console.log("queryyyyy: "+querySnapshot.data())
        setUser(querySnapshot.data())
      }).catch((error) => {
        console.log("Error getting document:", error);
    });
  }

  useEffect(async () => {
    const user = auth.currentUser?.email;
    
    let profilePicture;
    
    await 
      db.collection('Users')
        .doc(user).get()
        .then(doc => {
      profilePicture = doc.data().profilePicture;
      console.log(profilePicture)
      setUserProfilePicture(profilePicture)
    }).catch(error => {
      console.log(error)
    });
    loadData();
  }, []);

  const hendleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log('exit');
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

    db.collection('Users').doc(auth.currentUser?.email).update({
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
        </View>
        <View style={css.loginLogomarca}>
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


          <Text>Nome: {user.fullName}</Text>
          <Text>Email: {auth.currentUser?.email}</Text>
          <Text>Idade: {user.age}</Text>
          <Text>Endereço: {user.address}</Text>
          <Text>Estado: {user.state}</Text>

          <TouchableOpacity
            onPress={openImagePickerAsync}
            style={css.buttonGreen}
          >
            <Text style={css.buttonText}>Alterar foto(Galeria)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={openCamera}
            style={css.buttonGreen}
          >
            <Text style={css.buttonText}>Alterar foto(Câmera)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={hendleSignOut}
            style={css.buttonGreen}
          >
            <Text style={css.buttonText}>Sair da conta</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            onPress={() => navigation.navigate("LoginScreen")}
            style={css.buttonGreen}
          >
            <Text style={css.buttonText}>Voltar</Text>
        </TouchableOpacity> */}
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

export default UserData