import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function Home(props){
    return(
        <View style={style.container}>
            <Text>Olá!</Text>
            <Text>Bem vindo ao Meau!</Text>
            <Text>Aqui você pode adotar e doar</Text>
            <Text>cães com facilidade.</Text>
            <Text></Text>
            <Button labelButton="Login" onpress={()=>props.navigation.navigate('Login')} />
        </View>
    )
}

const style = StyleSheet.create({
    container: {
      flex: 5,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});