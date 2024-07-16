import { View, Text, TouchableOpacity, Image, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import LottieView from 'lottie-react-native';
import tw from 'twrnc';
import { getAuth } from 'firebase/auth';
import { app, db } from '../../Firebase';
// import { collection, onSnapshot, query, where } from 'firebase/firestore';
// import Carousel from 'react-native-reanimated-carousel';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

const Cbids = ({ navigation }) => {
  const auth = getAuth(app);
  const [GetData, setGetData] = useState([]);
  const [GetData1, setGetData1] = useState([]);
  const [GetData2, setGetData2] = useState([]);

  const [userflag, setuserflag] = useState(false);
  const [loading, setloading] = useState(false);

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const images = [
    'https://t3.ftcdn.net/jpg/02/28/76/20/360_F_228762020_md5J7oyDKx8ydqrGyN4Pe173n9j51dQe.jpg',
    'https://media.istockphoto.com/id/1151784210/photo/ripe-rice-field-and-sky-background-at-sunset.jpg?s=612x612&w=0&k=20&c=DZz4wxIbPXnMhmoTsEV06uYKup9MEZTtRFe2XkDb0mY=',
    'https://images.pexels.com/photos/1509607/pexels-photo-1509607.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://st.depositphotos.com/1469828/1559/i/450/depositphotos_15595841-stock-photo-hand-with-rice-field.jpg',
    'https://media.istockphoto.com/id/165646486/photo/rice-harvest.jpg?s=612x612&w=0&k=20&c=CMdTN8zAKiOzBVacLL9SDLv0DJVylKgjwoNDZ8Byy2o='
  ]


  useEffect(() => {
    const coll = collection(db, 'Products');

    const unSubscribe = onSnapshot(coll, snapshot => {
      setGetData1(
        snapshot.docs.map(doc => ({
          selecteduser: doc.data(),
        })),
      );
    });
    return () => {
      unSubscribe();
    };
  }, []);


  useEffect(() => {
    const user = auth.currentUser;
    const coll = collection(db, 'Signup');
    const q = query(coll, where('role', '==', "user"));

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
  }, []);



  // useEffect(() => {
  //     AsyncStorage.getItem("role").then((role)=>{
  //       if(role === "admin"){
  //         setuserflag(false)
  //         setloading(false)
  //       }
  //       else{
  //         setuserflag(true)
  //         setloading(false)
  //       }
  //     })
  // }, [])

  return (
    <>
      {
        loading ?
          <ActivityIndicator style={{ flex: 1, alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }} size={'large'} />
          :

          <>
            <View style={tw`flex-row self-center  w-85 mt-15 h-50 items-center justify-between`}>
              <View style={[{ backgroundColor: "#00a897" }, tw` flex flex-col items-center justify-around self-center h-50 w-38 rounded-3xl`]} >

                <View style={tw` h-20 w-40 justify-start self-start items-start left-5 rounded-md`}>
                  <Image
                    resizeMode='contain'
                    style={tw`h-19 w-19 rounded-lg `}
                    source={require("../../Images/aboutus.png")}
                  />
                </View>

                {/* // balance dev */}
                <View  >
                  <Text style={tw`text-xl font-medium text-gray-100 `}>
                    {"Who"}
                  </Text>
                  <Text style={tw`text-base font-medium text-gray-100  `}>
                    {"Are We? About Us"}
                  </Text>

                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Category")
                    }}
                  >
                    <Text style={tw`text-base underline font-medium text-green-500  `}>
                      {"Click Here"}
                    </Text>
                  </TouchableOpacity>

                </View>


                {/* graph  */}



              </View>

              <View style={[{ backgroundColor: "#00a897" }, tw` flex flex-col items-center justify-around self-center h-50 w-38 rounded-3xl`]} >


                <View style={tw` h-20 w-40 justify-start self-start items-start left-5 rounded-md`}>
                  <Image
                    resizeMode='contain'
                    style={tw`h-19 w-19 rounded-lg `}
                    source={require("../../Images/shahmukhi.png")}
                  />
                </View>

                {/* // balance dev */}
                <View style={tw` w-30`} >
                  <Text style={tw`text-xl font-medium text-gray-100 `}>
                    {"Everything"}
                  </Text>
                  <Text style={tw`text-base font-medium text-gray-100  `}>
                    {"About Shahmukhi"}
                  </Text>

                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Categories")
                    }}
                  >
                    <Text style={tw`text-base underline font-medium text-green-500  `}>
                      {"Click Here"}
                    </Text>
                  </TouchableOpacity>

                </View>


                {/* graph  */}



              </View>

            </View>

            <View style={tw`flex-row self-center  w-85 mt-10 h-50 items-center justify-between`}>
              <View style={[{ backgroundColor: "#00a897" }, tw` flex flex-col items-center justify-around self-center h-50 w-38 rounded-3xl`]} >

                <View style={tw` h-20 w-40 justify-start self-start items-start left-5 rounded-md`}>
                  <Image
                    resizeMode='contain'
                    style={tw`h-19 w-19 rounded-lg `}
                    source={require("../../Images/predictivemodelsg.png")}
                  />
                </View>

                {/* // balance dev */}
                <View  >
                  <Text style={tw`text-xl font-medium text-gray-100 `}>
                    {"Get"}
                  </Text>
                  <Text style={tw`text-base font-medium text-gray-100  `}>
                    {"Ready-To-Use Trained Models"}
                  </Text>

                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Category")
                    }}
                  >
                    <Text style={tw`text-base underline font-medium text-green-500  `}>
                      {"Click Here"}
                    </Text>
                  </TouchableOpacity>

                </View>


                {/* graph  */}



              </View>

              <View style={[{ backgroundColor: "#00a897" }, tw` flex flex-col items-center justify-around self-center h-50 w-38 rounded-3xl`]} >


                <View style={tw` h-20 w-40 justify-start self-start items-start left-5 rounded-md`}>
                  <Image
                    resizeMode='contain'
                    style={tw`h-19 w-19 rounded-lg `}
                    source={require("../../Images/analyticsg.png")}
                  />
                </View>

                {/* // balance dev */}
                <View style={tw` w-30`} >
                  <Text style={tw`text-xl font-medium text-gray-100 `}>
                    {"Get"}
                  </Text>
                  <Text style={tw`text-base font-medium text-gray-100  `}>
                    {"Ready-To-Use Dataset"}
                  </Text>

                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Categories")
                    }}
                  >
                    <Text style={tw`text-base underline font-medium text-green-500  `}>
                      {"Click Here"}
                    </Text>
                  </TouchableOpacity>

                </View>


                {/* graph  */}



              </View>

            </View>
          </>
      }
    </>

  );
};

export default Cbids;
