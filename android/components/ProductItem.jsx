import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartRedux";

const ProductItem = ({ item }) => {
  const [addCart, setAddCart] = useState(false);
  const dispatch = useDispatch();

  const addItemToCart = (item) => {
    setAddCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddCart(false);
    }, 6000);
  };
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
        onPress={() => addItemToCart(item)}
        style={{
          marginTop: 10,
          padding: 10,
          backgroundColor: "#FFB74D",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 20,
          marginHorizontal: 10,
        }}
      >
        {addCart ? (
          <Text style={{ fontWeight: "bold" }}>Added To Cart</Text>
        ) : (
          <Text style={{ fontWeight: "bold" }}>Add To Cart</Text>
        )}
      </Pressable>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({});
