import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Dimensions, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { gradesLimites, villesLimites1, specialitesLimites1 } from './../assets/outils/data.js'
import axios from 'axios';

const Profil = ({ handleLoginDrawer, loggedInUser, token }) => {
  const professeur = loggedInUser;
  const tokenprof = token.token;

  const [nom, setNom] = useState(professeur.professor.nom);
  const [prenom, setPrenom] = useState(professeur.professor.prenom);
  const [tel, setTel] = useState(professeur.professor.tel);
  const [email, setEmail] = useState(professeur.professor.email);
  const [grade, setGrade] = useState(professeur.professor.grade);
  const [specialite, setSpecialite] = useState(professeur.professor.specialite);
  const [faculteActuelle, setFaculteActuelle] = useState(professeur.professor.faculteActuelle);
  const [villeFaculteActuelle, setVilleFaculteActuelle] = useState(professeur.professor.villeFaculteActuelle);
  const villeDesireeString = professeur.professor.villeDesiree;
  const villeDesireeArray = villeDesireeString.split(";");
  const [villeDesiree, setVilleDesiree] = useState(villeDesireeArray);
  const [errorMessages, setErrorMessages] = useState({});
  console.log(villeDesiree)

  const validateFields = () => {
    const errors = {};

    if (!nom) {
      errors.nom = '*Required Field';
    }

    if (!prenom) {
      errors.prenom = '*Required Field';
    }

    if (!tel) {
      errors.tel = '*Required Field';
    }

    if (!grade) {
      errors.grade = '*Required Field';
    }

    if (!faculteActuelle) {
      errors.faculteActuelle = '*Required Field';
    }

    if (!specialite) {
      errors.specialite = '*Required Field';
    }

    if (!villeFaculteActuelle) {
      errors.villeFaculteActuelle = '*Required Field';
    }
    if (villeDesiree.length === 0) {
      errors.villeDesiree = '*Required Field';
    }
    setErrorMessages(errors);

    return Object.keys(errors).length === 0;
  };

  const _renderItem = useCallback((item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.nom}</Text>
      </View>
    );
  }, []);

  
  const handleDelete = async () => {
    try {

      const response = await fetch(`https://troubled-red-garb.cyclic.app/professeurs/${professeur.professor.email}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${tokenprof}`,
        },
      });

      if (response.ok) {
        handleLoginDrawer(null);
        Alert.alert('Successful Deletion', 'Your account has been successfully deleted.', [
          {
            text: 'OK',
          },
        ]);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', 'Une erreur s\'est produite lors de la suppression du professeur.', [
        {
          text: 'OK',
        },
      ]);
    }
  };
  const confirmDelete = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete your account?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: handleDelete, // Appeler la fonction handleDelete pour effectuer la suppression
        },
      ],
      { cancelable: false }
    );
  };
  const handleUpdate = async () => {
    if (validateFields()) {

      try {
        const response = await fetch('https://troubled-red-garb.cyclic.app/professeurs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nom: nom,
            prenom: prenom,
            tel: tel,
            email: email,
            grade: grade,
            specialite: specialite,
            faculteActuelle: faculteActuelle,
            villeFaculteActuelle: villeFaculteActuelle,
            villeDesiree: villeDesiree.join(";"),

          }),
        });

        if (response.ok) {
          const data = await response.json();
          Alert.alert('Successful Update', 'Your profile has been successfully updated.', [
            {
              text: 'OK',
            },
          ]);
        } else {
          const error = await response.json();
          console.error('Failed to add professor:', error.message);
        }
      }
      catch (error) {
        console.error(error);
        Alert.alert('Erreur', 'Une erreur s\'est produite lors de la modification du profil.', [
          {
            text: 'OK',
          },
        ]);
      }
    }
  };


  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>


        <View style={styles.formContainer}>
          <Text style={styles.textelement}>
            <Icon name="user" size={20} color="#333" /> Last Name:
          </Text>
          <TextInput

            placeholder="Enter your first name"
            value={nom}
            onChangeText={setNom}
            style={styles.textinput}
          />
          {errorMessages.nom && <Text style={styles.errorText}>{errorMessages.nom}</Text>}

          <Text style={styles.textelement}>
            <Icon name="user" size={20} color="#333" /> First name:
          </Text>
          <TextInput

            placeholder="Enter your first name "
            value={prenom}
            onChangeText={setPrenom}
            style={styles.textinput}
          />
          {errorMessages.prenom && <Text style={styles.errorText}>{errorMessages.prenom}</Text>}

          <Text style={styles.textelement}>
            <Icon name="phone" size={20} color="#333" /> Phone:
          </Text>
          <TextInput

            placeholder="Enter your phone number"
            value={tel}
            onChangeText={setTel}
            style={styles.textinput}
          />
          {errorMessages.tel && <Text style={styles.errorText}>{errorMessages.tel}</Text>}

          <Text style={styles.textelement}>
            <Icon name="envelope" size={20} color="#333" /> Email:
          </Text>
          <TextInput

            placeholder="Enter your email adresse"
            value={email}
            editable={false}
            style={styles.textinput}
          />

          <Text style={styles.textelement}>
            <Icon name="graduation-cap" size={20} color="#333" /> Grade:
          </Text>
          <Dropdown

            style={styles.textinput}
            containerStyle={styles.shadow}
            data={gradesLimites}
            labelField="nom"
            valueField="nom"
            label="Dropdown"
            placeholder="Choose your grade"
            value={grade}
            onChange={(item) => {
              setGrade(item.nom);
            }}
            renderItem={(item) => _renderItem(item)}
            textError={errorMessages.grade}
          />
          {errorMessages.grade && <Text style={styles.errorText}>{errorMessages.grade}</Text>}
          <Text style={styles.textelement}>
            <Icon name="university" size={20} color="#333" /> University :
          </Text>
          <TextInput

            placeholder="Enter your university"
            value={faculteActuelle}
            onChangeText={setFaculteActuelle}
            style={styles.textinput}
          />
          {errorMessages.faculteActuelle && (
            <Text style={styles.errorText}>{errorMessages.faculteActuelle}</Text>
          )}

          <Text style={styles.textelement}>
            <Icon name="flask" size={20} color="#333" /> Speciality:
          </Text>

          <Dropdown

            style={styles.textinput}
            containerStyle={styles.shadow}
            data={specialitesLimites1}
            search
            searchPlaceholder="Search"
            labelField="nom"
            valueField="nom"
            label="Dropdown"
            placeholder="Choose your speciality"
            value={specialite}
            onChange={(item) => {
              setSpecialite(item.nom);
            }}
            renderItem={(item) => _renderItem(item)}
            textError={errorMessages.specialite}
          />
          {errorMessages.specialite && <Text style={styles.errorText}>{errorMessages.specialite}</Text>}
          <Text style={styles.textelement}>
            <Icon name="map-marker" size={20} color="#333" /> Current City:
          </Text>
          <Dropdown

            style={styles.textinput}
            containerStyle={styles.shadow}
            data={villesLimites1}
            search
            searchPlaceholder="Search"
            labelField="nom"
            valueField="nom"
            label="Dropdown"
            placeholder="Choose your current City"
            value={villeFaculteActuelle}
            onChange={(item) => {
              setVilleFaculteActuelle(item.nom);
            }}
            renderItem={(item) => _renderItem(item)}
            textError={errorMessages.villeFaculteActuelle}
          />
          {errorMessages.villeFaculteActuelle && <Text style={styles.errorText}>{errorMessages.villeFaculteActuelle}</Text>}

          <Text style={styles.textelement}>
            <Icon name="map-marker" size={20} color="#333" /> Desired cities:
          </Text>
          <MultiSelect

            style={styles.textinput}
            containerStyle={styles.shadow}
            data={villesLimites1}
            labelField="nom"
            valueField="nom"
            label="Multi Select"
            placeholder="Choose your desired cities"
            search
            searchPlaceholder="Search"
            value={villeDesiree}
            onChange={(item) => {
              setVilleDesiree(item);
            }}
            textError={errorMessages.villeDesiree}
          />
          {errorMessages.villeDesiree && <Text style={styles.errorText}>{errorMessages.villeDesiree}</Text>}
          <TouchableOpacity style={styles.button} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button2} onPress={confirmDelete}>
          <Text style={styles.buttonText}>Delete my account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profil;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 0,
    paddingBottom: 30,
    width: Dimensions.get('window').width,
  },
  header: {
    marginTop: 30,
    marginBottom: 30,
  },
  formContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 20,
    margin: 20
  },
  textHeader: {
    color: '#000',
    fontSize: 22,
    fontWeight: '500',
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
  button2: {
    alignSelf: 'center',
    backgroundColor: 'red',
    paddingVertical: 6,
    borderRadius: 4,
    alignItems: 'center',
    padding: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  item: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  textItem: {
    fontSize: 16,
    fontWeight: '400',
  },
});
