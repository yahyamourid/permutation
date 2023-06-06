
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from './components/Welcome';
import Drawer from './components/Drawer';
import Rechercher from './components/Rechercher';
import LoginScreen from './components/LoginScreen';
import Combinaison from './components/Combinaison';
import Logout from './components/Logout';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Drawer" component={Drawer}   options={{ headerShown: false }} />
       

      </Stack.Navigator>
    </NavigationContainer>
   
  );
}

