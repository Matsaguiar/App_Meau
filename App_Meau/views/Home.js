import React from 'react';
import { Text, View, Button } from 'react-native';
import { css } from '../assets/css/Css';
//import Button from '../src/components/Button';

export default function Home({navigation}){
  return(
    <View css={css.container_home}>
        <Text>Olá!</Text>
        <Text>Bem vindo ao Meau!</Text>
        <Text>Aqui você pode adotar e doar</Text>
        <Text>cães com facilidade.</Text>
        <Button title="Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}
