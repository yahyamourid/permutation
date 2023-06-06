import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Dimensions, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

const LoginScreen = ({ handleLoginDrawer, setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('https://tiny-worm-nightgown.cyclic.app/login', {
        email,
        password,
      });

      const { message, token } = response.data;
      if (message === 'Authentication successful') {
        const professorsResponse = await axios.get('https://tiny-worm-nightgown.cyclic.app/professeurs');
        const professorsData = professorsResponse.data;
        const professor = professorsData.find((prof) => prof.email === email);
        if (professor) {
          handleLoginDrawer({ professor });
          setToken({ token });
        } else {
          throw new Error('Professor not found');
        }
      } else {
        throw new Error('Authentication failed');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'An error occurred';
      Alert.alert('Error', 'Incorrect email address or password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>Authentification</Text>
      <Text style={styles.textelement}>
        <Icon name="envelope" size={20} color="#333" /> Email:
      </Text>
      <TextInput
        placeholder="enter your email"
        value={email}
        onChangeText={(text) => setEmail(text.trim())}
        style={styles.textinput}
      />

      <Text style={styles.textelement}>
        <Icon name="lock" size={20} color="#333" /> Password:
      </Text>
      <TextInput
        placeholder="enter your password"
        value={password}
        onChangeText={setPassword}
        style={styles.textinput}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 20,
    width: Dimensions.get('window').width - 40,
    marginTop: 50,
  },
  textHeader: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 20,
  },
  textelement: {
    color: '#000',
    fontSize: 17,
    fontWeight: '400',
    marginBottom: 10,
  },
  textinput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 20,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#3498db',
    paddingVertical: 6,
    borderRadius: 4,
    alignItems: 'center',
    width: 100,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
});
