import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import SearchBox from "../components/SearchBox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const AddScreen = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [house, setHouse] = useState("");
  const [area, setArea] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const navigation = useNavigation();

  const addAddress = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const newAddress = {
        name: name,
        mobileNo: mobile,
        houseNo: house,
        street: area,
        landmark: landmark,
        city: city,
        country: "India",
        postalcode: pincode,
      };

      const response = await fetch(`http://192.168.1.5:8080/user/addAdress`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(newAddress),
      });
      if (response.ok) {
        Alert.alert("New Address Save", "Success");
        setTimeout(() => {
          navigation.goBack();
        }, 500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView>
      <SearchBox />
      <View style={{ padding: 10, marginBottom: 10 }}>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          Add a new address
        </Text>
        <TextInput
          placeholderTextColor={"black"}
          placeholder="India"
          style={{
            padding: 10,
            borderWidth: 1,
            borderColor: "#D0D0D0",
            marginTop: 10,
            borderRadius: 5,
          }}
        />
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Fullname</Text>
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            placeholderTextColor={"black"}
            placeholder="Enter Name"
            style={{
              padding: 10,
              borderWidth: 1,
              borderColor: "#D0D0D0",
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Mobile No</Text>
          <TextInput
            value={mobile}
            onChangeText={(text) => setMobile(text)}
            placeholderTextColor={"black"}
            placeholder="Enter Mobile No"
            style={{
              padding: 10,
              borderWidth: 1,
              borderColor: "#D0D0D0",
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Flat, House No, Building, Company
          </Text>
          <TextInput
            value={house}
            onChangeText={(text) => setHouse(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderWidth: 1,
              borderColor: "#D0D0D0",
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Area, Street, Sector, Village
          </Text>
          <TextInput
            value={area}
            onChangeText={(text) => setArea(text)}
            placeholderTextColor={"black"}
            style={{
              padding: 10,
              borderWidth: 1,
              borderColor: "#D0D0D0",
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Landmark</Text>
          <TextInput
            value={landmark}
            onChangeText={(text) => setLandmark(text)}
            placeholderTextColor={"black"}
            placeholder="Ex: near appolo hospital"
            style={{
              padding: 10,
              borderWidth: 1,
              borderColor: "#D0D0D0",
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>City</Text>
          <TextInput
            value={city}
            onChangeText={(text) => setCity(text)}
            placeholderTextColor={"black"}
            placeholder="Enter City"
            style={{
              padding: 10,
              borderWidth: 1,
              borderColor: "#D0D0D0",
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Pincode</Text>
          <TextInput
            value={pincode}
            onChangeText={(text) => setPincode(text)}
            placeholderTextColor={"black"}
            placeholder="Enter pincode"
            style={{
              padding: 10,
              borderWidth: 1,
              borderColor: "#D0D0D0",
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>
        <Pressable
          onPress={addAddress}
          style={{
            backgroundColor: "orange",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 5,
            marginTop: 5,
            padding: 19,
          }}
        >
          <Text>Add Address</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddScreen;

const styles = StyleSheet.create({});
