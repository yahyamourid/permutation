import React from 'react';
import { Alert } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';

const Logout = ({ handleLoginDrawer }) => {
  const navigation = useNavigation();

  const handleLogout = () => {
    // Handle the logout action
    Alert.alert(
      'Confirmation',
      'Do you really want to logout ?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {
           
            navigation.navigate('Statistics');
          },
        },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => {
            handleLoginDrawer(null);
            
          },
        },
      ],
      { cancelable: false }
    );
    
  };

 if (useIsFocused()){
  handleLogout();
 }

  return null; // Si vous ne souhaitez pas afficher de contenu dans ce composant
};

export default Logout;
