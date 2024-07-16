import { View, Text, FlatList, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import Screensheader from '../../Components/Screensheader'
import tw from "twrnc"
import Modal from "react-native-modal";
import { FAB } from '@rneui/themed';


const Viewcat = ({ navigation }) => {

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
      <Screensheader name={"Categories"} left={20}
        onPress={() => {
          navigation.navigate('Home')
        }}
      />
      <EvenOddColumns data={categories} />




    </View>
  )
}

export default Viewcat


const EvenOddColumns = ({ data }) => {
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

        <View style={tw`h-35 flex-row justify-around mt-5`}>

          <View style={tw`h-30 w-30 items-center justify-around rounded-2xl bg-white shadow-lg`}>
            <View style={tw`flex-row w-25 justify-between`}>
              <TouchableOpacity
                onPress={() => {
                  toggleModal(),
                    setmname("UPDATE CATEGORY")

                }
                }
              >
                <Image
                  source={require('../../Images/edit.png')}
                  style={tw`h-5 w-5`}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={require('../../Images/delete.png')}
                  style={tw`h-5 w-5`}
                />
              </TouchableOpacity>
            </View>
            <Text style={{
              fontSize: 16,
              textAlign: 'center',
              margin: 5,
            }}>
              {item.even.toUpperCase()}
            </Text>
          </View>

          {item.odd && (
            <View style={tw`h-30 w-30 items-center justify-around rounded-2xl bg-white shadow-lg`}>

              <View style={tw`flex-row w-25 justify-between`}>
                <TouchableOpacity
                  onPress={()=>{
                    toggleModal(),
                    setmname("UPDATE CATEGORY")
  
                  }
                  }
                >
                  <Image
                    source={require('../../Images/edit.png')}
                    style={tw`h-5 w-5`}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    source={require('../../Images/delete.png')}
                    style={tw`h-5 w-5`}
                  />
                </TouchableOpacity>
              </View>

              <Text style={{
                fontSize: 16,
                textAlign: 'center',
                margin: 5,
              }}>
                {item.odd.toUpperCase()}
              </Text>
            </View>
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

      <FAB
          onPress={()=>{
            toggleModal(),
            setmname("ADD CATEGORY")

          }
          }
        style={tw`justify-end w-80 -top-10`}
        visible={visible}
        icon={{ name: 'add', color: 'white' }}
        color="blue"
      />

      <Modal

        style={tw`w-80 self-center rounded-t-lg`}
        onDismiss={toggleModal}
        animationIn={'bounceInUp'}
        isVisible={isModalVisible}>
        <View style={{ borderRadius: 50, backgroundColor: 'white' }}>
          <View style={[{ height: 300, backgroundColor: 'white' }, tw`rounded-xl`]}>

            <TouchableOpacity
              onPress={() => {
                toggleModal()
                // navigation.goBack()
              }}
            >
              <View
                style={tw`items-end self-center justify-end w-310px`}>
                <Image
                  style={{ height: 30, width: 30 }}
                  source={require('../../Images/close.png')}
                />
              </View>
            </TouchableOpacity>

            <View style={tw`mt-10 flex-col  h-30 justify-around`}>

              <View style={tw`self-center`} >
                <Text style={tw`text-center font-normal text-lg`}>
                  {mname}
                </Text>
              </View>

              <TextInput
                style={tw`pl-3 h-10 w-60 mt-10 self-center rounded-xl border`}
                placeholder='Enter Category'
              />


              <TouchableOpacity>
                <View style={[{ marginTop: 40, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', height: 40, width: 200 }, tw`bg-blue-500 rounded-2xl`]}>
                  <Text style={{ textAlign: 'center', color: 'white' }}>Update Category</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>


        </View>
      </Modal>

    </View>
  )
}