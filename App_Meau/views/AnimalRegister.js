import { Text, View, TouchableOpacity, TextInput, Alert } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { css } from '../assets/css/Css'
import { auth, db, storage} from '../firebase'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid'; 
import { Image } from 'react-native'


const AnimalRegister = () => {
  
  const animals_collections = db.collection('Animais');
  const user_collection = db.collection('Users');

    const [name, setName] = useState('')
    const [species, setSpecies] = useState('')
    const [size, setSize] = useState('')
    const [breed, setBreed] = useState('')
    const [age, setAge] = useState(0)
    const [temperament, setTemperament] = useState('')
    const [health, setHealth] = useState('')
    const [needs, setNeeds] = useState('')
    const [objects, setObjects] = useState('')
    const [aboutAnimal, setAboutAnimal] = useState('')
    
    const [image, setImage] = useState(null);
    const [imageUuid, setImageUuid] = useState('');

    const navigation = useNavigation()
    
    const goBack = () => {
        navigation.replace("LoginScreen")
    }

    const handleRegister = async () => {

      await uploadImage(image, imageUuid);

      const ref = storage.ref('imgAnimals/' + imageUuid);

      let imageUrl;

      await ref.getDownloadURL().then(url => {
        imageUrl = url;
      })
      .catch(error => {
        console.log(error);
      });


      animals_collections.doc(name)
        .set({
            name: name,
            breed: breed,
            age: parseInt(age),
            owner: db.collection('Users').doc(auth.currentUser?.email),
            profilePicture: imageUrl,
          })
          .then(() => {
            Alert.alert(name + ' cadastrado com sucesso!')
            navigation.replace("LoginScreen")
          })
          .catch((error) => {
            console.error("Erro escrita DB: ", error);
          });
          
          user_collection.doc(auth.currentUser?.email)
          .collection("Meus_animais").add({
            animal_ref: animals_collections.doc(name),
            name: name,
            breed: breed,
            age: parseInt(age),
            profilePicture: imageUrl,
          })
          .then(() => {
            console.log("Animais atualizados com sucesso");
          })
          .catch((error) => {
            console.error("Erro atualizando DB: ", error);
          });

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
    
    const uploadImage = async (uri, imageName) => {
    
      const response = await fetch(uri);
      const blob = await response.blob();
      const ref = storage.ref().child('imgAnimals/' + imageName);
      return ref.put(blob);
  }

    return(

        <View style={css.container}>

        {/* <Text>Tenho interesse em cadastrar o animal para:</Text>

        <View>
          <TouchableOpacity style={css.buttonGreen}>
            <Text>Adoção</Text>
          </TouchableOpacity>
         
         
          <TouchableOpacity style={css.buttonGreen}>
            <Text>Apadrinhar</Text>
          </TouchableOpacity>
          
          
          <TouchableOpacity style={css.buttonGreen}>
            <Text>Ajuda</Text>
          </TouchableOpacity>

        </View> */}

        <TextInput style={css.loginInput}
            placeholder="Nome"
            value = {name}
            onChangeText={(text) => setName(text)}
        />

        {image && <Image source={{uri : image}} style = {{width: 200, height: 200}}/>}

        <TouchableOpacity
          style={css.buttonGreen}
          onPress={() => openImagePickerAsync()}
        >
          <Text>Adicionar foto</Text>
        </TouchableOpacity>


        <TextInput style={css.loginInput}
            placeholder="Raça"
            value = {breed}
            onChangeText={(text) => setBreed(text)}
        />
        
        <TextInput style={css.loginInput}
            placeholder="Idade"
            value = {age}
            onChangeText={(text) => setAge(text)}
        />

        <TouchableOpacity 
          onPress={handleRegister}
          style={css.buttonGreen}
        > 
          <Text style={css.buttonText}>Registrar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={goBack}
          style={css.buttonGreen}
        > 
          <Text style={css.buttonText}>Voltar</Text>
        </TouchableOpacity>

      </View>

    )

}


export default AnimalRegister