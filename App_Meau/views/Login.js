import { StatusBar } from 'expo-status-bar';
import { Text, View, SafeAreaView, TextInput, Button } from 'react-native';
import { css } from '../assets/css/Css';

const Separator = () => <View style={css.separator} />;

export default function App() {
  return (
    
    <SafeAreaView style={css.container}>
      
      <Text style={css.title}>Login</Text>
      
      <Separator/>

      <Text>Usuário:</Text>
      <TextInput style={css.input} placeholder='E-mail'></TextInput>

      <Separator/>

      <Text>Senha:</Text>
      <TextInput style={css.input} placeholder='Senha'></TextInput>
  
      <Separator/>

      <Button title='Entrar' onPress={ () => alert('Ainda não implementado')}/>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}