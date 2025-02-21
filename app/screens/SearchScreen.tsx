import React, { useState } from 'react';
import { 
  View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet, TextInput 
} from 'react-native';
import { useRouter } from 'expo-router';
import RNPickerSelect from 'react-native-picker-select';
import Dropdown from '@/components/Dropdown';

import { searchMedia } from '@/services/api';
interface Media {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  popularity: number;
  release_date: string;
}



export default function MovieListScreen() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchType, setSearchType] = useState<'movie' | 'multi' | 'tv'>('movie');
  const [results, setResults] = useState<Media[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();


const fetchSearchResults = async () => {
    if (!searchQuery.trim()) {
      setError('Movie/TV show name is required');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await searchMedia(searchQuery, searchType);
      setResults(data.results || []);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setError('Failed to fetch results');
    } finally {
      setLoading(false);
    }
  };
  

  const renderItem = ({ item }: { item: Media }) => (
    <View style={styles.card}>
      <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.title || item.name}</Text>
        <Text style={styles.text}>Popularity: {item.popularity.toFixed(2)}</Text>
        <Text style={styles.text}>Release Date: {item.release_date}</Text>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => router.push(`/movie/${item.id}`)}
        >
          <Text style={styles.buttonText}>More Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Search Movies & TV Shows</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Movie/TV Show Name*"
        placeholderTextColor="#888"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={styles.pickerContainer}>

      <View style={styles.selectStyle}>

  <RNPickerSelect
    value={searchType} 
    onValueChange={(value) => setSearchType(value)}
    items={[
      { label: 'Movie', value: 'movie' },
      { label: 'TV Show', value: 'tv' },
      { label: 'Multi (All)', value: 'multi' },
    ]}
    useNativeAndroidPickerStyle={false} // Ensures custom styles are applied on Android
    style={pickerSelectStyles}
  />
  </View>


<TouchableOpacity style={styles.searchButton} onPress={fetchSearchResults}>
        <Text style={styles.buttonText}>Search</Text>
</TouchableOpacity>

</View>

      {error && <Text style={styles.errorText}>{error}</Text>}
      {loading && <ActivityIndicator size="large" color="#E50914" style={styles.loader} />}

      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  header: {
    fontSize: 13,
    marginBottom: 5,
    textAlign: 'left',
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  searchButton: {
    width:"30%",
    backgroundColor: '#E50914',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',

  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 5,
  },
  details: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    color: '#666',
  },
  button: {
  
    marginTop: 5,
    backgroundColor: '#29B6F6',
    paddingVertical: 5,
    alignItems: 'center',
    borderRadius: 5,
  },
  pickerContainer: {
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    



    width:"100%",

  },
  selectStyle:{
backgroundColor:"#f0f0f0",
borderRadius: 5,

},

});


const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        flex:1,
      fontSize: 16,
marginLeft:60,
marginRight:60,
marginTop:20,
marginBottom:20,
      color: 'black',
      backgroundColor: '#f0f0f0',
    },
    inputAndroid: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      color: 'black',
      backgroundColor: '#f0f0f0',
      marginBottom: 10,
    },
  });
  

