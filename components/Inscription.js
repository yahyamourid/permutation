import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Dimensions, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import { gradesLimites, villesLimites1, specialitesLimites1 } from './../assets/outils/data.js'

const Inscription = () => {

    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [tel, setTel] = useState('');
    const [email, setEmail] = useState('');
    const [grade, setGrade] = useState('');
    const [specialite, setSpecialite] = useState('');
    const [faculteActuelle, setFaculteActuelle] = useState('');
    const [villeFaculteActuelle, setVilleFaculteActuelle] = useState('');
    const [villeDesiree, setVilleDesiree] = useState([]);
    const [password, setPassword] = useState('');
    const [errorMessages, setErrorMessages] = useState({});



    const validateEmail = (email) => {
        const emailString = email.toString();
        return emailString.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };



    const validateFields = () => {
        const errors = {};

        if (!nom) {
            errors.nom = '*Le champ Nom est obligatoire.';
        }

        if (!prenom) {
            errors.prenom = '*Le champ Prénom est obligatoire.';
        }

        if (!tel) {
            errors.tel = '*Le champ Téléphone est obligatoire.';
        }

        if (!email) {
            errors.email = '*Le champ Email est obligatoire.';
        } else if (!validateEmail(email)) {
            errors.email = '*Veuillez entrer une adresse e-mail valide.';
        }
        if (!password) {
            errors.password = '*Le champ Mot de Passe est obligatoire.';
        }
        if (!grade) {
            errors.grade = '*Le champ Grade est obligatoire.';
        }

        if (!faculteActuelle) {
            errors.faculteActuelle = '*Le champ Établissement est obligatoire.';
        }

        if (!specialite) {
            errors.specialite = '*Le champ Spécialité est obligatoire.';
        }

        if (!villeFaculteActuelle) {
            errors.villeFaculteActuelle = '*Le champ Ville actuelle est obligatoire.';
        }
        if (villeDesiree.length === 0) {
            errors.villeDesiree = '*Le champ Ville  désirées est obligatoire.';
        }
        setErrorMessages(errors);

        return Object.keys(errors).length === 0;
    };



    const addProfessor = async () => {
        try {
            const response = await fetch('https://tiny-worm-nightgown.cyclic.app/professeurs', {
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
                    password: password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Professor added successfully:', data);
            } else {
                const error = await response.json();
                console.error('Failed to add professor:', error.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const _renderItem = useCallback((item) => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.nom}</Text>
            </View>
        );
    }, []);

    const handleSearchClique = () => {
        if (validateFields()) {
            addProfessor();
            Alert.alert('Inscription réussie', 'Vous êtes inscrit avec succès.', [
                {
                    text: 'OK',
                    onPress: () => {
                        setNom('');
                        setPrenom('');
                        setTel('');
                        setEmail('');
                        setGrade('');
                        setSpecialite('');
                        setFaculteActuelle('');
                        setVilleFaculteActuelle('');
                        setVilleDesiree([]);
                        setPassword('');
                    },
                },
            ]);
            console.log(nom, prenom, tel, email, password, grade, faculteActuelle, specialite, villeFaculteActuelle, villeDesiree);
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
            onChangeText={setEmail}
            style={styles.textinput}
          />
<Text style={styles.textelement}>
                        <Icon name="lock" size={20} color="#333" /> Password:
                    </Text>
                    <TextInput

                        placeholder="Enter your password"
                        value={password}
                        onChangeText={setPassword}
                        style={styles.textinput}
                        secureTextEntry
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
                    <TouchableOpacity style={styles.button} onPress={handleSearchClique}>
                        <Text style={styles.buttonText}>Envoyer</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default Inscription;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
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
        padding: 15,
        
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
        alignSelf:'center',
        backgroundColor: '#3498db',
        paddingVertical: 6,
        borderRadius: 4,
        alignItems: 'center',
        width:100,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
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
