import React, { useState, useRef, useContext, useCallback, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView, TouchableOpacity, Alert, PermissionsAndroid, Platform } from 'react-native';
import ViewShot from "react-native-view-shot";
import Share from 'react-native-share';
import { AppContext } from '../../AppContext';
import tw from "twrnc"
import { Buttonnormal } from '../Universal/Buttons';
import { showToast } from '../Universal/Input';
import { collection, doc, onSnapshot, query, setDoc, where } from 'firebase/firestore';
import { db } from '../../Firebase';
import storage from '@react-native-firebase/storage';
import uuid from 'react-native-uuid';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { request, PERMISSIONS } from 'react-native-permissions';

const Vieworder = ({ navigation }) => {
    const ref = useRef();
    const [imageUri, setImageUri] = useState(null);
    const [simguri, setsimguri] = useState(null);
    const [imgname, setimgname] = useState("");
    const [gimg, setgimg] = useState("");
    const [rnum, setrnum] = useState(Math.floor(Math.random() * 1000000));
    const [shareflag, setshareflag] = useState(false);
    const [loading, setloading] = useState(false);
    const [user, setuser] = useState(null);
    const { state, removeFromCart, cat, clearCart } = useContext(AppContext);
    const userid = uuid.v4();
    const date = new Date()
    const monthdate = (date.getMonth() + 1) + ":" + date.getDate() + ":" + date.getFullYear()
    const [GetData, setGetData] = useState([]);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Number of items per page

    // Calculate the total number of pages
    const totalPages = Math.ceil(state.cart.length / itemsPerPage);

    // Determine the items to show for the current page
    const currentItems = state.cart.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );


    useEffect(() => {
        // const requestStoragePermission = async () => {
        //     if (Platform.OS === 'android') {
        //         const granted = await PermissionsAndroid.request(
        //             PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        //             {
        //                 title: 'Storage Permission Required',
        //                 message: 'This app needs access to your storage to save images',
        //                 buttonPositive: 'OK'
        //             }
        //         );

        //         return granted === PermissionsAndroid.RESULTS.GRANTED;
        //     } else if (Platform.OS === 'ios') {
        //         const result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
        //         return result === 'granted';
        //     }

        //     return false;
        // };

        const requestStoragePermissions = async () => {
            try {
                if (Platform.OS === 'android') {
                    // Check if Android version is Marshmallow or above

                    // Requesting multiple permissions
                    const granted = await PermissionsAndroid.requestMultiple([
                        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                        PermissionsAndroid.PERMISSIONS.ACCESS_MEDIA_LOCATION,
                    ]);

                    // Check if all permissions are granted
                    if (
                        granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
                        granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
                        granted['android.permission.ACCESS_MEDIA_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED
                    ) {
                        console.log('You have all required permissions');
                    } else {
                        console.log('Permissions denied');
                        // Alert.alert('Permission Denied', 'You need to grant all permissions to save images.', [{ text: 'OK' }]);
                    }

                }
            } catch (err) {
                console.warn(err);
            }
        };

        // requestStoragePermission()  
        requestStoragePermissions()
    })


    useFocusEffect(
        useCallback(() => {

            AsyncStorage.getItem('email').then((email) => {
                setuser(email);
            });
            return () => {

            };
        }, [])

    );



    useEffect(() => {

        AsyncStorage.getItem("email").then((email) => {
            const coll = collection(db, 'Profile');
            const q = query(coll, where('email', '==', email));

            const unSubscribe = onSnapshot(q, snapshot => {
                setGetData(
                    snapshot.docs.map(doc => ({
                        selecteduser: doc.data(),
                    })),
                );
            });
            return () => {
                unSubscribe();
            };
        })
    }, []);

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
            setshareflag(true);

        }).catch(error => {
            console.error("Capture failed", error);
        });
    };

    const saveImageToGallery = async () => {
        const galleryPath = RNFS.PicturesDirectoryPath + '/SupplySync';
        const fileName = 'captured_image_' + Date.now() + '.jpg';
        const galleryFilePath = `${galleryPath}/${fileName}`;
        // await saveImageToGallery(imageUri);
        // Create directory if it doesn't exist
        await RNFS.mkdir(galleryPath);

        // Copy the captured file to the new location
        await RNFS.copyFile(imageUri.replace('file://', ''), galleryFilePath);

        // Scan the file to make it visible in the gallery
        await RNFS.scanFile(galleryFilePath);

        console.log('Image saved to gallery (Android):', galleryFilePath);
        setgimg(galleryFilePath)
        // showToast("info", "Success", "The Image Has Been Save In YOur Gallery", true, 3000)
        Alert.alert('Congratulation', 'Image Has Been Saved', [
            { text: 'OK' },
        ]);
    }

    const uploadfile = async () => {


        if (!imgname || !simguri) {
            showToast("error", "Error", "Please Select The Image First", true, 3000)
        }
        else {
            try {
                setloading(true);


                const reference = storage().ref(`allfiles/${imgname}`);
                await reference.putFile(simguri);
                const url = await storage().ref(`allfiles/${imgname}`).getDownloadURL();
                console.log('your file is locating :', url);
                Uploadata(url);
            }
            catch (error) {

                setloading(false);
                console.log("Error :", error);
            }
        }
    };

    const Uploadata = async (uploadedurlimg) => {
        setDoc(doc(db, 'Orders', userid), {
            Ordergb: GetData[0]?.selecteduser.fullname,
            unfilerimg: imageUri,
            galleryimg: gimg,
            ordernum: rnum,
            id: userid,
            suppliername: cat,
            imagelink: uploadedurlimg,
            email: user,
            orders: state.cart,
            date: monthdate
        })
            .then(() => {
                console.log('done');
                setloading(false);
                clearCart()
                Alert.alert('Congratulation', 'Order Has Been Saved', [
                    { text: 'OK', onPress: () => navigation.goBack() },
                ]);
            })
            .catch(error => {
                setloading(false);
                Alert.alert('this :', error.message);
            });
    };


    const formatProductData = (products) => {
        return products.map(product => {
            return `Product Name: ${product.name}\nQuantity: ${product.pquantity}\n\n`;
        }).join('');
    };

    const shareProducts = () => {
        const message = formatProductData(currentItems);

        Share.open({
            url: imageUri,
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
                                    {cat}
                                </Text>

                                <Text style={tw`text-lg text-black`}>
                                    Order : {rnum}
                                </Text>

                            </View>
                        </View>
                        <View style={tw`mt-5 w-80 items-center flex-row justify-between h-10 self-center`}>

                            <View style={tw` items-center  justify-center w-25 h-10`}>
                                <Text>Image</Text>
                            </View>
                            <View style={tw` items-start justify-center  w-30 h-10`}>
                                <Text>Product Name</Text>
                            </View>
                            <View style={tw` items-center  justify-center  w-25  h-10`}>
                                <Text>Quantity</Text>
                            </View>
                        </View>
                        {currentItems.map((product, index) => (
                            <View key={index} style={[styles.productContainer, tw`w-80`]}>
                                {/* <View style={tw` items-center justify-center w-10 h-10`}>
                                    <Text>{index + 1}</Text>
                                </View> */}
                                <View style={tw` items-center justify-center  w-25 h-15`}>
                                    <Image source={{ uri: product.img }} style={tw`h-15 w-15 rounded-md`} />
                                </View>
                                <View style={tw` items-start justify-center  w-30 h-10`}>
                                    <Text>{product.name}</Text>
                                </View>
                                <View style={tw` items-center justify-center w-25  h-10`}>
                                    <Text>{product.pquantity}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </ViewShot>
                {
                    state.cart.length ?
                        <>
                            {
                                shareflag ?
                                    <></>
                                    :
                                    <TouchableOpacity
                                        onPress={() => {
                                            captureView();
                                        }}
                                    >
                                        <View style={[tw`w-80 h-10 mt-10 mb-2 self-center justify-center items-center rounded-md`, { backgroundColor: '#199A8E' }]}>
                                            <Text style={tw`text-center text-white`}>CAPTURE IMAGE</Text>
                                        </View>
                                    </TouchableOpacity>
                            }


                            {
                                shareflag ?
                                    <>
                                        <TouchableOpacity
                                            onPress={() => {
                                                shareProducts();
                                            }}
                                        >
                                            <View style={[tw`mt-5 w-80 mb-2 h-10 self-center justify-center items-center rounded-md`, { backgroundColor: '#199A8E' }]}>
                                                <Text style={tw`text-center text-white`}>SHARE ON WATSAPP</Text>
                                            </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            onPress={() => {
                                                saveImageToGallery();
                                            }}
                                        >
                                            <View style={[tw`mt-5 w-80 mb-2 h-10 self-center justify-center items-center rounded-md`, { backgroundColor: '#199A8E' }]}>
                                                <Text style={tw`text-center text-white`}>SAVE CURRENT IMAGE TO GALLERY</Text>
                                            </View>
                                        </TouchableOpacity>

                                        {
                                            loading ?
                                                <ActivityIndicator size={'large'} color={'#199A8E'} style={tw`mt-10`} />
                                                :
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        Alert.alert('Alert', 'Are You Sure You Want TO Save All Product Parmanent?', [
                                                            {
                                                                text: 'Cancel',
                                                                onPress: () => console.log('Cancel Pressed'),
                                                                style: 'cancel',
                                                            },
                                                            { text: 'OK', onPress: () => uploadfile() },
                                                        ]);

                                                    }}
                                                >
                                                    <View style={[tw`mt-5 w-80 mb-2 h-10 self-center justify-center items-center rounded-md`, { backgroundColor: '#199A8E' }]}>
                                                        <Text style={tw`text-center text-white`}>SAVE PARMANENT</Text>
                                                    </View>
                                                </TouchableOpacity>
                                        }

                                    </>
                                    :
                                    <></>
                            }


                        </>
                        :
                        <>
                            <Text style={tw`text-center text-2xl mt-30`}>No Item Added Yet</Text>
                        </>

                }

                {state.cart.length > itemsPerPage && (
                    <View style={[styles.pagination]}>
                        <TouchableOpacity
                            disabled={currentPage === 1}
                            onPress={() => { setCurrentPage(prev => Math.max(prev - 1, 1)), setshareflag(false) }}
                            style={styles.pageButton}
                        >
                            <Text style={styles.pageButtonText}>Previous</Text>
                        </TouchableOpacity>

                        <Text style={styles.pageNumber}>
                            Page {currentPage} of {totalPages}
                        </Text>

                        <TouchableOpacity
                            disabled={currentPage === totalPages}
                            onPress={() => { setCurrentPage(prev => Math.min(prev + 1, totalPages)), setshareflag(false) }}
                            style={styles.pageButton}
                        >
                            <Text style={styles.pageButtonText}>Next</Text>
                        </TouchableOpacity>
                    </View>
                )}
                <Toast />
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
        width: 50,
        height: 50,
        // marginBottom: 10,
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
    captureArea: {
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
    capturedImage: {
        height: 400,
        width: '100%',
        marginTop: 20,
    }

});

export default Vieworder;