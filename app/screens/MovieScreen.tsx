    import React, { useEffect, useState } from "react";
    import { 
    View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet 
    } from "react-native";
    import { useRouter } from "expo-router";
    import RNPickerSelect from "react-native-picker-select";

    import { fetchMovies } from "@/services/api";
    // Define types for a movie item
    interface Movie {
    id: number;
    title: string;
    poster_path: string;
    popularity: number;
    release_date: string;
    }


    // Movie categories
    const MOVIE_CATEGORIES = [
    { label: "Now Playing", value: "now_playing" },
    { label: "Popular", value: "popular" },
    { label: "Top Rated", value: "top_rated" },
    { label: "Upcoming", value: "upcoming" },
    ];

    export default function MovieListScreen() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedCategory, setSelectedCategory] = useState<string>("now_playing");
    const router = useRouter();


    useEffect(() => {
        const loadMovies = async () => {
          setLoading(true);
          try {
            const results = await fetchMovies(selectedCategory);
            setMovies(results.results);
          } catch (error) {
            console.error("Error fetching TV shows:", error);
          } finally {
            setLoading(false);
          }
        };
    
        loadMovies();
      }, [selectedCategory]);


    // useEffect(() => {
    //     fetchMovies(selectedCategory);
    // }, [selectedCategory]); // Re-fetch movies when category changes

    // const fetchMovies = async (category: string) => {
    //     setLoading(true);
   
    //     try {
    //         const response = await axios.get(`${API_URL}/${selectedCategory}`);
    //         setMovies(response.data.results); // Adjust based on the structure of your response
    //       } catch (error) {
    //         console.error('Error fetching movies:', error);
    //       } finally {
    //         setLoading(false);
    //       }
    // };

    // Render each movie item
    const renderItem = ({ item }: { item: Movie }) => (
        <View style={styles.card}>
        <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.image} />
        <View style={styles.details}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.text}>Popularity: {item.popularity.toFixed(2)}</Text>
            <Text style={styles.text}>Release Date: {item.release_date}</Text>
            <TouchableOpacity style={styles.button} onPress={() => router.push(`/movie/${item.id}`)}>
            <Text style={styles.buttonText}>More Details</Text>
            </TouchableOpacity>
        </View>
        </View>
    );

    return (
        <View style={styles.container}>

        {/* Dropdown for selecting category */}
        <View style={styles.pickerContainer}>
        <View style={styles.selectStyle}>

            <RNPickerSelect
            onValueChange={(value) => setSelectedCategory(value)}
            items={MOVIE_CATEGORIES}
            value={selectedCategory}
            style={pickerSelectStyles}
            placeholder={{ label: "Select Category...", value: null }}
            />
            </View>
        </View>

        {loading ? (
            <ActivityIndicator size="large" color="#E50914" style={styles.loader} />
        ) : (
            <FlatList
            data={movies}
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

