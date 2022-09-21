import { KeyboardAvoidingView, Platform, TextInput, Image, Alert, TouchableOpacity, Text, View, ScrollView } from 'react-native';
import React, { useEffect } from 'react'
import { StyleSheet } from "react-native";
import { useState } from 'react'
import { css } from '../assets/css/Css'
import { auth, db, storage } from '../firebase'
import { useNavigation } from '@react-navigation/native'
import Radio from '../components/Radio'
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';

export default function AnimalRegister() {

  const animals_collections = db.collection('Animals');
  const user_collection = db.collection('Users');

  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [sex, setSex] = useState('');
  const [size, setSize] = useState('');
  const [age, setAge] = useState('');
  const [temperament, setTemperament] = useState('');
  const [health, setHealth] = useState('');
  const [history, setHistory] = useState('');
  const [sick, setSick] = useState(false);
  const [adoption, setAdoption] = useState('');

  const [image, setImage] = useState(null);
  const [imageUuid, setImageUuid] = useState('');

  const [selected, setSelected] = useState(0);
  const navigation = useNavigation()

  useEffect(() => {

  }, [])

  const goBack = () => {
    navigation.navigate("AdoptionList")
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


    animals_collections
      .add({
        name: name,
        species: species,
        sex: sex,
        size: size,
        age: age,
        temperament: temperament,
        health: health,
        sick: sick,
        history: history,
        adoption: !adoption,
        owner: auth.currentUser?.email,
        profilePicture: imageUrl,
      })
      .then((docRef) => {
        Alert.alert(name + ' cadastrado com sucesso!')
        navigation.navigate("AdoptionList")
        user_collection.doc(auth.currentUser?.email)
          .collection("Meus_animais").add({
            animal_ref: docRef.id,
            name: name,
            species: species,
            sex: sex,
            size: size,
            age: age,
            temperament: temperament,
            health: health,
            sick: sick,
            history: history,
            adoption: !adoption,
            profilePicture: imageUrl,
          })
          .then(() => {
            console.log("Animais atualizados com sucesso");
          })
          .catch((error) => {
            console.error("Erro atualizando DB: ", error);
          });
          navigation.navigate("AdoptionList")
      })
      set
      .catch((error) => {
        console.error("Erro escrita DB: ", error);
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={[css.container, specificStyle.specificConteiner]}
    >
      <ScrollView style={{ width: "95%" }}>
        <Text style={specificStyle.title}>Adoção</Text>
        <View>
          <Text style={[css.separator, css.yellowText]}>NOME DO ANIMAL</Text>
          <TextInput style={css.loginInput}
            placeholder='Nome do animal'
            value={name}
            onChangeText={value => {
              setName(value)
            }}
          />
          <Text style={[css.separator, css.yellowText]}>FOTOS DO ANIMAL</Text>
          {image !== '' ? <Image source={{ uri: image }} style={{ width: 200, height: 200 }} /> : null}

          <TouchableOpacity
            style={css.buttonGreen}
            onPress={() => openImagePickerAsync()}
          >
            <Text>Adicionar foto</Text>
          </TouchableOpacity>
          <Text style={[css.separator, css.yellowText]}>ESPÉCIE</Text>
          <TextInput style={css.loginInput}
            placeholder='Cachorro ou Gato'
            value={species}
            onChangeText={value => {
              setSpecies(value)
            }}
          />
          <Text style={[css.separator, css.yellowText]}>SEXO</Text>
          <TextInput style={css.loginInput}
            placeholder='Macho, Fêmea'
            value={sex}
            onChangeText={value => {
              setSex(value)
            }}
          />
          <Text style={[css.separator, css.yellowText]}>PORTE</Text>
          <TextInput style={css.loginInput}
            placeholder='Pequeno, Médio, Grande'
            value={size}
            onChangeText={value => {
              setSize(value)
            }}
          />
          <Text style={[css.separator, css.yellowText]}>IDADE</Text>
          <TextInput style={css.loginInput}
            placeholder='Filhote, Adulto, Idoso'
            value={age}
            onChangeText={value => {
              setAge(value)
            }}
          />
          <Text style={[css.separator, css.yellowText]}>TEMPERAMENTO</Text>
          <TextInput style={css.loginInput}
            placeholder='Brincalhão, Tímido, calmo, guarda, amoroso, preguiçoso'
            value={temperament}
            onChangeText={value => {
              setTemperament(value)
            }}
          />
          <Text style={[css.separator, css.yellowText]}>SAÚDE</Text>
          <TextInput style={css.loginInput}
            placeholder='Vacinado, vermifugado, castrado, doente'
            value={health}
            onChangeText={value => {
              setHealth(value)
            }}
          />
          <Text style={[css.separator, css.yellowText]}>DOENÇAS</Text>
          <TextInput style={css.loginInput}
            placeholder="Doeças do animal"
            value={sick}
            onChangeText={value => {
              setSick(value)
            }}
          />
          <Text style={[css.separator, css.yellowText]}>EXIGÊNCIAS PARA ADOÇÃO</Text>
          <TextInput style={css.loginInput}
            placeholder='Termo de adoção, Visita prévia ao animal, acompanhamento pós adoção'
          />
          <Text style={[css.separator, css.yellowText]}>SOBRE O ANIMAL</Text>
          <TextInput style={css.loginInput}
            placeholder="Compartilhe a história do animal"
            value={history}
            onChangeText={value => {
              setHistory(value)
            }}
          />
          <Text style={[css.separator, css.yellowText]}>Disponivel para Adoção?</Text>
          <Radio
            selected={adoption}
            options={['Sim', 'Não']}
            horizontal={true}
            onChangeSelect={(opt, i) => {
              setSelected(i)
              setAdoption(selected)
            }}
          />
        </View>

        <View style={css.buttonContainer_Scroll}>
          <TouchableOpacity
            onPress={handleRegister}
            style={[css.buttonYellow]}
          >
            <Text style={css.buttonText}>Cadastrar Animal</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={goBack}
            style={[css.buttonGreen]}
          >
            <Text style={css.buttonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
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