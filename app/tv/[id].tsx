import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter, useNavigation } from 'expo-router';
import { fetchTVShowDetails } from '@/services/api';

// Define types for TVShow details
interface TVShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
}

export default function TVShowDetailScreen() {
  const { id } = useLocalSearchParams(); // Get TVShow ID from route
  const [TVShow, setTVShow] = useState<TVShow | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const navigation = useNavigation();

//   useEffect(() => {
//     fetchTVShowDetails();
//   }, [id]);

  useEffect(() => {
    const loadTVShowDetails = async () => {
      const data = await fetchTVShowDetails(id);
      setTVShow(data);
      setLoading(false);
    };
    loadTVShowDetails();
  }, [id]);

  useEffect(() => {
    if (TVShow) {
      navigation.setOptions({ title: TVShow.name });
    }
  }, [TVShow, navigation]);


//   const fetchTVShowDetails = async () => {
//     try {
//       const response = await fetch(`http://localhost:6767/api/tv/${id}`); // Call backend API
//       const data = await response.json();
//     //   const data = await fetchTVShowDetails(id);
//       setTVShow(data);
//         //   setTVShow(data);
//     } catch (error) {
//       console.error('Error fetching TVShow details:', error);
//     } finally {
//       setLoading(false);
//     }


//   };


  if (loading) {
    return <ActivityIndicator size="large" color="#E50914" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      {TVShow && (
        <>
         <Text style={styles.title}>{TVShow.name}</Text>

          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${TVShow.poster_path}` }}
            style={styles.poster}
          />
          <Text style={styles.overview}>{TVShow.overview}</Text>

        </>
      )}
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      gap:30,
      backgroundColor: 'white',
      paddingTop: 50,
      padding:40,
      alignItems: 'center',
    },
    loader: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    poster: {
      width: 300,
      height: 300,
    },
    title: {
      color: 'black',
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 10,
      textAlign: 'center',
    },
    overview: {
      color: 'black',
      fontSize: 16,
      marginTop: 10,
      textAlign: 'center',
    },
   
  
  });
  