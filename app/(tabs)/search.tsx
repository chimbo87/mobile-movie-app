import { StyleSheet, Text, View, Image, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { images } from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import { icons } from "@/constants/icons";
import  SearchBar  from "@/components/SearchBar"

const search = () => {
  const router = useRouter();
  const {
    data: movies,
    loading: moviesLoading,
    error: movieError,
  } = useFetch(() => fetchMovies({ query: "" }));
  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />

      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>
            <View className="my-5">
              <SearchBar placeholder="Search movies..."/>
            </View>
            {moviesLoading && (
              <ActivityIndicator size="large" color="#0000ff" className="my-3"/>
            )}
            {movieError && (
              <Text className="text-red-500 px-5 my-3">
                Error: {movieError.message}

              </Text>
            )}
          </>
        }
      />
    </View>
  );
};

export default search;

const styles = StyleSheet.create({});
