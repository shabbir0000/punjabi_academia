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


const Orders = ({ navigation }) => {

  const [Getdata, setGetdata] = React.useState([]);
  const { cat } = useContext(AppContext);

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
      <View style={tw`mt-5 h-20 w-85 self-center items-center justify-center`}>
        <Text style={[tw`text-xl text-center font-bold`, { color: '#199A8E' }]}>Select Supplier To See There Orders</Text>
      </View>
      <EvenOddColumns navigation={navigation} data={Getdata} />




    </View>
  )
}

export default Orders


const EvenOddColumns = ({ data, navigation }) => {

  // Filter even and odd elements
  const evenElements = data.filter((_, index) => index % 2 === 0);
  const oddElements = data.filter((_, index) => index % 2 !== 0);

  // Combine even and odd elements into one array of objects with type 'even' or 'odd'
  const combinedData = evenElements.map((item, index) => ({
    even: item,
    odd: oddElements[index],
  }));

  // Render an item
  const renderItem = ({ item }) => (
    <>
      <ScrollView showsHorizontalScrollIndicator={false}>

        <View style={tw`h-35 flex-row justify-around mt-5`}>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Viewsupplierorder", {
                suppliername: item.even.selecteduser.suppliername
              })
            }}
          >
            <View style={[tw`h-30 w-30 items-center flex-col justify-center rounded-2xl bg-white border`, { borderColor: '#199A8E' }]}>

              <View style={[tw`h-15 w-15 items-center rounded-full border justify-center`, { borderColor: '#199A8E' }]}>
                <Image
                  style={tw`h-10 w-10`}
                  source={require("../../Images/person.png")}
                />

              </View>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 16,
                  textAlign: 'center',
                  width: 70
                  // margin: 5,
                }}>
                {item.even.selecteduser.suppliername.toUpperCase()}
              </Text>

              <Text
                numberOfLines={1}
                style={{
                  fontSize: 10,
                  textAlign: 'center',
                  // margin: 5,
                }}>
                {item.even.selecteduser.suppliercompany.toUpperCase()}
              </Text>

            </View>
          </TouchableOpacity>

          {item.odd && (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Viewsupplierorder", {
                  suppliername: item.odd.selecteduser.suppliername
                })
              }}
            >
              <View style={[tw`h-30 w-30 items-center flex-col justify-center rounded-2xl bg-white border`, { borderColor: '#199A8E' }]}>

                <View style={[tw`h-15 w-15 items-center rounded-full border justify-center`, { borderColor: '#199A8E' }]}>
                  <Image
                    style={tw`h-10 w-10`}
                    source={require("../../Images/person.png")}
                  />

                </View>

                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 16,
                    textAlign: 'center',
                    // margin: 5,
                  }}>
                  {item.odd.selecteduser.suppliername.toUpperCase()}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 10,
                    textAlign: 'center',
                    // margin: 5,
                  }}>
                  {item.odd.selecteduser.suppliercompany.toUpperCase()}
                </Text>
              </View>
            </TouchableOpacity>
          )}

        </View>
      </ScrollView>

    </>
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={combinedData}
        keyExtractor={(item, index) => `${index}`}
        renderItem={renderItem}
      />



    </View>
  )
}