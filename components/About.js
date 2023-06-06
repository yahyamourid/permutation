import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const About = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>University Teachers Permutation Platform</Text>
      <Text style={styles.text}>
        This platform is simply a space for university professors to search for a partner for a teacher exchange. It is limited to this functionality. Teachers can search for partners interested in an exchange in other higher education institutions. The system facilitates the search and correspondence between teachers who have a mutual desire to exchange.

        The platform provides a user-friendly and secure interface for teachers to communicate and exchange necessary information. Members can create personal profiles and provide information about their specialties, institutions, and contact details. Teachers can view the profiles of potential partners and get in touch with them to discuss the details of the exchange agreement.

        By using this platform, teachers can streamline their search for exchange partners, saving time and effort by avoiding individual communications and continuous searches for exchange opportunities. This system is efficient and useful for teachers who want to change institutions or work in a new institution to broaden their academic experience.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignSelf: 'center',
  },
  textHeader: {
    alignSelf: 'center',
    marginTop: 40,
    fontSize: 17,
    color: '#000', 
    width: '100%',
    fontWeight:700,
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
    textAlign: 'justify',
  }

});

export default About;