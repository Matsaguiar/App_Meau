import React from 'react';
import { NavigationContainer, DrawerNavigationState } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import LoginScreen from './views/LoginScreen';
import ForgotPassword from './views/ForgotPassword';
import AnimalRegister from './views/AnimalRegister';
import ListMyAnimals from './views/ListMyAnimals';
import AdoptionList from './views/AdoptionList';
import AnimalPage from './views/AnimalPage';
import Notification from './views/Notification';
import UserData from './views/UserData';
import {LogBox} from 'react-native';

LogBox.ignoreAllLogs(true);

export default function App() {

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
        <Stack.Screen name="Login" component={Login}
          options={{
            title: 'Login',
            headerStyle: {
              backgroundColor: '#cfe9e5'
            },
            headerTintColor: '#434343',
            headerShown: true
          }}
        />
        <Stack.Screen name="Register" component={Register}
          options={{
            title: 'Cadastro Pessoal',
            headerStyle: {
              backgroundColor: '#cfe9e5'
            },
            headerTintColor: '#434343',
            headerShown: true
          }}
        />
        <Stack.Screen name="LoginScreen" component={LoginScreen}
          options={{
            title: 'Home',
            headerStyle: {
              backgroundColor: '#cfe9e5'
            },
            headerTintColor: '#434343',
            headerShown: true
          }}
        />
        <Stack.Screen name="UserData" component={UserData}
          options={{
            title: 'Dados do usuário',
            headerStyle: {
              backgroundColor: '#cfe9e5'
            },
            headerTintColor: '#434343',
            headerShown: true
          }}
        />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword}
          options={{
            title: 'Esqueceu sua senha?',
            headerStyle: {
              backgroundColor: '#cfe9e5'
            },
            headerTintColor: '#434343',
            headerShown: true
          }}
        />
        <Stack.Screen name="AnimalRegister" component={AnimalRegister}
          options={{
            title: 'Cadastro do Animal',
            headerStyle: {
              backgroundColor: '#ffd358'
            },
            headerTintColor: '#434343',
            headerShown: true
          }}
        />
        <Stack.Screen name="ListMyAnimals" component={ListMyAnimals}
          options={{
            title: 'Meus Animais',
            headerStyle: {
              backgroundColor: '#ffd358'
            },
            headerTintColor: '#434343',
            headerShown: true
          }}
        />
        <Stack.Screen name="AdoptionList" component={AdoptionList}
          options={{
            title: 'Lista de adoção',
            headerStyle: {
              backgroundColor: '#ffd358'
            },
            headerTintColor: '#434343',
            headerShown: true
          }}
        />
        <Stack.Screen name="AnimalPage" component={AnimalPage}
          options={{
            title: 'Detalhes do animal',
            headerStyle: {
              backgroundColor: '#ffd358'
            },
            headerTintColor: '#434343',
            headerShown: true
          }}
        />
        <Stack.Screen name="Notification" component={Notification}
          options={{
            title: 'Notificações',
            headerStyle: {
              backgroundColor: '#cfe9e5'
            },
            headerTintColor: '#434343',
            headerShown: true
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
