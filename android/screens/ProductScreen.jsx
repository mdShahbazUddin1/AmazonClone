import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import SearchBox from "../components/SearchBox";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "../redux/CartRedux";

const ProductScreen = () => {
  const route = useRoute();
  const { width } = Dimensions.get("window");
  const height = (width * 100) / 100;
  const [addCart, setAddCart] = useState(false);
  const dispatch = useDispatch();

  const addItemToCart = (item) => {
    setAddCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddCart(false);
    }, 6000);
  };
  const cart = useSelector((state) => state.cart.cart);

  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? 0 : 0,
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <ScrollView>
        <SearchBox />

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {route.params.carouselImages.map((item, index) => (
            <ImageBackground
              style={{ width, height }}
              key={index}
              source={{ uri: item }}
              resizeMode="contain"
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: 20,
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: "#E0E0E0",
                    borderRadius: 20,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AntDesign name="hearto" size={24} color="black" />
                </View>
                <View>
                  <MaterialCommunityIcons
                    name="share-variant"
                    size={24}
                    color="black"
                  />
                </View>
              </View>
            </ImageBackground>
          ))}
        </ScrollView>
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            {route?.params?.title}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#757575",
              fontWeight: "bold",
              marginTop: 6,
            }}
          >
            Rs {route?.params?.price}
          </Text>
        </View>
        <Text style={{ borderWidth: 1, borderColor: "#E0E0E0", height: 1 }} />
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
        >
          <Text>Color : </Text>
          <Text style={{ fontWeight: "bold" }}>{route?.params?.color}</Text>
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
        >
          <Text>Size : </Text>
          <Text style={{ fontWeight: "bold" }}>{route?.params?.size}</Text>
        </View>
        <Text style={{ borderWidth: 1, borderColor: "#E0E0E0", height: 1 }} />
        <View style={{ padding: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 16, marginVertical: 6 }}>
            Total : {route?.params?.price}
          </Text>
          <Text style={{ color: "#26C6DA" }}>
            Free Delivery Tomorrow by 3 PM. Order within 10 hrs 30 min
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
            backgroundColor: "#AFEEEE",
          }}
        >
          <Ionicons
            style={{ color: "#212121", fontSize: 18 }}
            name="location"
            size={24}
            color="black"
          />
          <Pressable>
            <Text style={{ fontSize: 13, fontWeight: "500", marginLeft: 3 }}>
              Deliver To Shahbaz - Banglore 560021
            </Text>
          </Pressable>
        </View>

        <Pressable
          onPress={() => addItemToCart(route?.params?.item)}
          style={{
            backgroundColor: "#FFB74D",
            marginHorizontal: 10,
            marginVertical: 10,
            padding: 10,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {addCart ? (
            <Text style={{ fontWeight: "bold" }}>Added to cart</Text>
          ) : (
            <Text style={{ fontWeight: "bold" }}>Add to cart</Text>
          )}
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#FFB74D",
            marginHorizontal: 10,
            marginVertical: 10,
            padding: 10,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Buy Now</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({});
