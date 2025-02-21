import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { Search } from "lucide-react-native";
import { searchMedia } from "@/services/api";
import DynamicPicker from "@/components/Dropdown";
import Pagination from "@/components/Pagination";

interface Media {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  popularity: number;
  release_date: string;
}

export default function MovieListScreen() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchType, setSearchType] = useState<string>("movie");
  const [results, setResults] = useState<Media[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchSearchResults = async () => {
    if (!searchQuery.trim()) {
      setError("Movie/TV show name is required");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await searchMedia(searchQuery, searchType, page);
      setResults(data.results || []);
      console.log(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setError("Failed to fetch results");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery.trim()) {
      fetchSearchResults();
    }
  }, [page]);

  const handlePress = (item: Media) => {
    const isMovie = !!item.title;
    const type = isMovie ? "movie" : "tv";
    router.push(`/${type}/${item.id}`);
  };

  const renderItem = ({ item }: { item: Media }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.image}
      />
      <View style={styles.details}>
        <Text style={styles.title}>{item.title || item.name}</Text>
        <Text style={styles.text}>
          Popularity: {item.popularity.toFixed(2)}
        </Text>
        <Text style={styles.text}>Release Date: {item.release_date}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handlePress(item)}
        >
          <Text style={styles.buttonText}>More Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Search Movies & TV Shows</Text>
      <View style={styles.customInput}>
        <Search size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="i.e. James Bond, CSI"
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.pickerContainer}>
        <View>
          <DynamicPicker
            selectedValue={searchType}
            onValueChange={(value) => {
              setSearchType(value);
              setPage(1);
            }}
            options={[
              { label: "Movie", value: "movie" },
              { label: "TV Show", value: "tv" },
              { label: "Multi (All)", value: "multi" },
            ]}
          />
        </View>

        <TouchableOpacity
          style={styles.searchButton}
          onPress={fetchSearchResults}
        >
          <Search size={20} color="white" />
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
      {loading && (
        <ActivityIndicator size="large" color="#E50914" style={styles.loader} />
      )}
      {results.length === 0 ? (
        <Text style={styles.noResultsText}>Please initiate a search</Text>
      ) : (
        <>
          <FlatList
            data={results}
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
    fontSize: 13,
    marginBottom: 5,
    textAlign: "left",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "black",
  },
  searchButton: {
    width: "30%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    alignItems: "center",
    backgroundColor: "#006f9c",
    padding: 10,
    borderRadius: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  customInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: "100%",
    alignSelf: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
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
  pickerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },

  noResultsText: {
    paddingTop: 100,
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    color: "#666",
    marginTop: 20,
  },
});
