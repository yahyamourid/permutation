import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';

import Accueil from './Accueil';
import Inscription from './Inscription';
import LoginScreen from './LoginScreen';
import Rechercher from './Rechercher';
import Profil from './Profil';
import Logout from './Logout'
import About from './About';
import Combinaison from './Combinaison';

const DrawerNav = createDrawerNavigator();

export default function Drawer() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigation = useNavigation();
  const [token, setToken] = useState(null);
  console.log(token);

  useEffect(() => {
    if (loggedInUser) {
      // Rediriger vers l'écran Accueil
      navigation.navigate('Statistics');
    }
  }, [loggedInUser]);

  const handleLoginDrawer = (userData) => {
    setLoggedInUser(userData);
  };



  return (
    <>
      <DrawerNav.Navigator>
        {!loggedInUser ? (
          <>
            <DrawerNav.Screen
              name="Statistics"
              component={Accueil}
              options={{
                drawerIcon: ({ color, size }) => (
                  <Ionicons name="home" size={size} color="#00638C" />
                ),
              }}
            />

            <DrawerNav.Screen
              name="Registration"
              component={Inscription}
              options={{
                drawerIcon: ({ color, size }) => (
                  <Ionicons name="person-add" size={size} color="#00638C" />
                ),
              }}
            />
            <DrawerNav.Screen
              name="About"
              component={About}
              options={{
                drawerIcon: ({ color, size }) => (
                  <Ionicons name="information" size={size} color="#00638C" />
                ),
              }}
            />

            <DrawerNav.Screen
              name="Login"
              component={() => <LoginScreen handleLoginDrawer={handleLoginDrawer} setToken={setToken} />}
              options={{
                drawerIcon: ({ color, size }) => (
                  <Ionicons name="log-in" size={size} color="#00638C" />
                ),
              }}
            />
          </>
        ) : (
          <>
            <DrawerNav.Screen
              name="Statistics"
              component={Accueil}
              options={{
                drawerIcon: ({ color, size }) => (
                  <Ionicons name="home" size={size} color="#00638C" />
                ),
              }}
            />

            <DrawerNav.Screen
              name="Profil"
              component={() => <Profil handleLoginDrawer={handleLoginDrawer} loggedInUser={loggedInUser} token={token} />}
              options={{
                drawerIcon: ({ color, size }) => (
                  <Ionicons name="person" size={size} color="#00638C" />
                ),
              }}
            />
            <DrawerNav.Screen
              name="Search"
              component={Rechercher}
              initialParams={{ loggedInUser }}
              options={{
                drawerIcon: ({ color, size }) => (
                  <Ionicons name="search" size={size} color="#00638C" />
                ),
              }}
            />
            <DrawerNav.Screen
              name="Permutation"
              component={Combinaison}
              options={{
                drawerIcon: ({ color, size }) => (
                   <Icon name="code-fork" size={28} color="#00638C" style={styles.icon} />
                ),
              }}
            />
             <DrawerNav.Screen
              name="About"
              component={About}
              options={{
                drawerIcon: ({ color, size }) => (
                  <Ionicons name="information" size={size} color="#00638C" />
                ),
              }}
            />




            <DrawerNav.Screen
              name="Logout"
              component={() => <Logout handleLoginDrawer={handleLoginDrawer} />}
              options={{
                drawerIcon: ({ color, size }) => (
                  <Ionicons name="log-out" size={size} color="#FE2D2D" />
                ),
              }}
            />
          </>
        )}
      </DrawerNav.Navigator>
    </>
  );
}
const styles = StyleSheet.create({
  icon:{
    marginLeft:6,
  }
});