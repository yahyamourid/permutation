import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-element-dropdown';
import { specialitesLimites } from './../assets/outils/data.js';
import axios from 'axios';

const Combinaison = () => {
  const [specialite, setSpecialite] = useState("Chimie");
  const [professeurs, setProfesseurs] = useState([]);
  const [relations, setRelations] = useState([]);
  const [permutations, setPermutations] = useState([]);
  const [showRelations, setShowRelations] = useState(false);
  const [showPermutations, setShowPermutations] = useState(false);

  useEffect(() => {
    const fetchProfesseurs = async () => {
      try {
        const response = await axios.get('https://troubled-red-garb.cyclic.app/professeurs');
        const filteredProfesseurs = response.data.filter(professeur => professeur.specialite === specialite);
        setProfesseurs(filteredProfesseurs);
        generateRelations(filteredProfesseurs);
      } catch (error) {
        console.error('Erreur lors de la récupération des professeurs:', error);
      }
    };

    fetchProfesseurs();
  }, [specialite]);

  const generateRelations = useCallback((professeurs) => {
    const villeActuelleProfesseurs = professeurs.map(professeur => professeur.villeFaculteActuelle);
    const generatedRelations = [];
    const generatedPermutations = [];

    professeurs.forEach((professeur) => {
      const villesDesirees = professeur.villeDesiree.split(';');

      villesDesirees.forEach(villeDesiree => {
        if (villeActuelleProfesseurs.includes(villeDesiree)) {
          const otherProfesseurs = professeurs.filter(p => p.villeFaculteActuelle === villeDesiree && p !== professeur);
          otherProfesseurs.forEach(otherProfesseur => {
            const relation = `${professeur.nom} (${professeur.villeFaculteActuelle}) -> ${otherProfesseur.nom} (${villeDesiree})`;
            generatedRelations.push(relation);

            const permutation = `${otherProfesseur.nom} (${villeDesiree}) -> ${professeur.nom} (${professeur.villeFaculteActuelle})`;
            if (generatedRelations.includes(permutation)) {
              generatedPermutations.push(permutation);
            }
          });
        }
      });
    });

    setRelations(generatedRelations);
    setPermutations(generatedPermutations);
  }, []);

  const toggleRelations = () => {
    setShowRelations(!showRelations);
  };

  const togglePermutations = () => {
    setShowPermutations(!showPermutations);
  };

  const _renderItem = useCallback((item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.nom}</Text>
      </View>
    );
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <Text style={styles.textelement}>
            <Icon name="flask" size={20} color="#333" /> Speciality:
          </Text>
          <Dropdown
            style={styles.textinput}
            containerStyle={styles.shadow}
            data={specialitesLimites}
            search
            searchPlaceholder="Search"
            labelField="nom"
            valueField="nom"
            label="Dropdown"
            placeholder="Choose specialite"
            value={specialite}
            onChange={(item) => {
              setSpecialite(item.nom);
            }}
            renderItem={(item) => _renderItem(item)}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>
            <Icon name="random" size={20} color="#333" /> Possible permutations: 
          </Text>
          <Text style={styles.relationCount}>{permutations.length}</Text>
        </View>

        {(permutations.length > 0) && (
          <View style={styles.relationContainer}>
            {permutations.map((permutation, index) => (
              <Text key={index} style={styles.relationItem}>{permutation}</Text>
            ))}
          </View>
        )}

        <TouchableOpacity onPress={toggleRelations} style={styles.sectionHeader}>
        {showRelations &&(
          <>
          <Text style={styles.sectionHeaderText}>
          
            <Icon name="code-fork" size={20} color="#333" /> All links: 
          </Text>
          <Text style={styles.relationCount}>{relations.length}</Text>
          </>
        )}
         {!showRelations &&(
          <>
          <Text style={styles.sectionHeaderText}>
          
            <Icon name="plus" size={20} color="#333" /> see link
          </Text>
          <Text style={styles.relationCount}>{relations.length}</Text>
          </>
        )}
        </TouchableOpacity>

        {showRelations && (
          <View style={styles.relationContainer}>
            {relations.map((relation, index) => (
              <Text key={index} style={styles.relationItem}>{relation}</Text>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Combinaison;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding:20,
    width: Dimensions.get('window').width ,
  },
  listContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    backgroundColor: 'white',
    marginBottom:30,
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingLeft:20,
    paddingRight:20
  },
  sectionHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  relationContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    backgroundColor: 'white',
  },
  relationItem: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 10,
  },
  relationCount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#006690', // ou toute autre couleur souhaitée
  },
});
