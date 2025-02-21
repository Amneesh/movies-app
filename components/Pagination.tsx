import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages < 1) return null; // Don't show pagination if no pages exist

  return (
    <View style={styles.pagination}>
      
      
      <TouchableOpacity
        onPress={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        style={[styles.pageButton, currentPage === 1 && styles.disabledButton]}
      >
        <Text style={styles.pageText}>{"<"}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onPageChange(1)}
        style={[styles.pageButton, currentPage === 1 && styles.activePage]}
      >
        <Text style={[styles.pageText, currentPage === 1 && styles.activeText]}>
          1
        </Text>
      </TouchableOpacity>

      {currentPage > 3 && <Text style={styles.pageText}>...</Text>}

      {[currentPage - 1, currentPage, currentPage + 1].map(
        (pageNumber) =>
          pageNumber > 1 &&
          pageNumber < totalPages && (
            <TouchableOpacity
              key={pageNumber}
              onPress={() => onPageChange(pageNumber)}
              style={[
                styles.pageButton,
                currentPage === pageNumber && styles.activePage,
              ]}
            >
              <Text
                style={[
                  styles.pageText,
                  currentPage === pageNumber && styles.activeText,
                ]}
              >
                {pageNumber}
              </Text>
            </TouchableOpacity>
          )
      )}


      {currentPage < totalPages - 2 && <Text style={styles.pageText}>...</Text>}

      <TouchableOpacity
        onPress={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage >= totalPages}
        style={[
          styles.pageButton,
          currentPage >= totalPages && styles.disabledButton,
        ]}
      >
        <Text style={styles.pageText}>{">"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems:"center",
    marginBottom: 20,
    padding:10
  },
  pageButton: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: "50%",
  },
  activePage: {
    backgroundColor: "#509bb5",
  },
  disabledButton: {
    backgroundColor: "#bbb",
  },
  pageText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  activeText: {
    color: "white",
  },

});

export default Pagination;
