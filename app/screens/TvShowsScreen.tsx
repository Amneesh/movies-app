import React, { useState, useEffect } from "react";
import { 
  View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet 
} from "react-native";
import { useRouter } from "expo-router";
import RNPickerSelect from "react-native-picker-select";

import { fetchTVShows } from "@/services/api";


// TV Show categories
const TV_CATEGORIES = [
  { label: "Airing Today", value: "airing_today" },
  { label: "On The Air", value: "on_the_air" },
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
];

export default function TVShowsScreen() {
  const [tvCategory, setTVCategory] = useState<string>("popular"); // Default category
  const [tvShows, setTVShows] = useState<TVShow[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const loadTVShows = async () => {
      setLoading(true);
      try {
        const results = await fetchTVShows(tvCategory);
        setTVShows(results.results);
      } catch (error) {
        console.error("Error fetching TV shows:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTVShows();
  }, [tvCategory]);


//   useEffect(() => {
//     fetchTVShowsFunc(tvCategory);
//   }, [tvCategory]);

//   const fetchTVShowsFunc = async (category: string) => {
//     setLoading(true);


//     try {
//         const response = await fetchTVShows(tvCategory)
//         // console.log('Tv shoes', response);
//         setTVShows(response.results); // Adjust based on the structure of your response
//       } catch (error) {
//         console.error('Error fetching movies:', error);
//       } finally {
//         setLoading(false);
//       }
//   };

  interface TVShow {
    id: number;
    name: string;
    poster_path: string | null;
    popularity: number;
    first_air_date: string;
  }

  // Function to render each TV show item
  const renderItem = ({ item }: { item: TVShow }) => (
    <View style={styles.card}>
      <Image 
        source={{ uri: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : 'https://via.placeholder.com/200x300' }} 
        style={styles.image} 
      />
      <View style={styles.details}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.text}>Popularity: {item.popularity.toFixed(2)}</Text>
        <Text style={styles.text}>First Air Date: {item.first_air_date}</Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push(`/tv/${item.id}`)}
        >
          <Text style={styles.buttonText}>More Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>


      <View style={styles.pickerContainer}>
      <View style={styles.selectStyle}>

        <RNPickerSelect
          onValueChange={(value) => setTVCategory(value)}
          items={TV_CATEGORIES}
          value={tvCategory}
          style={pickerSelectStyles}
          placeholder={{ label: "Select Category...", value: null }}
        />
        </View>
      </View>

      {/* Loader */}
      {loading ? (
        <ActivityIndicator size="large" color="#E50914" style={styles.loader} />
      ) : (
        <FlatList
          data={tvShows}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
 
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
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
    fontWeight: "bold",
  },
  text: {
    fontSize: 14,
    color: "#666",
  },
  button: {
    marginTop: 5,
    backgroundColor: "#29B6F6",
    paddingVertical: 5,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  pickerContainer: {        
    marginBottom: 10,
   display:'flex',
   flexDirection:'row',
   justifyContent:'center',
   alignItems:'center',
   
    width:"100%",
},
selectStyle:{
    backgroundColor:"#f0f0f0",
    borderRadius: 5,
    width:"50%",
    },
});

// Styles for picker select
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
    paddingVertical: 8,
    paddingHorizontal: 10,
    color: "black",
  },
});

