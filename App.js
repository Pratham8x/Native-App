
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://api1.he.nic.in/aishemasterservice/api/country');
        const data = await response.json();
        console.log("API Response:", data); // print response on the console

        // Map response fields
        const countryNames = data.map(country => ({
          label: country.name || "Unknown Country",
          value: country.countryCode || "unknown",
        }));

        console.log("Formatted Country List:", countryNames);
        setCountries(countryNames);
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}> HELLO WORLD  </Text>
      {countries.length > 0 ? (
        <RNPickerSelect
          onValueChange={(value) => setSelectedCountry(value)}
          items={countries}
          placeholder={{
            label: 'Select a country...',
            value: null,
          }}
          style={pickerSelectStyles}
        />
      ) : (
        <Text>Loading countries...</Text>
      )}
      {selectedCountry && (
        <Text style={styles.selectedCountry}>
          Selected Country: {selectedCountry}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'aqua',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  selectedCountry: {
    marginTop: 20,
    fontSize: 18,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth:2,
    borderColor: 'black',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
  },
});

export default App;
