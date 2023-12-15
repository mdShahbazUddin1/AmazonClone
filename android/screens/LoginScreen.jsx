import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        <Text style={styles.logInText}>Login In to your account</Text>
      </View>
      <KeyboardAvoidingView style={{ marginTop: 70 }}>
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 12,
          }}
        >
          <View>
            <Text>Keep me logged in</Text>
          </View>
          <View>
            <Text style={styles.forget}>Forgot Password</Text>
          </View>
        </View>
        <View style={{ marginTop: 70 }} />
        <Pressable
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
            Login
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate("Register")}
          style={{ marginTop: 15 }}
        >
          <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
            Dont have an account ? Signup
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

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
