import { View, Text, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import tw from "twrnc"
import { Input, showToast } from '../Universal/Input'
// import CheckBox from '@react-native-community/checkbox';
import { Buttonnormal } from '../Universal/Buttons';
import Screensheader from '../Universal/Screensheader';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { app } from '../../Firebase'
import Toast from 'react-native-toast-message'

const Forget = ({ navigation }) => {

  const [customerflag, setcustomerflag] = useState(true)
  const [customerflag1, setcustomerflag1] = useState(false)
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const [email, setemail] = useState("");

  const auth = getAuth(app);

  const RESETemail = async () => {

    email ?
      (
        sendPasswordResetEmail(auth, email)
          .then(() => {
            // Alert.alert("RESET EMAIL SEND IN YOUR SPAM SECTION IN EMAIL BOX"),


            Alert.alert('Success', 'RESET EMAIL SEND IN YOUR SPAM SECTION IN EMAIL BOX', [

              { text: 'OK', onPress: () => navigation.navigate("Login") },
            ]);
          })
          .catch((error) => {

            Alert.alert("some error", error.message);
          })
      )
      :
      (
        showToast("error", "Error", "Please Fill The Email", true, 3000)
      )
  }

  return (
    <>

      <View style={tw` bg-slate-50 flex-1  `}>
        <Screensheader
          // name={"Signup"}
          // left={25}
          onPress={() => (
            navigation.goBack()
          )}
        />
        <View style={tw`items-center`}>
          <View style={tw`w-80 h-20 items-start justify-center mt-5`}>
            <Text style={[tw`text-3xl font-bold text-gray-400`, { color: '#199A8E' }]}>
              Forget Your Password?
            </Text>
            <Text style={[tw`text-sm font-normal text-gray-400`, { color: '#199A8E' }]}>
              Enter Your Email We Will Send You A Code
            </Text>
          </View>


          <View style={tw`mt-10`}>
            <Input
              value={email}
              onchangetext={setemail}
              source={require("../../Images/mail.png")}
              placeholder={"Enter Your Email"}
            />




            <View style={tw` justify-between w-80 h-15 mt-5 `}>
              <Buttonnormal
                onPress={() => {
                  // navigation.navigate('Code')
                  RESETemail()
                }}
                c1={'#199A8E'}
                c2={'#199A8E'}
                style={tw`text-white`}
                title={"SEND CODE"}
              />



            </View>
          </View>

        </View>
        <Toast />
      </View>
    </>
  )
}

export default Forget