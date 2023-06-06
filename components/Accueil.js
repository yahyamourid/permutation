import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Dimensions, ActivityIndicator, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { useIsFocused } from '@react-navigation/native';
import { BarIndicator, WaveIndicator} from 'react-native-indicators';

const Accueil = () => {
  const [professeurs, setProfesseurs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();
  
  useEffect(() => {
    const fetchProfesseurs = () => {
      fetch('https://troubled-red-garb.cyclic.app/professeurs')
        .then(response => response.json())
        .then(data => {
          setProfesseurs(data);
          setIsLoading(false); // Marquer le chargement comme terminé
        })
        .catch(error => console.error(error));
    };

    fetchProfesseurs();
  }, [isFocused]);

  const countProfesseursParSpecialite = () => {
    const counts = {};
    professeurs.forEach(professeur => {
      const { specialite } = professeur;
      if (counts[specialite]) {
        counts[specialite]++;
      } else {
        counts[specialite] = 1;
      }
    });
    return counts;
  };

  const countVillesDesirees = () => {
    const counts = {};
    professeurs.forEach(professeur => {
      const { villeDesiree } = professeur;
      const villes = villeDesiree.split(';');
      villes.forEach(ville => {
        if (counts[ville]) {
          counts[ville]++;
        } else {
          counts[ville] = 1;
        }
      });
    });
    return counts;
  };

  const countProfesseursParGrade = () => {
    const counts = {};
    professeurs.forEach(professeur => {
      const { grade } = professeur;
      if (counts[grade]) {
        counts[grade]++;
      } else {
        counts[grade] = 1;
      }
    });
    return counts;
  };

  const specialitesSorted = Object.entries(countProfesseursParSpecialite())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([specialite, count]) => ({ specialite, count }));

  const villesDesireesSorted = Object.entries(countVillesDesirees())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([ville, count]) => ({ ville, count }));

  const professeursParGrade = Object.entries(countProfesseursParGrade())
    .sort((a, b) => b[1] - a[1])
    .map(([grade, count]) => ({ grade, count }));

  const chartColors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff', '#800080', '#008000', '#800000', '#808000', '#008080', '#000080', '#ff6347', '#00ced1', '#ff8c00'];

  const dataSpecialites = specialitesSorted.map(({ specialite, count }, index) => ({
    key: `specialite_${index}`,
    value: count,
    svg: { fill: chartColors[index % chartColors.length] },
    arc: { outerRadius: Dimensions.get('window').width / 2.5 - 10 },
    title: specialite,
  }));

  const dataVillesDesirees = villesDesireesSorted.map(({ ville, count }, index) => ({
    key: `ville_${index}`,
    value: count,
    svg: { fill: chartColors[index % chartColors.length] },
    arc: { outerRadius: Dimensions.get('window').width / 2.5 - 10 },
    title: ville,
  }));

  const dataProfesseursParGrade = professeursParGrade.map(({ grade, count }, index) => ({
    key: `grade_${index}`,
    value: count,
    svg: { fill: chartColors[index % chartColors.length] },
    arc: { outerRadius: Dimensions.get('window').width / 2.5 - 10 },
    title: grade,
  }));

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <BarIndicator color="#006690" />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>Number of professor </Text>
          <Text style={styles.number}>{professeurs.length}</Text>
        </View>
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>Number of professors by specialty</Text>
          <PieChart
            style={styles.chart}
            data={dataSpecialites}
            innerRadius={50}
            outerRadius={60}
          />
          {specialitesSorted.map(({ specialite, count }, index) => (
            <View key={specialite} style={styles.statRow}>
              <View style={styles.statLabelContainer}>
                <View
                  style={[
                    styles.statColorDot,
                    { backgroundColor: chartColors[index % chartColors.length] },
                  ]}
                />
                <Text style={styles.statLabel}>{specialite}</Text>
              </View>
              <Text style={styles.statCount}>{count}</Text>
            </View>
          ))}
        </View>
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>Number of teachers per desired city </Text>
          <PieChart
            style={styles.chart}
            data={dataVillesDesirees}
            innerRadius={50}
            outerRadius={60}
          />
          {villesDesireesSorted.map(({ ville, count }, index) => (
            <View key={ville} style={styles.statRow}>
              <View style={styles.statLabelContainer}>
                <View
                  style={[
                    styles.statColorDot,
                    { backgroundColor: chartColors[index % chartColors.length] },
                  ]}
                />
                <Text style={styles.statLabel}>{ville}</Text>
              </View>
              <Text style={styles.statCount}>{count}</Text>
            </View>
          ))}
        </View>
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>Number of professors by grade </Text>
          <PieChart
            style={styles.chart}
            data={dataProfesseursParGrade}
            innerRadius={50}
            outerRadius={60}
          />
          {professeursParGrade.map(({ grade, count }, index) => (
            <View key={grade} style={styles.statRow}>
              <View style={styles.statLabelContainer}>
                <View
                  style={[
                    styles.statColorDot,
                    { backgroundColor: chartColors[index % chartColors.length] },
                  ]}
                />
                <Text style={styles.statLabel}>{grade}</Text>
              </View>
              <Text style={styles.statCount}>{count}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 30,
    alignSelf: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  statsContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#fff',
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 10,
    marginTop: 20,
  },

  statsText: {
    alignSelf: 'center',
    fontSize: 17,
    fontWeight: 'bold',
  },
  number: {
    color:'#F10E0A',
    alignSelf: 'center',
    fontSize: 26,
    fontWeight: 800,
  },
  sectionHeader: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  chart: {
    height: 300,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 3,
    paddingLeft:10,
    paddingRight:10,
  },
  statLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
  },
  statColorDot: {
    width: 15,
    height: 15,
    borderRadius: 9,
    marginRight: 8,
  },
  statCount: {
    fontSize: 14,
  },
});

export default Accueil;
