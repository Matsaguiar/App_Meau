import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import LoginScreen from './views/LoginScreen';
import ForgotPassword from './views/ForgotPassword';
import AnimalRegister from './views/AnimalRegister';
import ListAnimals from './views/ListAnimals';
import AdoptionList from './views/AdoptionList';
import AnimalPage from './views/AnimalPage';
import ImageUpload from './views/ImageUpload';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
     <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Home" options={{headerShown:false}} component={ImageUpload} /> */}
        <Stack.Screen name="Home" options={{headerShown:false}} component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="AnimalRegister" component={AnimalRegister} />
        <Stack.Screen name="ListAnimals" component={ListAnimals} />
        <Stack.Screen name="AdoptionList" component={AdoptionList} />
        <Stack.Screen name="AnimalPage" component={AnimalPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
