import React, { useEffect, useState, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  ScrollView,
  Pressable,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { MaterialIcons } from "@expo/vector-icons";
import { SliderBox } from "react-native-image-slider-box";
import ProductItem from "../components/ProductItem";
import { useNavigation } from "@react-navigation/native";
import SearchBox from "../components/SearchBox";
import { useSelector } from "react-redux";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const list = [
  {
    id: "0",
    image: "https://m.media-amazon.com/images/I/41EcYoIZhIL._AC_SY400_.jpg",
    name: "Home",
  },
  {
    id: "1",
    image:
      "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/blockbuster.jpg",
    name: "Deals",
  },
  {
    id: "3",
    image:
      "https://images-eu.ssl-images-amazon.com/images/I/31dXEvtxidL._AC_SX368_.jpg",
    name: "Electronics",
  },
  {
    id: "4",
    image:
      "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/All_Icons_Template_1_icons_01.jpg",
    name: "Mobiles",
  },
  {
    id: "5",
    image:
      "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/music.jpg",
    name: "Music",
  },
  {
    id: "6",
    image: "https://m.media-amazon.com/images/I/51dZ19miAbL._AC_SY350_.jpg",
    name: "Fashion",
  },
];
const images = [
  "https://img.etimg.com/thumb/msid-93051525,width-1070,height-580,imgsize-2243475,overlay-economictimes/photo.jpg",
  "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Wireless/devjyoti/PD23/Launches/Updated_ingress1242x550_3.gif",
  "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Books/BB/JULY/1242x550_Header-BB-Jul23.jpg",
];
const deals = [
  {
    id: "20",
    title: "OnePlus Nord CE 3 Lite 5G (Pastel Lime, 8GB RAM, 128GB Storage)",
    oldPrice: 25000,
    price: 19000,
    image:
      "https://images-eu.ssl-images-amazon.com/images/G/31/wireless_products/ssserene/weblab_wf/xcm_banners_2022_in_bau_wireless_dec_580x800_once3l_v2_580x800_in-en.jpg",
    carouselImages: [
      "https://m.media-amazon.com/images/I/61QRgOgBx0L._SX679_.jpg",
      "https://m.media-amazon.com/images/I/61uaJPLIdML._SX679_.jpg",
      "https://m.media-amazon.com/images/I/510YZx4v3wL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/61J6s1tkwpL._SX679_.jpg",
    ],
    color: "Stellar Green",
    size: "6 GB RAM 128GB Storage",
  },
  {
    id: "30",
    title:
      "Samsung Galaxy S20 FE 5G (Cloud Navy, 8GB RAM, 128GB Storage) with No Cost EMI & Additional Exchange Offers",
    oldPrice: 74000,
    price: 26000,
    image:
      "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/SamsungBAU/S20FE/GW/June23/BAU-27thJune/xcm_banners_2022_in_bau_wireless_dec_s20fe-rv51_580x800_in-en.jpg",
    carouselImages: [
      "https://m.media-amazon.com/images/I/81vDZyJQ-4L._SY879_.jpg",
      "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/71yzyH-ohgL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/61vN1isnThL._SX679_.jpg",
    ],
    color: "Cloud Navy",
    size: "8 GB RAM 128GB Storage",
  },
  {
    id: "40",
    title:
      "Samsung Galaxy M14 5G (ICY Silver, 4GB, 128GB Storage) | 50MP Triple Cam | 6000 mAh Battery | 5nm Octa-Core Processor | Android 13 | Without Charger",
    oldPrice: 16000,
    price: 14000,
    image:
      "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Wireless/Samsung/CatPage/Tiles/June/xcm_banners_m14_5g_rv1_580x800_in-en.jpg",
    carouselImages: [
      "https://m.media-amazon.com/images/I/817WWpaFo1L._SX679_.jpg",
      "https://m.media-amazon.com/images/I/81KkF-GngHL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/61IrdBaOhbL._SX679_.jpg",
    ],
    color: "Icy Silver",
    size: "6 GB RAM 64GB Storage",
  },
  {
    id: "40",
    title:
      "realme narzo N55 (Prime Blue, 4GB+64GB) 33W Segment Fastest Charging | Super High-res 64MP Primary AI Camera",
    oldPrice: 12999,
    price: 10999,
    image:
      "https://images-eu.ssl-images-amazon.com/images/G/31/tiyesum/N55/June/xcm_banners_2022_in_bau_wireless_dec_580x800_v1-n55-marchv2-mayv3-v4_580x800_in-en.jpg",
    carouselImages: [
      "https://m.media-amazon.com/images/I/41Iyj5moShL._SX300_SY300_QL70_FMwebp_.jpg",
      "https://m.media-amazon.com/images/I/61og60CnGlL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/61twx1OjYdL._SX679_.jpg",
    ],
  },
];
const offers = [
  {
    id: "0",
    title:
      "Oppo Enco Air3 Pro True Wireless in Ear Earbuds with Industry First Composite Bamboo Fiber, 49dB ANC, 30H Playtime, 47ms Ultra Low Latency,Fast Charge,BT 5.3 (Green)",
    offer: "72%",
    oldPrice: 7500,
    price: 4500,
    image:
      "https://m.media-amazon.com/images/I/61a2y1FCAJL._AC_UL640_FMwebp_QL65_.jpg",
    carouselImages: [
      "https://m.media-amazon.com/images/I/61a2y1FCAJL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/71DOcYgHWFL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/71LhLZGHrlL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/61Rgefy4ndL._SX679_.jpg",
    ],
    color: "Green",
    size: "Normal",
  },
  {
    id: "1",
    title:
      "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
    offer: "40%",
    oldPrice: 7955,
    price: 3495,
    image: "https://m.media-amazon.com/images/I/41mQKmbkVWL._AC_SY400_.jpg",
    carouselImages: [
      "https://m.media-amazon.com/images/I/71h2K2OQSIL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/71BlkyWYupL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/71c1tSIZxhL._SX679_.jpg",
    ],
    color: "black",
    size: "Normal",
  },
  {
    id: "2",
    title: "Aishwariya System On Ear Wireless On Ear Bluetooth Headphones",
    offer: "40%",
    oldPrice: 7955,
    price: 3495,
    image: "https://m.media-amazon.com/images/I/41t7Wa+kxPL._AC_SY400_.jpg",
    carouselImages: ["https://m.media-amazon.com/images/I/41t7Wa+kxPL.jpg"],
    color: "black",
    size: "Normal",
  },
  {
    id: "3",
    title:
      "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
    offer: "40%",
    oldPrice: 24999,
    price: 19999,
    image: "https://m.media-amazon.com/images/I/71k3gOik46L._AC_SY400_.jpg",
    carouselImages: [
      "https://m.media-amazon.com/images/I/41bLD50sZSL._SX300_SY300_QL70_FMwebp_.jpg",
      "https://m.media-amazon.com/images/I/616pTr2KJEL._SX679_.jpg",
      "https://m.media-amazon.com/images/I/71wSGO0CwQL._SX679_.jpg",
    ],
    color: "Norway Blue",
    size: "8GB RAM, 128GB Storage",
  },
];

const HomeScreen = () => {
  const [products, setProduct] = useState([]);
  const [address, setAddress] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectAdress, setSelectedAdress] = useState("");
  const navigation = useNavigation();

  const categories = [
    "All",
    "men's clothing",
    "jewelery",
    "electronics",
    "women's clothing",
  ];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setModalVisible(false);
  };

  const toggleModal = useCallback(() => {
    setModalVisible((prev) => !prev);
  }, []);
  const handleLocationPress = () => {
    setModalOpen((prevModalOpen) => !prevModalOpen);
  };

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

  useEffect(() => {
    const fecthProducts = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products`);

        const data = await response.json();

        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    };
    fecthProducts();
  }, [selectedCategory]);

  const cart = useSelector((state) => state.cart.cart);

  return (
    <>
      <SafeAreaView style={style.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <SearchBox />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 10,
              backgroundColor: "#AFEEEE",
              gap: 5,
            }}
          >
            <Ionicons
              style={{ color: "#212121", fontSize: 18 }}
              name="location"
              size={24}
              color="black"
            />
            <Pressable onPress={handleLocationPress}>
              {selectAdress ? (
                <Text style={{ fontSize: 13, fontWeight: "500" }}>
                  Deliver To {selectAdress.name} - {selectAdress.city}{" "}
                  {selectAdress.postalcode}
                </Text>
              ) : (
                <Text style={{ fontSize: 13, fontWeight: "500" }}>
                  Add address
                </Text>
              )}
            </Pressable>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {list.map((item, index) => (
              <>
                <Pressable
                  key={index}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    margin: 10,
                  }}
                >
                  <Image
                    width={50}
                    height={50}
                    resizeMode="contain"
                    source={{ uri: item?.image }}
                  />
                  <Text>{item?.name}</Text>
                </Pressable>
              </>
            ))}
          </ScrollView>

          <SliderBox
            images={images}
            autoplay
            circleLoop
            dotColor="#13274F"
            inactiveDotColor="#90A4AE"
            ImageComponentStyle={{ width: "100%", flex: 1 }}
            resizeMode="cover"
            resizeModeContain="contain"
          />
          <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
            Trending Deals of the week
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {deals.map((item) => (
              <Pressable
                onPress={() =>
                  navigation.navigate("Info", {
                    id: item.id,
                    title: item.title,
                    price: item?.price,
                    carouselImages: item.carouselImages,
                    color: item?.color,
                    size: item?.size,
                    oldPrice: item?.oldPrice,
                    item: item,
                  })
                }
                style={{
                  marginVertical: 10,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  width={180}
                  height={180}
                  resizeMode="contain"
                  source={{ uri: item?.image }}
                />
              </Pressable>
            ))}
          </View>
          <Text style={{ borderWidth: 1, borderColor: "#D0D0D0", height: 1 }} />
          <Text style={{ fontSize: 18, fontWeight: "bold", padding: 10 }}>
            Today's Deal
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {offers.map((item, index) => (
              <Pressable
                onPress={() =>
                  navigation.navigate("Info", {
                    id: item.id,
                    title: item.title,
                    price: item?.price,
                    carouselImages: item.carouselImages,
                    color: item?.color,
                    size: item?.size,
                    oldPrice: item?.oldPrice,
                    item: item,
                  })
                }
                style={{
                  marginVertical: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  width={150}
                  height={150}
                  resizeMode="contain"
                  source={{ uri: item?.image }}
                />
                <View
                  style={{
                    backgroundColor: "#EF5350",
                    paddingVertical: 5,
                    width: 120,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 10,
                    borderRadius: 4,
                  }}
                >
                  <Text
                    style={{ fontSize: 15, fontWeight: "bold", color: "white" }}
                  >
                    Upto {item?.offer} off
                  </Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
          <Text style={{ borderWidth: 1, borderColor: "#D0D0D0", height: 1 }} />
          <View
            style={{
              marginHorizontal: 10,
              marginTop: 20,
              width: "45%",
            }}
          >
            <TouchableOpacity onPress={toggleModal}>
              <View style={style.filterButton}>
                <Text>{selectedCategory}</Text>
              </View>
            </TouchableOpacity>

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={toggleModal}
            >
              <View style={style.modalContainer}>
                <View style={style.modalContent}>
                  {categories.map((category) => (
                    <TouchableOpacity
                      key={category}
                      style={style.modalItem}
                      onPress={() => handleCategorySelect(category)}
                    >
                      <Text>{category}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </Modal>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 2,
              marginTop: 10,
            }}
          >
            {products
              ?.filter((item) =>
                selectedCategory === "All"
                  ? true
                  : item.category === selectedCategory
              )
              .map((item, index) => (
                <ProductItem key={index} item={item} />
              ))}
          </View>
        </ScrollView>
      </SafeAreaView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalOpen}
        onRequestClose={() => setModalOpen(false)}
      >
        <View style={style.modalContainer}>
          <View
            style={{
              width: "100%",
              heightt: 400,
              backgroundColor: "white",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              paddingHorizontal: 10,
              paddingTop: 10,
            }}
          >
            <View style={{ paddingHorizontal: 5, marginBottom: 5 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                Choose your Location
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "bold",
                  color: "gray",
                  marginTop: 5,
                }}
              >
                Select a Delivery location to see product availability
              </Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {address?.map((item, index) => (
                <Pressable
                  onPress={() => setSelectedAdress(item)}
                  style={{
                    width: 150,
                    height: 150,
                    borderColor: "#D0D0D0",
                    borderWidth: 1,
                    padding: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 3,
                    marginRight: 15,
                    marginTop: 10,
                    backgroundColor: selectAdress ? "#FBCEB1" : "white",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 3,
                    }}
                  >
                    <Text style={{ fontSize: 13, fontWeight: "bold" }}>
                      {item?.name}
                    </Text>
                    <Entypo name="location-pin" size={24} color="red" />
                  </View>

                  <Text
                    numberOfLines={1}
                    style={{ width: 130, fontSize: 13, textAlign: "center" }}
                  >
                    {item?.houseNo},{item?.landmark}
                  </Text>

                  <Text
                    numberOfLines={1}
                    style={{ width: 130, fontSize: 13, textAlign: "center" }}
                  >
                    {item?.street}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{ width: 130, fontSize: 13, textAlign: "center" }}
                  >
                    India, Bangalore
                  </Text>
                </Pressable>
              ))}
              <Pressable
                onPress={() => {
                  setModalOpen(false);
                  navigation.navigate("Address");
                }}
                style={{
                  width: 150,
                  height: 150,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <Text
                  style={{
                    color: "#0066b2",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  Add an address or pick-up point
                </Text>
              </Pressable>
            </ScrollView>
            <View
              style={{
                flexDirection: "column",
                gap: 7,
                marginBottom: 30,
                marginTop: 20,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Entypo name="location-pin" size={22} color="#0066b2" />
                <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                  Enter an Indian pincode
                </Text>
              </View>

              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <Ionicons name="locate-sharp" size={22} color="#0066b2" />
                <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                  Use My Currect location
                </Text>
              </View>

              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
              >
                <AntDesign name="earth" size={22} color="#0066b2" />

                <Text style={{ color: "#0066b2", fontWeight: "400" }}>
                  Deliver outside India
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const style = StyleSheet.create({
  safeArea: {
    paddingTop: Platform.OS === "android" ? 0 : 0,
    flex: 1,
    backgroundColor: "white",
  },
  filterButton: {
    borderWidth: 1,
    borderColor: "#B7B7B7",
    height: 30,
    justifyContent: "center",
    paddingLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    width: "100%",
    maxHeight: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  modalItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#B7B7B7",
  },
});

export default HomeScreen;
