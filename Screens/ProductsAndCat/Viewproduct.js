import { View, Text, FlatList, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import Screensheader from '../../Components/Screensheader'
import tw from "twrnc"
import Modal from "react-native-modal";
import { FAB } from '@rneui/themed';


const Viewproduct = ({ navigation }) => {

  const [categories, setCategories] = useState([
    'daal',
    'chawal',
    'gheee',
    'ata',
    'chini',
    'namak',
    'mix item',
    'biscuit',


  ]);




  return (
    <View style={tw`flex-1  bg-white`}>
      <Screensheader name={"Choose Category"} left={10}
        onPress={() => {
          navigation.goBack()
        }}
      />
      <EvenOddColumns navigation={navigation} data={categories} />




    </View>
  )
}

export default Viewproduct


const EvenOddColumns = ({ data ,navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = React.useState(true);
  const [mname, setmname] = React.useState("");
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
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

        <View style={tw`h-15 flex-row justify-around mt-5`}>

          <TouchableOpacity 
          onPress={()=>{
            navigation.navigate('Viewcatproduct')
          }}
          >
            <View style={tw`h-10 w-30 items-center justify-around rounded-2xl bg-white border border-slate-300`}>

              <Text style={{
                fontSize: 16,
                textAlign: 'center',
                margin: 5,
              }}>
                {item.even.toUpperCase()}
              </Text>
            </View>
          </TouchableOpacity>

          {item.odd && (
            <TouchableOpacity 
            onPress={()=>{
              navigation.navigate('Viewcatproduct')
            }}
            >
              <View style={tw`h-10 w-30 items-center justify-around rounded-2xl bg-white border-slate-300 border`}>
                <Text style={{
                  fontSize: 16,
                  textAlign: 'center',
                  margin: 5,
                }}>
                  {item.odd.toUpperCase()}
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