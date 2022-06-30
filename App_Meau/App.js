import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Button from './src/components/Button';

export default function App() {
  const signIn = () => {
    alert('Login ok');
  }

  return (
    <View style={styles.container}>
      <Text>Olá!</Text>
      <Text>Bem vindo ao Meau!</Text>
      <Text>Aqui você pode adotar e doar</Text>
      <Text>cães com facilidade.</Text>
      <Text></Text>
      <Button labelButton="Login" onpress={signIn} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
