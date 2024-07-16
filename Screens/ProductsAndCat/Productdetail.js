import {
    View,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import tw from 'twrnc';
import Share from 'react-native-share';
import Ionicon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import { Input1 } from '../../Universal/Input';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { storage, ref1, app, db } from '../../Firebase';
import {
    collection,
    onSnapshot,
    getDoc,
    doc,
    query,
    where,
    limit,
    updateDoc,
    arrayUnion,
    arrayRemove,
    getDocs,
    deleteDoc,
} from 'firebase/firestore';
import { AppContext } from '../../AppContext';
//   import {getAuth} from 'firebase/auth';
//   import AsyncStorage from '@react-native-async-storage/async-storage';

const Productdetail = ({ navigation }) => {



    const { state, addToCart, updateCart, removeFromCart, decreaseQuantity } = useContext(AppContext);
    const [cart, setcart] = useState(0)
    const [product, setProduct] = useState({
        //   id: '',
        id: cart,
        name: '',
        amount: '',
        weight: '',
        cat: '',
        quantity: ''
        //   picLink: '',
    });

    useEffect(() => {
        // Check if the product is already in the cart
        const existingProduct = state.cart.find(item => item.id === "3");
        if (existingProduct) {
            setcart(existingProduct.quantity);
        }
    }, [state.cart]);

    const handleAddToCart = () => {
        // handleAddToCart()
        const product = {
            id: "3",
            name: 'maash daal',
            amount: '2000',
            weight: '10kg',
            cat: 'daal',
            peices: '200',
            quantity: cart
        }
        console.log(product);
        addToCart(product);
        // setProduct({ name: '', weight: '', amount: '', cat: '' ,id:''});
    };


    const handleDecreaseQuantity = (productId) => {
        decreaseQuantity(productId);
    };


    const images = [
        'https://t3.ftcdn.net/jpg/02/28/76/20/360_F_228762020_md5J7oyDKx8ydqrGyN4Pe173n9j51dQe.jpg',
        'https://media.istockphoto.com/id/1151784210/photo/ripe-rice-field-and-sky-background-at-sunset.jpg?s=612x612&w=0&k=20&c=DZz4wxIbPXnMhmoTsEV06uYKup9MEZTtRFe2XkDb0mY=',
        'https://images.pexels.com/photos/1509607/pexels-photo-1509607.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        'https://st.depositphotos.com/1469828/1559/i/450/depositphotos_15595841-stock-photo-hand-with-rice-field.jpg',
        'https://media.istockphoto.com/id/165646486/photo/rice-harvest.jpg?s=612x612&w=0&k=20&c=CMdTN8zAKiOzBVacLL9SDLv0DJVylKgjwoNDZ8Byy2o='
    ]

    const Validation = Yup.object().shape({
        addamount: Yup.number().required('Must be filled'),
    });

    const [onFollowClick, setonFollowClick] = useState(false);
    const [GetData1, setGetData1] = useState([]);
    const [GetData, setGetData] = useState([]);
    const [GetData2, setGetData2] = useState([]);
    const [save, setsave] = useState(false);
    const [loading, setloading] = useState(false);


    const share = () => {
        const option = {
            message: `
       *EVENT Title* : ${title}
    *EVENT DATE* : ${date}
    *EVENT TIME* : ${time}
    *DISCRIPTION*: ${des}
          `
        }
        Share.open(option)
    }

    return (
        <>

            <>
                <SafeAreaView>
                    {/* {GetData1.map(profiledata => ( */}
                    <>
                        <View style={{ backgroundColor: '#FFFFFF' }}>
                            <ScrollView vertical showsVerticalScrollIndicator={true}>
                                <View style={tw` h-200`}>
                                    {/* screen header */}
                                    <View
                                        style={tw` h-10 w-80 self-center mt-5 flex flex-row justify-between`}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                navigation.goBack();
                                            }}
                                        >
                                            <Image
                                                source={require('../../Images/left.png')}
                                                style={tw` h-8 self-start  w-8 `}
                                            />
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            onPress={() => {
                                                navigation.navigate("Vieworder");
                                            }}
                                        >
                                            <Image
                                                source={state.cart.length === 0 ? require('../../Images/shopping-cart.png') : require('../../Images/shopping-cartf.png')}
                                                style={tw` h-8 self-start  w-8 `}
                                            />
                                        </TouchableOpacity>


                                    </View>

                                    {/*bid picture */}
                                    <View>
                                        <Image
                                            resizeMode="cover"
                                            source={{
                                                uri: images[0],
                                            }}
                                            style={tw`items-center justify-center absolute self-center top-2 w-80 h-70 rounded-xl`}
                                        />

                                    </View>

                                    {/* social button */}
                                    <View style={tw` flex flex-row mt-5 left-5`}>
                                        <Ionicon
                                            name="share-social-outline"
                                            color={'white'}
                                            size={30}
                                            style={tw`left-3`}
                                            onPress={() => {
                                                share()
                                                console.log('press');
                                            }}
                                        />
                                    </View>

                                    {/* bid detail */}
                                    <View style={tw`left-5 mt-65  w-80`}>
                                        <Text numberOfLines={1} style={tw`w-80 text-2xl underline font-bold`}>{"Masoor Daal"}</Text>
                                    </View>



                                    {/* detail text */}
                                    {/* <View style={tw`self-center  mt-5   items-center w-80`}>
                                        <Text numberOfLines={1} style={tw` w-80  h-10`}>
                                           Peices : {"20"}
                                        </Text>
                                    </View> */}

                                    <View style={tw`h-15 w-80 self-center`}>
                                        <Text style={tw`font-normal text-base`}>
                                            Wight : {"20 KG"}
                                        </Text>

                                        <Text style={tw`font-normal text-base`}>
                                            Peices : {"20"}
                                        </Text>

                                        <Text style={tw`font-normal text-base`}>
                                            Amount : {"2000"}
                                        </Text>
                                    </View>

                                    {/* {flag === "yes" ? ( */}
                                    <View
                                        style={tw`flex-col  mt-5  justify-around self-center w-80 h-30  items-center`}>
                                        <View style={tw`flex-row w-40 items-center justify-around self-center `}>
                                            <TouchableOpacity
                                                disabled={state.cart.length === 0 ? true : false}
                                                onPress={() => {
                                                    setcart(cart - 1)
                                                    handleDecreaseQuantity("3")

                                                }}
                                            >
                                                <Image
                                                    style={tw`h-10 w-10`}
                                                    source={require("../../Images/minus.png")}
                                                />
                                            </TouchableOpacity>
                                            <Text style={tw`text-lg`}>{cart}</Text>


                                            <TouchableOpacity

                                                onPress={() => {
                                                    // setProduct({ ...product, amount: "1200" })
                                                    // setProduct({ ...product, weight: "20kg" })
                                                    // setProduct({ ...product, name: "masoor daal" })
                                                    // setProduct({ ...product, cat: "daal" })
                                                    // setProduct({ ...product, quantity: cart })
                                                    // setProduct({

                                                    //     amount: '1200',
                                                    //     weight: '20kg',
                                                    //     name: 'masoor daal',
                                                    //     cat: 'daal',
                                                    //     quantity: cart,

                                                    //   });
                                                    setcart(cart + 1)
                                                    handleAddToCart()


                                                }}

                                            >
                                                <Image
                                                    style={tw`h-10 w-10`}
                                                    source={require("../../Images/plus.png")}
                                                />
                                            </TouchableOpacity>
                                        </View>

                                        {/* <TouchableOpacity

                                            // disabled={state.cart.length === 0 ? true : false}
                                            onPress={() => {
                                                // setcart(cart + 1)

                                                console.log("cart", state.cart);
                                            }}
                                        >
                                            <LinearGradient
                                                colors={['#064FF8', '#55ACEE']}
                                                style={tw`self-center items-center justify-center   h-12 w-80 rounded-md  `}>

                                                <Text style={tw`text-white`}>ADD TO CART</Text>

                                            </LinearGradient>
                                        </TouchableOpacity> */}



                                    </View>
                                    {
                                        cart === 0 ?
                                            <></>
                                            :
                                            <TouchableOpacity

                                                // disabled={state.cart.length === 0 ? true : false}
                                                onPress={() => {
                                                    navigation.navigate("Vieworder");
                                                }}
                                            >
                                                <LinearGradient
                                                    colors={['#064FF8', '#55ACEE']}
                                                    style={tw`self-center items-center justify-center   h-12 w-80 rounded-md  `}>

                                                    <Text style={tw`text-white`}>CONFORM ORDER</Text>

                                                </LinearGradient>
                                            </TouchableOpacity>
                                    }


                                </View>
                            </ScrollView>
                        </View>
                    </>

                </SafeAreaView>
            </>

        </>
    );
};

export default Productdetail;
