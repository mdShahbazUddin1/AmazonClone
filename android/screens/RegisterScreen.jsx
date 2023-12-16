import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import axios from "axios";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleRegister = async () => {
    // Validate input fields
    if (!name || !email || !password) {
      console.error("Please fill in all fields");
      return;
    }

    const user = {
      name: name,
      email: email,
      password: password,
    };
    axios
      .post("http://192.168.1.33:8080/user/register", user)
      .then((res) => {
        Alert.alert(
          "Registration Success",
          "Verification Link Sent To Your Email ! Please Check Inbox Or Span To Verify "
        );
        setName("");
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        Alert.alert("Registrations Error", "An Error Occur");
        console.log("Registration failed", err);
      });
  };

  return (
    <SafeAreaView style={styles.safeAreaBox}>
      <View>
        <Image
          style={styles.logoImage}
          width={150}
          height={100}
          source={{
            uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png",
          }}
        />
      </View>
      <View style={styles.loginBox}>
        <Text style={styles.logInText}>Register to your account</Text>
      </View>
      <KeyboardAvoidingView style={{ marginTop: 40 }}>
        <View>
          <View style={styles.inputBox}>
            <Feather
              style={styles.emailIcon}
              name="user"
              size={24}
              color="black"
            />
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              style={styles.input}
              placeholder="Enter Name"
            />
          </View>
        </View>
        <View>
          <View style={styles.inputBox}>
            <Entypo
              style={styles.emailIcon}
              name="mail"
              size={24}
              color="gray"
            />
            <TextInput
              value={email}
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
              placeholder="Enter Email"
            />
          </View>
        </View>
        <View>
          <View style={styles.inputBox}>
            <Entypo
              style={styles.passIcon}
              name="lock"
              size={24}
              color="gray"
            />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={styles.input}
              placeholder="Enter Password"
            />
          </View>
        </View>

        <View style={{ marginTop: 70 }} />
        <Pressable
          onPress={handleRegister}
          style={{
            width: 200,
            backgroundColor: "#FFCA28",
            marginLeft: "auto",
            marginRight: "auto",
            padding: 15,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Register
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("Login")}
          style={{ marginTop: 15 }}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
            Already have an account ? Login
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  safeAreaBox: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  logoImage: {
    width: 150,
    height: 100,
  },
  loginBox: {
    alignItems: "center",
  },
  logInText: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 12,
    color: "#041E42",
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEEEEE",
    gap: 5,
    paddingVertical: 2,
    marginTop: 25,
    borderRadius: 5,
  },
  input: {
    width: 250,
    color: "gray",
    marginVertical: 6,
    marginLeft: 5,
    paddingVertical: 5,
    fontSize: 17,
  },
  emailIcon: {
    marginLeft: 10,
  },
  passIcon: {
    marginLeft: 10,
  },
  forget: {
    color: "#007FFF",
  },
});
