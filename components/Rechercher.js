import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-element-dropdown';
import { villesLimites, specialitesLimites } from './../assets/outils/data.js'
import axios from 'axios';

const Rechercher = () => {
  const [specialite, setSpecialite] = useState("All specialities");
  const [villeFaculteActuelle, setVilleFaculteActuelle] = useState("All cities");
  const [villeDesiree, setVilleDesiree] = useState("All cities");
  const [professeurs, setProfesseurs] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfesseurs = async () => {
      try {
        const response = await axios.get('https://troubled-red-garb.cyclic.app/professeurs');
        setProfesseurs(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des professeurs:', error);
      }
    };

    fetchProfesseurs();
  }, []);


  const filtrerProfesseurs = useCallback(() => {
    return professeurs.filter((professeur) => {
      const matchSpecialite = specialite === "All specialities" || professeur.specialite === specialite;
      const matchVilleFaculteActuelle = villeFaculteActuelle === "All cities" || professeur.villeFaculteActuelle === villeFaculteActuelle;
      const matchVilleDesiree = villeDesiree === "All cities" || professeur.villeDesiree.includes(villeDesiree);

      return matchSpecialite && matchVilleFaculteActuelle && matchVilleDesiree;
    });
  }, [specialite, villeFaculteActuelle, villeDesiree, professeurs]);

  const filteredProfesseurs = useMemo(() => filtrerProfesseurs(), [filtrerProfesseurs]);


  const renderDropdownItem = useCallback((item) => {
    return (
      <View style={styles.dropdownItem}>
        <Text style={styles.dropdownItemText}>{item.nom}</Text>
      </View>
    );
  }, []);

  const renderProfesseurItem = ({ item }) => (
    <View style={styles.professeurContainer}>

      <Text style={styles.professeurNom}>{`${item.nom} ${item.prenom}`}</Text>
      <Text style={styles.professeurDetails}>{item.grade}   |   {item.specialite}</Text>
      <Text style={styles.professeurDetails}>{`${item.email}  |  ${item.tel}`}</Text>
      <Text style={styles.professeurDetails}>{`(${item.faculteActuelle} | ${item.villeFaculteActuelle}) --> ${item.villeDesiree}`}</Text>


    </View>
  );

  return (
    <>
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <Text style={styles.textElement}>
            <Icon name="flask" size={20} color="#333" /> Speciality:
          </Text>
          <Dropdown
            style={styles.dropdown}
            containerStyle={styles.dropdownContainer}
            data={specialitesLimites}
            search
            searchPlaceholder="Rechercher"
            labelField="nom"
            valueField="nom"
            placeholder="Choisissez une spécialité"
            value={specialite}
            onChange={(item) => setSpecialite(item.nom)}
            renderItem={renderDropdownItem}
          />
          <Text style={styles.textElement}>
            <Icon name="map-marker" size={20} color="#333" /> Current City:
          </Text>
          <Dropdown
            style={styles.dropdown}
            containerStyle={styles.dropdownContainer}
            data={villesLimites}
            search
            searchPlaceholder="Rechercher"
            labelField="nom"
            valueField="nom"
            placeholder="Choisissez une ville"
            value={villeFaculteActuelle}
            onChange={(item) => setVilleFaculteActuelle(item.nom)}
            renderItem={renderDropdownItem}
          />
          <Text style={styles.textElement}>
            <Icon name="map-marker" size={20} color="#333" /> Desired city:
          </Text>
          <Dropdown
            style={styles.dropdown}
            containerStyle={styles.dropdownContainer}
            data={villesLimites}
            search
            searchPlaceholder="Rechercher"
            labelField="nom"
            valueField="nom"
            placeholder="Choisissez une ville"
            value={villeDesiree}
            onChange={(item) => setVilleDesiree(item.nom)}
            renderItem={renderDropdownItem}
          />
        </View>
        {loading ? (
          <ActivityIndicator style={styles.loadingIndicator} size="large" color="#0000ff" />
        ) : (
          <>

            {filteredProfesseurs.length > 0 ? (
              <>
                <Text style={styles.resultsText}>Search Results : {filteredProfesseurs.length}</Text>
                <FlatList
                  data={filteredProfesseurs}
                  keyExtractor={(item) => item._id}
                  renderItem={renderProfesseurItem}
                />
              </>
            ) : (
              <Text style={styles.noResultsText}>No result found.</Text>
            )}
          </>
        )}
      </View>
    </>
  );
};

export default Rechercher;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  listContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    backgroundColor: 'white',
  },

  textElement: {
    color: '#333',
    fontSize: 18,
    marginBottom: 10,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingVertical: 1,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  dropdownContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  dropdownItem: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  dropdownItemText: {
    fontSize: 16,
    fontWeight: '400',
  },
  loadingIndicator: {
    marginTop: 20,
  },
  resultsText: {
    fontWeight: 500,
    fontSize: 18,
    textAlign: 'center',
    color:'#006690',
    marginTop: 10,
    marginBottom:10,
  },
  noResultsText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color:'#E61515',
  },
  professeurContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#F9F9F9',
    padding: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  
  professeurNom: {
    borderRadius: 4,
    backgroundColor: '#006690',
    width:'auto',
    fontWeight: 700,
    fontSize: 17,
    marginBottom: 3,
    color:'white',
    padding:5
  },
  professeurDetails: {
    color: '#666',
    marginBottom: 3,
  },

});
