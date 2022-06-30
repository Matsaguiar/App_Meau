import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet } from 'react-native';
//import { css } from './assets/css/Css';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Button from './src/components/Button';
import Home from './views/Home';
import Login from './views/Home';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
     <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
