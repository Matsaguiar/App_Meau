import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, TextInput, Image, TouchableOpacity, Text, View, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { css } from '../assets/css/Css';

const Separator = () => <View style={css.separator} />;

export default function App() {

  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  const [display, setDisplay]=useState('none');

  const entrar = () => {
    alert('Ainda não implementado')
    console.log("Entrou")
    console.log(email)
    console.log(password)
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={[css.container, css.bg]}>

      <View style = {css.login__logomarca}>
        <Image source={require('../assets/img/logo.png')}/>
      </View>

      <View>
        <Text style={css.login__msg(display)}>Usuário ou senha inválidos!</Text>
      </View>

      <View style={css.login__form}>      
        <TextInput style={css.login__input}
          placeholder="E-mail"
          onChangeText={value => setEmail(value)}
          keyboardType="email-address"
        />
        <TextInput style={css.login__input}
          placeholder="Senha"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={value => setPassword(value)}
          secureTextEntry={true}
        />
        <TouchableOpacity style={css.login__button} onPress={() => setDisplay('flex')}>
          <Text style={css.login__buttonText}>Entrar</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
      </View>
    </KeyboardAvoidingView>
  );
}