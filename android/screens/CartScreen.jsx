import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBox from "../components/SearchBox";
import { useDispatch, useSelector } from "react-redux";

import { AntDesign } from "@expo/vector-icons";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../redux/CartRedux";

const CartScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
  const dispatch = useDispatch();
  const increment = (item) => {
    dispatch(incrementQuantity(item));
  };
  const decrement = (item) => {
    dispatch(decrementQuantity(item));
  };
  const deleteItem = (item) => {
    dispatch(removeFromCart(item));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <SearchBox />
        <View
          style={{ padding: 10, flexDirection: "row", alignItems: "center" }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Subtotal : </Text>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Rs {total}</Text>
        </View>
        <Text style={{ marginHorizontal: 10 }}>EMI details available</Text>
        <Pressable
          style={{
            backgroundColor: "#FFB74D",
            padding: 10,
            marginHorizontal: 10,
            marginTop: 10,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 5,
          }}
        >
          <Text>Proceed to buy {cart.length} item</Text>
        </Pressable>
        <Text
          style={{
            height: 1,
            borderWidth: 1,
            borderColor: "#D0D0D0",
            marginTop: 10,
          }}
        />
        <View>
          {cart?.map((item) => (
            <View
              key={item._id}
              style={{
                backgroundColor: "white",
                borderBottomWidth: 1,
                borderRightWidth: 0,
                borderBottomColor: "#D0D0D0",
                marginVertical: 10,
              }}
            >
              <Pressable
                style={{
                  marginVertical: 10,
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <View>
                  <Image
                    style={{ width: 150, height: 150, resizeMode: "contain" }}
                    source={{ uri: item?.image }}
                  />
                </View>
                <View>
                  <Text numberOfLines={2} style={{ width: 150, marginTop: 10 }}>
                    {item.title}
                  </Text>
                  <Text
                    style={{ marginTop: 5, fontSize: 16, fontWeight: "bold" }}
                  >
                    Rs {item.price}
                  </Text>
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      resizeMode: "contain",
                      marginTop: 6,
                    }}
                    source={{
                      uri: "https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png",
                    }}
                  />
                  <Text style={{ color: "green", marginTop: 6 }}>In Stock</Text>
                </View>
              </Pressable>
              <Pressable
                style={{
                  marginTop: 15,
                  marginBottom: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",

                    alignItems: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 7,
                  }}
                >
                  {item?.quantity > 1 ? (
                    <Pressable
                      onPress={() => decrement(item)}
                      style={{
                        padding: 7,
                      }}
                    >
                      <AntDesign name="minuscircleo" size={22} color="black" />
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={() => deleteItem(item)}
                      style={{
                        padding: 7,
                      }}
                    >
                      <AntDesign name="delete" size={22} color="black" />
                    </Pressable>
                  )}

                  <Pressable
                    style={{
                      backgroundColor: "white",
                      paddingHorizontal: 8,
                      paddingVertical: 6,
                    }}
                  >
                    <Text style={{ fontSize: 15 }}>{item.quantity}</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => increment(item)}
                    style={{
                      padding: 7,
                      borderTopLeftRadius: 6,
                      borderBottomLeftRadius: 6,
                    }}
                  >
                    <AntDesign name="pluscircleo" size={22} color="black" />
                  </Pressable>
                </View>
                <Pressable
                  onPress={() => deleteItem(item)}
                  style={{
                    backgroundColor: "white",
                    paddingHorizontal: 8,
                    paddingVertical: 10,
                    borderRadius: 5,
                    borderColor: "#C0C0C0",
                    borderWidth: 0.6,
                  }}
                >
                  <Text>DELETE</Text>
                </Pressable>
                <Pressable>
                  <Pressable
                    style={{
                      backgroundColor: "white",
                      paddingHorizontal: 8,
                      paddingVertical: 10,
                      borderRadius: 5,
                      borderColor: "#C0C0C0",
                      borderWidth: 0.6,
                    }}
                  >
                    <Text>Save For Later</Text>
                  </Pressable>
                </Pressable>
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
