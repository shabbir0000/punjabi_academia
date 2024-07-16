import { View, Text, Image,Alert } from 'react-native'
import React ,{useEffect,useState} from 'react'
import tw from "twrnc"
import LinearGradient from 'react-native-linear-gradient';
import { useIsFocused } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { app, db } from '../../Firebase';



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
        <LinearGradient colors={['#199A8E', '#00a897']} style={tw`top-10 flex flex-row items-center justify-center self-center h-35 w-85 rounded-xl`} >



            {/* // balance dev */}
            <View style={tw`w-45`} >
                <Text 
                // numberOfLines={1}
                style={tw`text-xl   text-gray-100`}>
                    Welcome To Shahamukhi Academia The Best App For Researcher 
                </Text>
                {/* <Text style={tw`text-4xl text-center  font-bold text-white`}>
                      {GetData.length}
                </Text> */}
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