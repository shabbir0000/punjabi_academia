import { View, Text, FlatList, ScrollView, Image, TouchableOpacity, TextInput, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Screensheader from '../../Screens/Universal/Screensheader'
import tw from "twrnc"
import Modal from "react-native-modal";
import { FAB } from '@rneui/themed';
import { AppContext } from '../../AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../Firebase';
import LottieView from 'lottie-react-native';


const Product = ({ navigation }) => {

  const [Getdata, setGetdata] = React.useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [text1, settext1] = React.useState("");
  const [text2, settext2] = React.useState("");
  const [nav, setnav] = React.useState("");
  const { cat } = useContext(AppContext);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    const coll = collection(db, 'Supplier');
    // const q = query(coll, where('category', '==', cat));

    const unSubscribe = onSnapshot(coll, snapshot => {
      setGetdata(
        snapshot.docs.map(doc => ({
          selecteduser: doc.data(),
        })),
      );
    });

    return () => {
      unSubscribe();
    };
  }, []);







  return (
    <View style={tw`flex-1  bg-white`}>
      <Screensheader
        name={"MODELS AND SCRIPTS"}
        left={5}
        onPress={() => {
          navigation.goBack()
        }}
      />


      <View style={tw`self-center flex-1 items-center justify-center`}>

        <View style={tw`h-100 w-80 self-center   `}>
          <TouchableOpacity 
          onPress={()=>{
            navigation.navigate('Showoptionscreen')
          }}
          >
            <LottieView
              style={tw`h-105 w-105 self-center absolute`}
              source={require("../../Images/Animation - 1721471215016.json")}
              autoPlay
              loop={true}
              speed={1.5}
            />

            <Image
              resizeMode='contain'
              style={tw`h-19 w-19 self-end top-20  rounded-lg `}
              source={require("../../Images/data-management.png")}
            />

            <Image
              resizeMode='contain'
              style={tw`h-19 w-19 rounded-lg top-5  `}
              source={require("../../Images/script.png")}
            />


            <Image
              resizeMode='contain'
              style={tw`h-19 w-19 rounded-lg top-40 left-40`}
              source={require("../../Images/ai.png")}
            />

          </TouchableOpacity>

        </View>
      </View>


      <Modal

        style={[tw`self-center h-60 w-70 `]}
        onDismiss={toggleModal}
        animationIn={'bounceInUp'}
        isVisible={isModalVisible}>
        <View style={{ borderRadius: 50 }}>
          <View style={[{ backgroundColor: "#1E3A8A" }, tw` flex flex-col items-start h-60 w-70 justify-around self-center  rounded-3xl`]} >

            <TouchableOpacity
              onPress={() => {
                toggleModal()

              }}
            >
              <View
                style={tw`items-end self-center justify-end w-270px`}>
                <Image
                  style={{ height: 30, width: 30 }}
                  source={require('../../Images/close.png')}
                />
              </View>
            </TouchableOpacity>
            <View style={tw` h-20 w-40  justify-start self-start items-start left-5 rounded-md`}>
              <Image
                resizeMode='contain'
                style={tw`h-19 w-19 rounded-lg `}
                source={require("../../Images/aboutus.png")}
              />
            </View>

            {/* // balance dev */}
            <View style={tw`self-center w-60 items-start`} >
              <Text style={tw`text-xl font-medium text-gray-100 `}>
                {text1}
              </Text>
              <Text numberOfLines={2} style={tw`text-base font-medium text-gray-100  `}>
                {text2}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  toggleModal()
                  navigation.navigate(nav)
                }}
              >
                <Text style={[tw`text-base underline font-medium `, { color: '#14B8A6' }]}>
                  {"Click Here"}
                </Text>
              </TouchableOpacity>

            </View>


            {/* graph  */}



          </View>


        </View>
      </Modal>
    </View>
  )
}

export default Product

