import React from 'react';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
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
import UserChats from './views/UserChats';
import Chat from './views/Chat';
import UserData from './views/UserData';
import {LogBox} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import 'react-native-gesture-handler';
import {CustomDrawer} from './components';

LogBox.ignoreAllLogs(true);

export default function App() {

  //const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>
      <Drawer.Navigator 
        useLegacyImplementation 
        initialRouteName='Home'
        drawerContent={(props) => <CustomDrawer {...props} />}
      >
        <Drawer.Screen name="Home" 
          options={{ headerShown: false, hidden: true }} 
          component={Home} 
        />
        <Drawer.Screen name="Login" component={Login}
          options={{
            title: 'Login',
            headerStyle: {
              backgroundColor: '#cfe9e5'
            },
            headerTintColor: '#434343',
            headerShown: false,
            hidden: true
          }}
        />
        <Drawer.Screen name="Register" component={Register}
          options={{
            title: 'Cadastro Pessoal',
            headerStyle: {
              backgroundColor: '#cfe9e5'
            },
            headerTintColor: '#434343',
            headerShown: false,
            hidden: true
          }}
        />
        <Drawer.Screen name="LoginScreen" component={LoginScreen}
          options={{
            title: 'Home',
            headerStyle: {
              backgroundColor: '#cfe9e5'
            },
            headerTintColor: '#434343',
            headerShown: true, 
            hidden: true,
          }}
        />
        <Drawer.Screen name="UserData" component={UserData}
          options={{
            title: 'Dados do usuário',
            headerStyle: {
              backgroundColor: '#cfe9e5'
            },
            headerTintColor: '#434343',
            headerShown: true
          }}
        />
        <Drawer.Screen name="ForgotPassword" component={ForgotPassword}
          options={{
            title: 'Esqueceu sua senha?',
            headerStyle: {
              backgroundColor: '#cfe9e5'
            },
            headerTintColor: '#434343',
            headerShown: false,
            hidden: true
          }}
        />
        <Drawer.Screen name="AnimalRegister" component={AnimalRegister}
          options={{
            title: 'Cadastro do Animal',
            headerStyle: {
              backgroundColor: '#ffd358'
            },
            headerTintColor: '#434343',
            headerShown: true
          }}
        />
        <Drawer.Screen name="ListMyAnimals" component={ListMyAnimals}
          options={{
            title: 'Meus Animais',
            headerStyle: {
              backgroundColor: '#ffd358'
            },
            headerTintColor: '#434343',
            headerShown: true
          }}
        />
        <Drawer.Screen name="AdoptionList" component={AdoptionList}
          options={{
            title: 'Lista de adoção',
            headerStyle: {
              backgroundColor: '#ffd358'
            },
            headerTintColor: '#434343',
            headerShown: true
          }}
        />
        <Drawer.Screen name="AnimalPage" component={AnimalPage}
          options={{
            title: 'Detalhes do animal',
            headerStyle: {
              backgroundColor: '#ffd358'
            },
            headerTintColor: '#434343',
            headerShown: true,
            hidden: true
          }}
        />
        <Drawer.Screen name="Notification" component={Notification}
          options={{
            title: 'Notificações',
            headerStyle: {
              backgroundColor: '#cfe9e5'
            },
            headerTintColor: '#434343',
            headerShown: true
          }}
        />

        <Drawer.Screen name="UserChats" component={UserChats}
          options={{
            title: 'Suas Conversas',
            headerStyle: {
              backgroundColor: '#cfe9e5'
            },
            headerTintColor: '#434343',
            headerShown: true
          }}
        />

        <Drawer.Screen name="Chat" component={Chat}
          options={{
            title: 'Conversa',
            headerStyle: {
              backgroundColor: '#cfe9e5'
            },
            headerTintColor: '#434343',
            headerShown: true
          }}
        />

      </Drawer.Navigator>
    </NavigationContainer>
  );
}
