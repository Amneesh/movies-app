import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { fetchMovieDetails } from '@/services/api';


interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams(); // Get movie ID from route
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  useEffect(() => {
    const loadMovieDetails = async () => {
      const data = await fetchMovieDetails(id);
      setMovie(data);
      setLoading(false);
    };
    loadMovieDetails();
  }, [id]);



  useEffect(() => {
    if (movie) {
      navigation.setOptions({ title: movie.title });
    }
  }, [movie, navigation]);



  if (loading) {
    return <ActivityIndicator size="large" color="#E50914" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      {movie && (
        <>
          <Text style={styles.title}>{movie.title}</Text>

          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
            style={styles.poster}
          />

          <Text style={styles.overview}>{movie.overview}</Text>

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
