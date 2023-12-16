import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const ProductItem = ({ item }) => {
  return (
    <Pressable
      style={{
        marginHorizontal: 1,
        marginVertical: 5,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 10,
      }}
    >
      <Image
        width={150}
        height={150}
        resizeMode="contain"
        source={{ uri: item?.image }}
      />
      <Text numberOfLines={1} style={{ width: 150, marginTop: 10 }}>
        {item?.title}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 5,
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          $ {item?.price}
        </Text>
        <Text style={{ color: "orange", fontWeight: "bold" }}>
          {item?.rating?.rate} ratings
        </Text>
      </View>
      <Pressable
        style={{
          marginTop: 10,
          padding: 10,
          backgroundColor: "orange",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 20,
          marginHorizontal: 10,
        }}
      >
        <Text style={{ fontWeight: "bold" }}>Add To Cart</Text>
      </Pressable>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({});
