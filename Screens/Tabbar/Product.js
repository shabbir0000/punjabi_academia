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


  const [categories, setCategories] = useState([
    { name: 'Ali', companyName: 'Tech Solutions' },
    { name: 'Akshay', companyName: 'Innovatech' },
    { name: 'Umer', companyName: 'Future Enterprises' },
    { name: 'Ikram', companyName: 'Global Dynamics' },
    { name: 'Bilal', companyName: 'NextGen Technologies' },
    { name: 'Naveed', companyName: 'Creative Minds' },
    { name: 'Anas', companyName: 'Pioneer Solutions' },
    { name: 'Mirza', companyName: 'Visionary Tech' }
  ]);




  return (
    <View style={tw`flex-1  bg-white`}>
      <Screensheader
        name={"Choose Supplier"}
        left={15}
        onPress={() => {
          navigation.goBack()
        }}
      />
      <EvenOddColumns navigation={navigation} data={Getdata} />




    </View>
  )
}

export default Product


const EvenOddColumns = ({ data, navigation }) => {
  const { setcat, cat, clearCart } = useContext(AppContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = React.useState(true);
  const [uvisible, setuvisible] = React.useState(true);
  const [mname, setmname] = React.useState("");
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useFocusEffect(
    React.useCallback(() => {
      const checkUserRole = async () => {
        const role = await AsyncStorage.getItem("role");
        if (role === "admin") {
          setuvisible(false);
        } else {
          setuvisible(true);
        }
        // setloading(false);
      };

      checkUserRole();

      // Cleanup function if needed (not required for this case)
      return () => { };

    }, []) // Empty dependency array ensures this runs only on focus and cleanup on blur
  );


  const deletesupplier = async (docId) => {
    deleteDoc(doc(db, 'Supplier', docId))
      .then(() => {
        // setLoading(false);
        console.log('delete done');
      })
      .catch(error => {
        // setLoading(false);
        Alert.alert('Error:', error.message);
      });
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

        <View style={tw`h-45 flex-row justify-around mt-5`}>

          <TouchableOpacity
            onPress={() => {
              uvisible ?
                cat === item.even.selecteduser.suppliername ?
                  (
                    navigation.navigate('Viewproduct'),

                    setcat(item.even.selecteduser.suppliername)
                  )
                  :
                  (

                    Alert.alert('Alert', 'If You Change The Supplier Cart Will Be Clear', [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {
                        text: 'OK', onPress: () => {

                          setcat(item.even.selecteduser.suppliername),
                            clearCart(),
                            navigation.navigate('Viewproduct')

                        }
                      },
                    ])

                  )
                :
                (
                  navigation.navigate('Viewproduct'),
                  setcat(item.even.selecteduser.suppliername)
                )

            }}
          >
            <View style={[tw`h-${uvisible ? '40' : '40'} w-${uvisible ? '40' : '40'} items-center flex-col justify-evenly rounded-2xl bg-white border`, { borderColor: '#199A8E' }]}>
              {
                uvisible ?
                  <></>
                  :
                  <View style={tw`flex-row w-35 justify-between`}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('Supplier', {
                          suppliername: item.even.selecteduser.suppliername,
                          supplierphone: item.even.selecteduser.suplierphone,
                          suppliercompany: item.even.selecteduser.suppliercompany,
                          supplierid: item.even.selecteduser.id,
                          email: item.even.selecteduser.email,
                        })

                      }
                      }
                    >
                      <Image
                        source={require('../../Images/edit.png')}
                        style={tw`h-5 w-5`}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        Alert.alert('Alert', 'Are You Sure You Want To Delete', [
                          {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                          },

                          { text: 'OK', onPress: () => deletesupplier(item.even.selecteduser.id) },
                        ]);
                      }}
                    >
                      <Image
                        source={require('../../Images/delete.png')}
                        style={tw`h-5 w-5`}
                      />
                    </TouchableOpacity>
                  </View>
              }

              <View style={[tw`h-15 w-15 items-center rounded-full border justify-center`, { borderColor: '#199A8E' }]}>
                <Image
                  style={tw`h-10 w-10`}
                  source={require("../../Images/person.png")}
                />

              </View>
              <Text
                numberOfLines={3}
                style={[{
                  fontSize: 12,
                  textAlign: 'center',
                  // borderWidth :1,
                  // borderColor: "black",
                  width: 70
                  // margin: 5,
                }, tw` w-30 h-12`]}>
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
                uvisible ?
                  cat === item.odd.selecteduser.suppliername ?
                    (
                      navigation.navigate('Viewproduct'),
                      setcat(item.odd.selecteduser.suppliername)
                    )
                    :
                    (

                      Alert.alert('Alert', 'If You Change The Supplier Cart Will Be Clear', [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                        {
                          text: 'OK', onPress: () => {

                            setcat(item.odd.selecteduser.suppliername),
                              clearCart(),
                              navigation.navigate('Viewproduct')

                          }
                        },
                      ])

                    )
                  :
                  (
                    navigation.navigate('Viewproduct'),
                    setcat(item.odd.selecteduser.suppliername)
                  )


              }}
            >
              <View style={[tw`h-${uvisible ? '40' : '40'} w-${uvisible ? '40' : '40'} items-center flex-col justify-evenly rounded-2xl bg-white border`, { borderColor: '#199A8E' }]}>

                {
                  uvisible ?
                    <></>
                    :
                    <View style={tw`flex-row w-35 justify-between`}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('Supplier', {
                            suppliername: item.odd.selecteduser.suppliername,
                            supplierphone: item.odd.selecteduser.suplierphone,
                            suppliercompany: item.odd.selecteduser.suppliercompany,
                            supplierid: item.odd.selecteduser.id,
                            email: item.odd.selecteduser.email,
                          })

                        }
                        }
                      >
                        <Image
                          source={require('../../Images/edit.png')}
                          style={tw`h-5 w-5`}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity

                        onPress={() => {
                          Alert.alert('Alert', 'Are You Sure You Want To Delete', [
                            {
                              text: 'Cancel',
                              onPress: () => console.log('Cancel Pressed'),
                              style: 'cancel',
                            },

                            { text: 'OK', onPress: () => deletesupplier(item.odd.selecteduser.id) },
                          ]);

                        }}
                      >
                        <Image
                          source={require('../../Images/delete.png')}
                          style={tw`h-5 w-5`}
                        />
                      </TouchableOpacity>
                    </View>
                }


                <View style={[tw`h-15 w-15 items-center rounded-full border justify-center`, { borderColor: '#199A8E' }]}>
                  <Image
                    style={tw`h-10 w-10`}
                    source={require("../../Images/person.png")}
                  />

                </View>

                <Text
                  numberOfLines={3}
                  style={[{
                    fontSize: 12,
                    textAlign: 'center',
                    // borderWidth :1,
                    // borderColor: "black",
                    width: 70
                    // margin: 5,
                  }, tw` w-30 h-12`]}>
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