import { StyleSheet, View, Pressable, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import React from "react";

const SearchBox = () => {
  return (
    <View style={style.searchBox}>
      <Pressable style={style.searchInputBox}>
        <Feather
          style={style.searchIcon}
          name="search"
          size={24}
          color="black"
        />
        <TextInput style={style.searchInput} placeholder="Search Products" />
      </Pressable>
      <Feather style={style.searchIcon} name="mic" size={24} color="black" />
    </View>
  );
};

export default SearchBox;

const style = StyleSheet.create({
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#29B6F6",
    padding: 10,
  },
  searchInputBox: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    height: 35,
    gap: 10,
    borderRadius: 3,
    marginHorizontal: 7,
    backgroundColor: "white",
  },
  searchIcon: {
    fontSize: 20,
    marginLeft: 10,
    color: "#444",
  },
  searchInput: {
    color: "#444",
    fontSize: 16,
  },
});
