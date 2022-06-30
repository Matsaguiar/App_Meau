import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Separator = () => <View style={styles.separator} />;

export default function Login() {
  return (
    
    <SafeAreaView style={styles.container}>
  
      <Text style={styles.tilte}>Login</Text>
      
      <Separator/>

      <Text>Usuário:</Text>
      <TextInput style={styles.input} placeholder='E-mail'></TextInput>

      <Separator/>

      <Text>Senha:</Text>
      <TextInput style={styles.input} placeholder='Senha'></TextInput>
  
      <Separator/>

      <Button title='Entrar' onPress={ () => alert('Não implementado ainda')}/>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#DDD',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    input : {
      height: 35,
      borderWidth : 2,
      color: 'black'
    },
  
    separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
  
    tilte: {
      fontSize: 30,
      color: '#000',
    }
  });
