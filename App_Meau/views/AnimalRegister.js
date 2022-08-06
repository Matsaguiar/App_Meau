import { Text, View, TouchableOpacity, TextInput, Alert } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { css } from '../assets/css/Css'
import { auth, db, storage} from '../firebase'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker';



const AnimalRegister = () => {
  
  const animals_collections = db.collection('Animais');
  const user_collection = db.collection('Users');

    const [name, setName] = useState('')
    const [species, setSpecies] = useState('')
    const [size, setSize] = useState('')
    const [breed, setBreed] = useState('')
    const [age, setAge] = useState(null)
    const [temperament, setTemperament] = useState('')
    const [health, setHealth] = useState('')
    const [needs, setNeeds] = useState('')
    const [objects, setObjects] = useState('')
    const [aboutAnimal, setAboutAnimal] = useState('')
    
    const [image, setImage] = useState(null);

    const navigation = useNavigation()
    
    const goBack = () => {
        navigation.replace("LoginScreen")
    }

    const handleRegister = () => {

        animals_collections.doc(name)
            .set({
                Nome: name,
                Raca: breed,
                age: parseInt(age),
                // dono: 'Users/' + auth.currentUser?.email,
                owner: db.collection('Users').doc(auth.currentUser?.email),
            })
            .then(() => {
              Alert.alert(name + ' cadastrado com sucesso!')
                // console.log(name, " - idade:", age, " - Cadastrado com sucesso");
                navigation.replace("LoginScreen")
            })
            .catch((error) => {
                console.error("Erro escrita DB: ", error);
            }
        )

        user_collection.doc(auth.currentUser?.email)
            .collection("Meus_animais").add({
                Referencia: animals_collections.doc(name),
                Nome: name,
                Raca: breed,
                age: parseInt(age)
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
      // console.log(pickerResult);

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