import { View, Text, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from "twrnc"
import LinearGradient from 'react-native-linear-gradient';
import { useIsFocused } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { app, db } from '../../Firebase';
import LottieView from 'lottie-react-native';



const Showbalance = () => {


  const auth = getAuth(app);
  const [GetData, setGetData] = useState([]);
  const [userflag, setuserflag] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    const coll = collection(db, 'Supplier');

    const unSubscribe = onSnapshot(coll, snapshot => {
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


  return (
    <>
      <LinearGradient colors={['#1E3A8A', '#00a897']} style={tw`top-10 flex flex-row items-center justify-around self-center h-35 w-85 rounded-xl`} >

        {/* // balance dev */}
        <View style={tw`w-50 left-3`} >
          <Text
            numberOfLines={4}
            style={tw`text-base   text-gray-100`}>
            Welcome To
          </Text>
          <Text
            numberOfLines={4}
            style={tw`text-base   text-gray-100`}>
            Shahamukhi Academia {'\n'}The Best App For Researcher
          </Text>
        </View>


        {/* graph  */}
        <View style={tw` h-30 w-30  justify-center self-center items-center rounded-md`}>
          <Image
            style={tw`h-29 w-30 rounded-lg `}
            resizeMode='contain'
            source={require("../../Images/languages.png")}
          />
        </View>


      </LinearGradient>



    </>
  )
}

export default Showbalance