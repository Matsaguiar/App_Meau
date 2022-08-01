import { Text, View, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { css } from '../assets/css/Css'
import { auth, db} from '../firebase'
import { useNavigation } from '@react-navigation/native'


const AnimalRegister = () => {
  
  const animals_collections = db.collection('Animais');

    const [name, setName] = useState('')
    const [breed, setBreed] = useState('')
    const [age, setAge] = useState(null)
    
    const navigation = useNavigation()
    
    const goBack = () => {
        navigation.replace("LoginScreen")
    }

    const handleRegister = () => {

        animals_collections.doc(name)
            .set({
                Nome: name,
                Raca: breed,
                // age: parseInt(age),
            })
            .then(() => {
                console.log(name, " - idade:", age, " - Cadastrado com sucesso");
                navigation.replace("LoginScreen")
            })
            .catch((error) => {
                console.error("Erro escrita DB: ", error);
            }
        )
    }
    
    return(

        <View style={css.container}>

        <Text>Registrar Animal</Text>

        <TextInput style={css.loginInput}
            placeholder="Nome"
            value = {name}
            onChangeText={(text) => setName(text)}
        />
        
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