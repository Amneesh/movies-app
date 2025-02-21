import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { fetchMovies } from "@/services/api";
import DynamicPicker from "@/components/Dropdown";
import Pagination from "@/components/Pagination";
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  popularity: number;
  release_date: string;
}

export default function MovieListScreen() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("now_playing");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const router = useRouter();

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      try {
        const results = await fetchMovies(selectedCategory, page);
        setMovies(results.results);
        setTotalPages(results.total_pages); // ✅ Update total pages
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [selectedCategory, page]); // ✅ Trigger when `page` changes

  const renderItem = ({ item }: { item: Movie }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.image}
      />
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>
          Popularity: {item.popularity.toFixed(2)}
        </Text>
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
      <View style={styles.filter}>
        <DynamicPicker
          selectedValue={selectedCategory}
          onValueChange={(value) => {
            setSelectedCategory(value);
            setPage(1); // ✅ Reset page when category changes
          }}
          options={[
            { label: "Now Playing", value: "now_playing" },
            { label: "Popular", value: "popular" },
            { label: "Top Rated", value: "top_rated" },
            { label: "Upcoming", value: "upcoming" },
          ]}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#E50914" style={styles.loader} />
      ) : (
        <>
          <FlatList
            data={movies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />

          {/* Pagination Controls */}
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
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
    width: 90,
    height: 90,
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
    backgroundColor: "#509bb5",
    paddingVertical: 5,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  filter: {
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 60,
    paddingRight: 60,
  },
 
});
