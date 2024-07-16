import React, { useState, useRef, useContext, useCallback, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform, PermissionsAndroid } from 'react-native';
import ViewShot from "react-native-view-shot";
import Share from 'react-native-share';
import { AppContext } from '../../AppContext';
import tw from "twrnc"
import { Buttonnormal } from '../Universal/Buttons';
import { showToast } from '../Universal/Input';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../Firebase';
import storage from '@react-native-firebase/storage';
import uuid from 'react-native-uuid';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Shareorder = ({ navigation, route }) => {
    const { orders, supplier, ordernum, imggallery } = route.params;


    const ref = useRef();
    const [imageUri, setImageUri] = useState(null);
    const [simguri, setsimguri] = useState(null);
    const [imgname, setimgname] = useState("");
    const [rnum, setrnum] = useState(Math.floor(Math.random() * 1000000));
    const [shareflag, setshareflag] = useState(false);
    const [loading, setloading] = useState(false);
    const [user, setuser] = useState(null);
    const { state, removeFromCart, cat, clearCart } = useContext(AppContext);
    const userid = uuid.v4();
    const date = new Date()
    const monthdate = (date.getMonth() + 1) + ":" + date.getDate() + ":" + date.getFullYear()
    const randomNumber = Math.floor(Math.random() * 1000000);


    const [fileExists, setFileExists] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Number of items per page

    // Calculate the total number of pages
    const totalPages = Math.ceil(orders.length / itemsPerPage);

    // Determine the items to show for the current page
    const currentItems = orders.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );


    useEffect(() => {
        // checkAndRequestPermissions();
        verifyFileExistence(imggallery);
    }, []);


    const verifyFileExistence = async (uri) => {
        try {
            const exists = await RNFS.exists(uri);
            setFileExists(exists);

            if (!exists) {
                setErrorMessage('The file does not exist');
            }
        } catch (error) {
            setErrorMessage('Failed to check file existence');
        }
    };

    useFocusEffect(
        useCallback(() => {

            AsyncStorage.getItem('email').then((email) => {
                setuser(email);
            });
            return () => {

            };
        }, [])

    );



    const captureView = () => {
        ref.current.capture().then(uri => {
            console.log("Captured URI: ", uri);
            setImageUri(uri);
            const path = uri.replace('file://', '');
            const name = uri.replace("file:///data/user/0/com.Shahmukhi_academia/cache/", "")
            console.log("image path", path);
            console.log("image name", name);
            setsimguri(path)
            setimgname(name)
            shareProducts(path)
            // setshareflag(true);

        }).catch(error => {
            console.error("Capture failed", error);
        });
    };

    const formatProductData = (products) => {
        return products.map(product => {
            return `Product Name: ${product.name}\nQuantity: ${product.pquantity}\n\n`;
        }).join('');
    };

    const shareProducts = (imageUri) => {
        const message = formatProductData(currentItems);

        Share.open({
            url: `file://${imageUri}`,
            message: `From : Sheikh Riaz Store\n\nSupplier : ${cat}\n\n${message}`,
            social: Share.Social.WHATSAPP, // Specify any other social media if needed
        }).catch(err => console.log(err));
    };

    return (
        <>
            <ScrollView>
                <ViewShot ref={ref} options={{ fileName: "image-", format: "jpg", quality: 0.9 }}>

                    <View style={[styles.captureArea, tw` w-80 self-center mt-10`]}>
                        <View style={tw` w-80 h-30 justify-around flex-row`}>
                            <View style={tw`h-30 w-30  items-center justify-center self-center  rounded-full`}>
                                <Image
                                    style={tw`h-30 w-30 `}
                                    source={require('../../Images/Logoonly.png')}
                                />
                            </View>


                            <View style={tw`self-center items-center justify-center `}>
                                <Text style={tw`text-lg text-black`}>
                                    {"Sheikh Riaz Store"}
                                </Text>


                                <Text style={tw`text-lg text-black`}>
                                    {supplier}
                                </Text>

                                <Text style={tw`text-lg text-black`}>
                                    Order : {ordernum}
                                </Text>

                            </View>
                        </View>
                        <View style={tw`mt-5 w-80 items-center flex-row justify-between h-10 self-center`}>
                            {/* <View style={tw` items-center justify-center w-10 h-10`}>
                                <Text>No</Text>
                            </View> */}
                            <View style={tw` items-center justify-center w-25 h-10`}>
                                <Text>Image</Text>
                            </View>
                            <View style={tw` items-start justify-center w-30 h-10`}>
                                <Text>Product Name</Text>
                            </View>
                            <View style={tw` items-center  justify-center w-25  h-10`}>
                                <Text>Quantity</Text>
                            </View>
                        </View>
                        {currentItems.map((product, index) => (
                            <View key={index} style={[styles.productContainer, tw`w-80`]}>
                                {/* <View style={tw` items-center justify-center w-10 h-10`}>
                                    <Text>{index + 1}</Text>
                                </View> */}
                                <View style={tw` items-center justify-center w-25 h-15`}>
                                    <Image source={{ uri: product.img }} style={tw`h-15 w-15 rounded-md`} />
                                </View>
                                <View style={tw` items-start justify-center w-30 h-10`}>
                                    <Text>{product.name}</Text>
                                </View>
                                <View style={tw` items-center justify-center w-25  h-10`}>
                                    <Text>{product.pquantity}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </ViewShot>


                {orders.length > itemsPerPage && (
                    <View style={[styles.pagination]}>
                        <TouchableOpacity
                            disabled={currentPage === 1}
                            onPress={() => { setCurrentPage(prev => Math.max(prev - 1, 1)) }}
                            style={styles.pageButton}
                        >
                            <Text style={styles.pageButtonText}>Previous</Text>
                        </TouchableOpacity>

                        <Text style={styles.pageNumber}>
                            Page {currentPage} of {totalPages}
                        </Text>

                        <TouchableOpacity
                            disabled={currentPage === totalPages}
                            onPress={() => { setCurrentPage(prev => Math.min(prev + 1, totalPages)) }}
                            style={styles.pageButton}
                        >
                            <Text style={styles.pageButtonText}>Next</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {
                    orders.length ?
                        <>
                            {

                                <TouchableOpacity
                                    onPress={() => {
                                        captureView();
                                    }}
                                >
                                    <View style={[tw`w-80 h-10 mt-5  mb-2 self-center justify-center items-center rounded-md`, { backgroundColor: '#199A8E' }]}>
                                        <Text style={tw`text-center text-white`}>SHARE ORDER TO SUPPLIER</Text>
                                    </View>
                                </TouchableOpacity>


                            }

                        </>
                        :
                        <>
                            <Text style={tw`text-center text-2xl mt-30`}>No Item Added Yet</Text>
                        </>

                }

            </ScrollView>
            {/* {imageUri && (
                <Image
                    style={styles.capturedImage}
                    source={{ uri: imageUri }}
                />
            )} */}
        </>
    );
}

const styles = StyleSheet.create({
    captureArea: {
        // padding: 20,
        // margin: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    productContainer: {
        flexDirection: 'row',

        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    productImage: {
        width: 40,
        height: 40,
        marginBottom: 10,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    productQuantity: {
        fontSize: 14,
    },
    capturedImage: {
        height: 400,
        width: '100%',
        marginTop: 20,
    },


    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    pageButton: {
        padding: 10,
        backgroundColor: '#199A8E',
        borderRadius: 5,
        width: 80,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    pageButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    pageNumber: {
        fontSize: 16,
        fontWeight: 'bold',
    },

});

export default Shareorder;