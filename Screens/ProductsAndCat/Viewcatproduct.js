import { View, Text, FlatList, ScrollView, Image, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Screensheader from '../../Screens/Universal/Screensheader'
import tw from "twrnc"
import Modal from "react-native-modal";
import { FAB } from '@rneui/themed';
import { AppContext } from '../../AppContext';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../Firebase';
import { showToast } from '../Universal/Input';
import Toast from 'react-native-toast-message';


const Viewcat = ({ navigation }) => {

    const [Getdata, setGetdata] = React.useState([]);
    const [loading, setloading] = React.useState(true);

    const { cat } = useContext(AppContext);
    useEffect(() => {

        const coll = collection(db, 'Products');
        console.log("supplier name :", cat);
        const q = query(coll, where('suppliername', '==', cat));

        const unSubscribe = onSnapshot(q, snapshot => {
            setGetdata(
                snapshot.docs.map(doc => ({
                    selecteduser: doc.data(),
                })),
            );
            setloading(false);
        });



        return () => {
            unSubscribe();
        };

    }, []);


    const [categories, setCategories] = useState([
        {
            name: 'Tapal Danedaar',
            url: 'https://media.naheed.pk/catalog/product/cache/49dcd5d85f0fa4d590e132d0368d8132/1/0/1035394-1.jpg',

        },
        {
            name: 'Super Biscuits',
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxloEnv5_xKjY5Q3MKsZNdZLDUAI2I25Yrozkk6QoU8A&s',

        },
        {
            name: 'Next Cola',
            url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7BWu5A9H-92opwqkqtD-Tjuq6Kw__B4HQ5_hOXUEUWg&s',

        },
        {
            name: 'Meezan Ghee',
            url: 'https://metro-b2c.s3.ap-southeast-1.amazonaws.com/products_images_new/12621260-0-M.jpg',

        },
        {
            name: 'Kisan Ghee',
            url: 'https://kisan.com.pk/cdn/shop/files/KisanBanaspatil2-5KgTin409669958_PK-1961449806_8a537b1b-9801-4556-96d2-407e8fa532c5_1024x.jpg?v=1689052749'
        },
        {
            name: 'Lemon Max Bar',
            url: 'https://colgate.com.pk/wp-content/uploads/2020/01/Lemon-Max-bar-img.jpg'
        },
        {
            name: 'Lux Soap',
            url: 'https://cdn.mafrservices.com/sys-master-root/hca/ha6/48727956717598/192005_main.jpg?im=Resize=480?im=Resize=(60,60)'

        },
        {
            name: 'Pounds Face Wash',
            url: 'https://assets.unileversolutions.com/v1/38333850.png'
        }



    ]);




    return (
        <View style={tw`flex-1  bg-white`}>
            <Screensheader name={"Products"} left={25}
                onPress={() => {
                    navigation.goBack()
                }}
            />
            {
                loading ?
                    <ActivityIndicator size={'large'} style={tw`flex-1 justify-center items-center self-center`} color={'199A8E'} />
                    :
                    <EvenOddColumns navigation={navigation} data={Getdata} />
            }





        </View>
    )
}

export default Viewcat


const EvenOddColumns = ({ data, navigation }) => {
    const { state, addToCart, updateCart, removeFromCart, decreaseQuantity } = useContext(AppContext);
    const [isModalVisible, setModalVisible] = useState(false);
    const [visible, setVisible] = React.useState(true);
    const [uvisible, setuvisible] = React.useState(true);
    const [cart, setcart] = useState(0)
    const [mname, setmname] = React.useState("");
    const [addquantity, setquantity] = React.useState("");
    const [mimg, setmimg] = React.useState("");
    const [pid, setpid] = React.useState("");
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    // Filter even and odd elements

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

    const handleAddToCart = () => {
        // handleAddToCart()
        const product = {
            id: pid,
            name: mname,
            img: mimg,
            pquantity: addquantity,
            quantity: cart
        }
        console.log(product);
        addToCart(product);
        setquantity("")
        toggleModal()
        // setProduct({ name: '', weight: '', amount: '', cat: '' ,id:''});
    };

    const checkcart = (pid) => {
        // Check if the product is already in the cart
        const existingProduct = state.cart.find(item => item.id === pid);
        if (existingProduct) {
            console.log("chala");
            setcart(1);
            setquantity(existingProduct.pquantity)
        }
        else {
            setcart(0);
            setquantity("")
        }
    };

    const deleteproduct = async (docId) => {
        deleteDoc(doc(db, 'Products', docId))
            .then(() => {
                // setLoading(false);
                console.log('delete done');
            })
            .catch(error => {
                // setLoading(false);
                Alert.alert('Error:', error.message);
            });
    };


    const Carsurl = [
        'https://media.naheed.pk/catalog/product/cache/49dcd5d85f0fa4d590e132d0368d8132/1/0/1035394-1.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxloEnv5_xKjY5Q3MKsZNdZLDUAI2I25Yrozkk6QoU8A&s',
        'https://images.pexels.com/photos/1509607/pexels-photo-1509607.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        'https://st.depositphotos.com/1469828/1559/i/450/depositphotos_15595841-stock-photo-hand-with-rice-field.jpg',
        'https://media.istockphoto.com/id/165646486/photo/rice-harvest.jpg?s=612x612&w=0&k=20&c=CMdTN8zAKiOzBVacLL9SDLv0DJVylKgjwoNDZ8Byy2o='
    ]


    const evenElements = data.filter((_, index) => index % 2 === 0);
    const oddElements = data.filter((_, index) => index % 2 !== 0);

    // Combine even and odd elements into one array of objects with type 'even' or 'odd'
    const combinedData = evenElements.map((item, index) => ({
        even: item,
        odd: oddElements[index],
    }));

    // Render an item
    const renderItem = ({ item, index }) => (
        <>
            <ScrollView showsHorizontalScrollIndicator={false}>

                <View style={tw`h-50 flex-row justify-around mt-5`}>

                    <TouchableOpacity
                        disabled={uvisible ? false : true}
                        onPress={() => {
                            checkcart(item.even.selecteduser.id)
                            toggleModal()
                            setmname(item.even.selecteduser.productname)
                            setmimg(item.even.selecteduser.imagelink)
                            setpid(item.even.selecteduser.id)
                            console.log("state :", state.cart)


                        }}

                    >
                        <View style={[tw`h-${uvisible ? '45' : '45'} w-40 items-center justify-around rounded-2xl bg-white shadow-lg shadow-green-700 border`, { borderColor: '#199A8E' }]}>

                            {
                                uvisible ?
                                    <></>
                                    :
                                    <View style={tw`flex-row w-35 mt-1 justify-between`}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                navigation.navigate('Addproduct', {
                                                    url: item.even.selecteduser.imagelink,
                                                    pname: item.even.selecteduser.productname,
                                                    pid: item.even.selecteduser.id

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

                                                    { text: 'OK', onPress: () => deleteproduct(item.even.selecteduser.id) },
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


                            <Image
                                style={[tw`h-25 w-30   `, { borderColor: '#199A8E' }]}

                                source={{
                                    uri: item.even.selecteduser.imagelink
                                }}
                            />
                            <Text
                                numberOfLines={2}
                                style={[{
                                    fontSize: 14,
                                    textAlign: 'center',
                                    margin: 5,
                                }, tw` w-35 h-10 text-center`]}>
                                {item.even.selecteduser.productname.toUpperCase()}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    {item.odd && (

                        <TouchableOpacity
                            disabled={uvisible ? false : true}
                            onPress={() => {

                                checkcart(item.odd.selecteduser.id)
                                toggleModal()
                                setmname(item.odd.selecteduser.productname)
                                setmimg(item.odd.selecteduser.imagelink)
                                setpid(item.odd.selecteduser.id)
                                console.log("state :", state.cart)

                            }}

                        >
                            <View style={[tw`h-${uvisible ? '45' : '45'} w-40 items-center justify-around rounded-2xl bg-white shadow-lg shadow-green-700 border`, { borderColor: '#199A8E' }]}>

                                {
                                    uvisible ?
                                        <></>
                                        :
                                        <View style={tw`flex-row w-35 mt-1 justify-between`}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    navigation.navigate('Addproduct', {
                                                        url: item.odd.selecteduser.imagelink,
                                                        pname: item.odd.selecteduser.productname,
                                                        pid: item.odd.selecteduser.id
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

                                                        { text: 'OK', onPress: () => deleteproduct(item.odd.selecteduser.id) },
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


                                <Image
                                    style={[tw`h-25 w-30 `, { borderColor: '#199A8E' }]}
                                    source={{
                                        uri: item.odd.selecteduser.imagelink
                                    }}
                                />

                                <Text
                                    numberOfLines={2}
                                    style={[{
                                        fontSize: 14,
                                        textAlign: 'center',
                                        margin: 5,
                                    }, tw` w-35 h-10 text-center`]}>
                                    {item.odd.selecteduser.productname.toUpperCase()}
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


            <>
                <FlatList
                    data={combinedData}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem={renderItem}
                />



                {
                    uvisible ?
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("Vieworder");
                            }}
                        >
                            <Image
                                source={state.cart.length === 0 ? require('../../Images/shopping-cart.png') : require('../../Images/shopping-cartf.png')}
                                style={tw` h-12 self-end  w-12 -top-10 -left-5`}
                            />
                        </TouchableOpacity>
                        :
                        <FAB
                            onPress={() => {
                                navigation.navigate('Addproduct', {
                                    url: null,
                                    pname: "",
                                    pid: ""
                                })

                            }
                            }
                            style={tw`justify-end w-80 -top-10`}
                            visible={visible}
                            icon={{ name: 'add', color: 'white' }}
                            // icon={{ name: 'shopping-cart', color: 'white', type: 'font-awesome' }}
                            color="#199A8E"
                        />
                }

                {/* Viewproduct */}

                <Modal

                    style={tw`w-80 self-center rounded-t-lg`}
                    onDismiss={toggleModal}
                    animationIn={'bounceInUp'}
                    isVisible={isModalVisible}>
                    <View style={{ borderRadius: 50, backgroundColor: 'white' }}>
                        <View style={[{ height: 400, backgroundColor: 'white' }, tw`rounded-xl`]}>

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

                            <View style={tw` flex-col items-center h-80 `}>
                                <Image
                                    style={[tw`h-40 w-50`, { borderColor: '#199A8E' }]}

                                    source={{
                                        uri: mimg
                                    }}
                                />
                                <View style={tw`self-center mt-5`} >
                                    <Text numberOfLines={2} style={tw`text-center  w-70 h-12 font-normal text-base`}>
                                        {mname}
                                    </Text>
                                </View>

                                {
                                    cart === 0 ?

                                        <TextInput
                                            // editable={cart === 0 ? true : false}
                                            value={addquantity}
                                            onChangeText={setquantity}
                                            style={tw`pl-3 h-10 w-60 mt-5 self-center rounded-md border`}
                                            placeholder='Enter Quantity'
                                        />
                                        :
                                        <>
                                            <Text style={tw`text-lg mt-5`}>
                                                Quantity : {addquantity}
                                            </Text>
                                        </>

                                }


                                {
                                    cart === 0 ?
                                        <TouchableOpacity
                                            // disabled={cart === 0 ? false : true}
                                            onPress={() => {
                                                if (!addquantity) {
                                                    showToast("error", "Error", "Please Add Quantity", true, 3000)
                                                }
                                                else {
                                                    handleAddToCart()
                                                }
                                            }}
                                        >
                                            <View style={[{ marginTop: 20, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', height: 40, width: 200, backgroundColor: '#199A8E' }, tw` rounded-md`]}>
                                                <Text style={{ textAlign: 'center', color: 'white' }}>{"Add To Cart"}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity
                                            // disabled={cart === 0 ? false : true}
                                            onPress={() => {
                                                removeFromCart(pid)
                                                toggleModal()
                                            }}
                                        >
                                            <View style={[{ marginTop: 20, alignItems: 'center', justifyContent: 'center', alignSelf: 'center', height: 40, width: 200, backgroundColor: '#199A8E' }, tw` rounded-md`]}>
                                                <Text style={{ textAlign: 'center', color: 'white' }}>{"Remove To Cart"}</Text>
                                            </View>
                                        </TouchableOpacity>

                                }

                            </View>
                        </View>


                    </View>
                    <Toast />
                </Modal>
            </>

        </View>
    )
}