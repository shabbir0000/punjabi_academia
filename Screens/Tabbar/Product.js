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
        <View style={tw`h-70 w-70 border-2 border-green-500 rounded-full absolute shadow-md shadow-green-500 `}>

          <TouchableOpacity
            onPress={() => {
              toggleModal()
              settext1("GET")
              settext2("Ready-To-Use Preproceesing CBOW Model")
              setnav("Preprocessscript")
            }}
          >
            <Image
              resizeMode='contain'
              style={tw`h-19 w-19 rounded-lg -top-5 left-5`}
              source={require("../../Images/data-management.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
           onPress={() => {
            toggleModal()
            settext1("GET")
            settext2("Ready-To-Use Scripts For Preprocessing")
            setnav("Preprocessmodels")
          }}
          >

            <Image
              resizeMode='contain'
              style={tw`h-19 w-19 rounded-lg self-end left-7  `}
              source={require("../../Images/script.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
           onPress={() => {
            toggleModal()
            settext1("GET")
            settext2("Ready-To-Run Trained 5+ Model CodesFiles ")
            setnav("Trainedmodel")
          }}
          >

            <Image
              resizeMode='contain'
              style={tw`h-19 w-19 rounded-lg left-15 top-15`}
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
        <View style={{ borderRadius: 50}}>
          <View style={[{ backgroundColor: "#00a897" }, tw` flex flex-col items-start h-60 w-70 justify-around self-center  rounded-3xl`]} >

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
                <Text style={tw`text-base underline font-medium text-green-200  `}>
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

