import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBox from "../components/SearchBox";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo } from "@expo/vector-icons";

const AddAdressScreen = () => {
  const navigation = useNavigation();
  const [address, setAddress] = useState([]);

  useEffect(() => {
    const getAllAddress = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch(`http://192.168.1.5:8080/user/getAdress`, {
          method: "GET", // Use "GET" instead of "Get"
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch addresses");
        }

        const data = await response.json();
        setAddress(data);
      } catch (error) {
        console.error("Error fetching addresses:", error.message);
      }
    };
    getAllAddress();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <SearchBox />
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Your Addresses
          </Text>
          <Pressable
            onPress={() => navigation.navigate("Add")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              borderColor: "#D0D0D0",
              borderWidth: 1,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              marginTop: 10,
              paddingVertical: 10,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Add a new address</Text>
            <Feather name="arrow-right" size={18} color="black" />
          </Pressable>

          <Pressable>
            {address?.map((item) => (
              <Pressable
                key={item._id}
                style={{
                  flexDirection: "column",
                  gap: 3,
                  marginVertical: 10,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: "#D0D0D0",
                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
                >
                  <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                    {item.name}
                  </Text>
                  <Entypo name="location-pin" size={24} color="red" />
                </View>

                <Text>
                  #{item.houseNo} {item.landmark}
                </Text>
                <Text>{item.street}</Text>
                <Text>{item.country},banglore</Text>
                <Text>mobile no : {item.mobileNo}</Text>
                <Text>pincode : {item.postalcode}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    marginTop: 10,
                  }}
                >
                  <Pressable
                    style={{
                      borderWidth: 1,
                      borderColor: "#D0D0D0",
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderRadius: 5,
                    }}
                  >
                    <Text>Edit</Text>
                  </Pressable>
                  <Pressable
                    style={{
                      borderWidth: 1,
                      borderColor: "#D0D0D0",
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderRadius: 5,
                    }}
                  >
                    <Text>Remove</Text>
                  </Pressable>
                  <Pressable
                    style={{
                      borderWidth: 1,
                      borderColor: "#D0D0D0",
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderRadius: 5,
                    }}
                  >
                    <Text>Set as default</Text>
                  </Pressable>
                </View>
              </Pressable>
            ))}
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddAdressScreen;

const styles = StyleSheet.create({});
