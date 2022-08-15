import { KeyboardAvoidingView, Platform, TextInput, Image, TouchableOpacity, Text, View, ScrollView } from 'react-native';
import React from 'react'
import { StyleSheet } from "react-native";
import { useState } from 'react'
import { css } from '../assets/css/Css'
import { auth, db} from '../firebase'
import { useNavigation } from '@react-navigation/native'
import Radio from '../components/Radio'
import { Tile } from '@rneui/base';


export default function AnimalRegister({}) {
  
  const animals_collections = db.collection('Animals');

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

  const [selected, setSelected] = useState(0);
  const navigation = useNavigation()
    
  const goBack = () => {
    navigation.replace("LoginHome")
  }
  const handleRegister = () => {

    animals_collections.doc(name)
        .set({
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
            tutor: db.collection('Users').doc(auth.currentUser?.email),
        })
        .then(() => {
            console.log(name, " - idade:", age, " - Cadastrado com sucesso");
            navigation.replace("LoginHome")
        })
        .catch((error) => {
            console.error("Erro escrita DB: ", error);
        }
    )
  }
    
  return(
    <KeyboardAvoidingView 
        behavior={Platform.OS == "ios" ? "padding" : "height"} 
        style={[css.container, specificStyle.specificConteiner]}
    >
      <ScrollView style={{width:"95%"}}>
      <Text style={specificStyle.title}>Adoção</Text>
        <View>   
          <Text style={[css.separator, css.yellowText]}>NOME DO ANIMAL</Text>
          <TextInput style={css.loginInput}
            placeholder = 'Nome do animal'
            value = {name}
            onChangeText={value => {
              setName(value)
            }}
          />
          <Text style={[css.separator, css.yellowText]}>FOTOS DO ANIMAL</Text>
          <TextInput style={css.loginInput}
            placeholder = 'Adicionar fotos'
          />
          <Text style={[css.separator, css.yellowText]}>ESPÉCIE</Text>
          <TextInput style={css.loginInput}
            placeholder = 'Cachorro ou Gato'
            value = {species}
            onChangeText={value => {
              setSpecies(value)
            }}
          />
          <Text style={[css.separator, css.yellowText]}>SEXO</Text>
          <TextInput style={css.loginInput}
            placeholder = 'Macho, Fêmea'
            value = {sex}
            onChangeText={value => {
              setSex(value)
            }}
          />
          <Text style={[css.separator, css.yellowText]}>PORTE</Text>
          <TextInput style={css.loginInput}
            placeholder = 'Pequeno, Médio, Grande'
            value = {size}
            onChangeText={value => {
              setSize(value)
            }}
          />
          <Text style={[css.separator, css.yellowText]}>IDADE</Text>
          <TextInput style={css.loginInput}
            placeholder = 'Filhote, Adulto, Idoso'
            value = {age}
            onChangeText={value => {
              setAge(value)
            }}
          />        
          <Text style={[css.separator, css.yellowText]}>TEMPERAMENTO</Text>
          <TextInput style={css.loginInput}
            placeholder = 'Brincalhão, Tímido, calmo, guarda, amoroso, preguiçoso'
            value = {temperament}
            onChangeText={value => {
              setTemperament(value)
            }}
          />
          <Text style={[css.separator, css.yellowText]}>SAÚDE</Text>
          <TextInput style={css.loginInput}
            placeholder = 'Vacinado, vermifugado, castrado, doente'
            value = {health}
            onChangeText={value => {
              setHealth(value)
            }}
          />
          <Text style={[css.separator, css.yellowText]}>DOENÇAS</Text>
          <TextInput style={css.loginInput}
            placeholder="Doeças do animal"
            value = {sick}
            onChangeText={value => {
              setSick(value)
            }}
          />
          <Text style={[css.separator, css.yellowText]}>EXIGÊNCIAS PARA ADOÇÃO</Text>
          <TextInput style={css.loginInput}
            placeholder= 'Termo de adoção, Visita prévia ao animal, acompanhamento pós adoção'
          />
          <Text style={[css.separator, css.yellowText]}>SOBRE O ANIMAL</Text>
          <TextInput style={css.loginInput}
            placeholder="Compartilhe a história do animal"
            value = {history}
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
