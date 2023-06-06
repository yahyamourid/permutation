import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Welcome() {
  const navigation = useNavigation();

  const handleStartPress = () => {
    navigation.navigate('Drawer');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.message}>Welcome to Teachers Permutation Platform</Text>
      <Image source={require('../assets/prof.png')} style={styles.image} />
      
      <TouchableOpacity style={styles.button} onPress={handleStartPress}>
  
  <Text style={styles.buttonText}>Start</Text>
</TouchableOpacity>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  message: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'#006690',
  },
  button: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 25,
    width: 150,
    height: 40,
    backgroundColor: '#006690',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',

  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }

});
