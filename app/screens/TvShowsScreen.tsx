import React, { useState, useEffect } from "react";
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
import { fetchTVShows } from "@/services/api";
import DynamicPicker from "@/components/Dropdown";
import Pagination from "@/components/Pagination";

interface TVShow {
  id: number;
  name: string;
  poster_path: string | null;
  popularity: number;
  first_air_date: string;
}

export default function TVShowsScreen() {
  const [tvCategory, setTVCategory] = useState<string>("popular");
  const [tvShows, setTVShows] = useState<TVShow[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const router = useRouter();

  useEffect(() => {
    const loadTVShows = async () => {
      setLoading(true);
      try {
        const results = await fetchTVShows(tvCategory, page);
        setTVShows(results.results);
        setTotalPages(results.total_pages);
      } catch (error) {
        console.error("Error fetching TV shows:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTVShows();
  }, [tvCategory, page]);

  const renderItem = ({ item }: { item: TVShow }) => (
    <View style={styles.card}>
      <Image
        source={{
          uri: item.poster_path
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
            : "https://via.placeholder.com/200x300",
        }}
        style={styles.image}
      />
      <View style={styles.details}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.text}>
          Popularity: {item.popularity.toFixed(2)}
        </Text>
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
      <View style={styles.filter}>
        <DynamicPicker
          selectedValue={tvCategory}
          onValueChange={(value) => {
            setTVCategory(value);
            setPage(1);
          }}
          options={[
            { label: "Airing Today", value: "airing_today" },
            { label: "On The Air", value: "on_the_air" },
            { label: "Popular", value: "popular" },
            { label: "Top Rated", value: "top_rated" },
          ]}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#E50914" style={styles.loader} />
      ) : (
        <>
          <FlatList
            data={tvShows}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
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
