import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity, Alert,Platform, PermissionsAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../Firebase';
import tw from "twrnc"
import { Image } from '@rneui/base';
import Share from 'react-native-share';
import { request, PERMISSIONS } from 'react-native-permissions';


const Viewsupplierorder = ({ navigation, route }) => {

    // useEffect(()=>{
    //     const requestStoragePermission = async () => {
    //         if (Platform.OS === 'android') {
    //             const granted = await PermissionsAndroid.request(
    //                 PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    //                 {
    //                     title: 'Storage Permission Required',
    //                     message: 'This app needs access to your storage to save images',
    //                     buttonPositive: 'OK'
    //                 }
    //             );
    
    //             return granted === PermissionsAndroid.RESULTS.GRANTED;
    //         } else if (Platform.OS === 'ios') {
    //             const result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
    //             return result === 'granted';
    //         }
    
    //         return false;
    //     };
    //     requestStoragePermission()   
    // })

    const { suppliername } = route.params
    const [order, setorder] = useState([]);
    const [loading, setloading] = useState(true);
    const [Getdata, setGetdata] = React.useState([]);

    useEffect(() => {
        // const user = auth.currentUser;

        setloading(true)
        const coll = collection(db, 'Orders');
        const q = query(coll, where('suppliername', '==', suppliername));

        const unSubscribe = onSnapshot(q, snapshot => {
            setGetdata(
                snapshot.docs.map(doc => ({
                    selecteduser: doc.data(),
                })),
            );
        });
        setloading(false)

        return () => {
            unSubscribe();
        };


    }, []);



    const formatProductData = (products) => {
        return products.map(product => {
            return `Product Name: ${product.name}\nQuantity: ${product.pquantity}\n\n`;
        }).join('');
    };

    const shareProducts = (state,imagelink) => {
        const message = formatProductData(state);
        // const convertedUrl = convertFirebaseUrl(imagelink);

        Share.open({
            url: `file://${imagelink}`,
            message: `From : Supply Sync\n\nSupplier : ${suppliername}\n\n${message}`,
            social: Share.Social.WHATSAPP, // Specify any other social media if needed
        }).catch(err => console.log(err));
    };
   

    const deleteorders = async (docId) => {
        deleteDoc(doc(db, 'Orders', docId))
          .then(() => {
            // setLoading(false);
            console.log('delete done');
          })
          .catch(error => {
            // setLoading(false);
            Alert.alert('Error:', error.message);
          });
      };
      
      
    return (


        <View>
            {
                loading ?
                    <ActivityIndicator size={'large'} color={'#199A8E'} style={tw`justify-center items-center self-center`} />
                    :
                    <View style={tw`h-180 w-80  self-center items-center justify-between`}>
                        <View style={tw`mt-5 h-20 w-85 self-center items-center justify-center`}>
                            <Text style={[tw`text-2xl text-center font-bold`, { color: '#199A8E' }]}>View {suppliername} Orders</Text>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false}>

                            {
                                Getdata.length ?
                                    Getdata.map((data, index) => (
                                        // data.selecteduser.orders.map((dataa, index) => (
                                        <View key={index} style={[tw`h-80 w-80 border items-center justify-around  mb-4`, { borderColor: '#199A8E', borderRadius: 10 }]}>
                                            <View style={tw`h-7 items-end w-75`}>
                                                <TouchableOpacity 
                                                onPress={()=>{
                                                    Alert.alert('Alert', 'Are You Sure You Want To Delete', [
                                                        {
                                                          text: 'Cancel',
                                                          onPress: () => console.log('Cancel Pressed'),
                                                          style: 'cancel',
                                                        },
                              
                                                        { text: 'OK', onPress: () =>  deleteorders(data.selecteduser.id) },
                                                      ]);
                                                   
                                                }}
                                                >
                                                    <Image
                                                        source={require("../../Images/delete.png")}
                                                        style={[tw`h-5 w-5`]}
                                                    // resizeMode='cover'
                                                    />
                                                </TouchableOpacity>
                                            </View>
                                            <Image
                                                source={{ uri: `${data.selecteduser.imagelink}` }}
                                                style={[tw`w-70 h-30`, { borderRadius: 10 }]}
                                                resizeMode='cover'
                                            />
                                            <View style={tw`flex-row w-70 h-5 border-b-2 border-green-300 justify-between`}>
                                                <Text>Order Name</Text>
                                                <Text>{data.selecteduser.ordernum}</Text>
                                            </View>
                                            <View style={tw`flex-row w-70 h-5 border-b-2 border-green-300 justify-between`}>
                                                <Text >Supplier Name</Text>
                                                <Text>{data.selecteduser.suppliername}</Text>
                                            </View>

                                            <View style={tw`flex-row w-70 h-5 border-b-2 border-green-300 justify-between`}>
                                                <Text >Order At</Text>
                                                <Text>{data.selecteduser.date}</Text>
                                            </View>

                                            <View style={tw`flex-row w-70 h-5 border-b-2 border-green-300 justify-between`}>
                                                <Text >Generated</Text>
                                                <Text>{data.selecteduser.Ordergb}</Text>
                                            </View>

                                            <TouchableOpacity
                                                onPress={() => {
                                                    navigation.navigate("Shareorder",{
                                                        orders : data.selecteduser.orders,
                                                        supplier : data.selecteduser.suppliername,
                                                        ordernum : data.selecteduser.ordernum,
                                                        imggallery : data.selecteduser.galleryimg,
                                                       
                                                    })
                                                    // shareProducts(data.selecteduser.orders, data.selecteduser.galleryimg);
                                                }}
                                            >
                                                <View style={[tw`mt-5 w-70 mb-2 h-10 self-center justify-center items-center rounded-md`, { backgroundColor: '#199A8E' }]}>
                                                    <Text style={tw`text-center text-white`}>VIEW ORDERS</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        // ))
                                    ))
                                    :
                                    <View style={tw`flex-1  h-120 w-80 justify-center self-center  items-center`}>
                                        <Text style={tw`text-xl`}>No Order</Text>
                                    </View>
                            }
                        </ScrollView>
                    </View>
            }

        </View>
    )
}

export default Viewsupplierorder