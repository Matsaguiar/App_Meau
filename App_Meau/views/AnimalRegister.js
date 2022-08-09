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
  const [sex, setSex] = useState('');
  const [size, setSize] = useState('');
  const [age, setAge] = useState('');
  const [temperament, setTemperament] = useState('');
  const [health, setHealth] = useState('');
  const [history, setHistory] = useState('');
  const [playful, setPlayful] = useState(false);
  const [shy, setShy] = useState(false);
  const [calm, setCalm] = useState(false);
  const [guard, setGuard] = useState(false);
  const [lovely, setLovely] = useState(false);
  const [lazy, setLazy] = useState(false);
  const [vaccinated, setVaccinated] = useState(false);
  const [vermifugated, setVermifugated] = useState(false);
  const [neutered, setNeutered] = useState(false);
  const [sick, setSick] = useState(false);

  const [selected, setSelected] = useState(0);
  const navigation = useNavigation()
    
  const goBack = () => {
    navigation.replace("LoginScreen")
  }
  const handleRegister = () => {

    animals_collections.doc(name)
        .set({
            name: name,
            sex: sex,
            size: size,
            age: age,
            temperament: temperament,
            health: health,
            sick: sick,
            history: history,
            tutor: 'Users/' + auth.currentUser?.email
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
          <Text style={[css.separator, css.yellowText]}>SEXO</Text>
          <Radio 
            selected={sex}
            options={['Macho', 'Femea']} 
            horizontal={true}
            onChangeSelect={(opt, i) => {
              console.log(opt)
              setSelected(i)
              setSex(selected)
            }}
          />
          <Text style={[css.separator, css.yellowText]}>PORTE</Text>
          <Radio style={{color: '#777'}}
            selected={size}
            options={['Pequeno', 'Médio', 'Grande']}
            horizontal={true}
            onChangeSelect={(opt, i) => {
              console.log(opt)
              setSelected(i)
              setSize(selected)
            }}
          />
          <Text style={[css.separator, css.yellowText]}>IDADE</Text>
          <Radio style={{color: '#777'}}
            selected={age}
            options={['Filhote', 'Adulto', 'Idoso']}
            horizontal={true}
            onChangeSelect={(opt, i) => {
              console.log(opt)
              setSelected(i)
              setAge(selected)
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
        </View>

        <View style={css.buttonContainer_Scroll}>
          <TouchableOpacity 
            onPress={handleRegister}
            style={[css.buttonYellow]}
          >
            <Text style={css.buttonText}>COLOCAR PARA ADOÇÃO</Text>
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
