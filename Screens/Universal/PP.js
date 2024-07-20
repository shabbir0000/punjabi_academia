import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import Screensheader from '../../Screens/Universal/Screensheader';

const PP = ({ navigation }) => {
  return (
    <SafeAreaView style={[{ backgroundColor: '#FFFFFF' }]}>
      <Screensheader
        name={'Privacy Policy'}
        left={18}
        onPress={() => navigation.goBack()}
      />
      <ScrollView vertical showsVerticalScrollIndicator={true}>
        <View style={tw`items-start self-center flex-1`}>
          <Text style={tw`w-80 text-sm text-start pb-40 mt-10`}>

            At Shahmukhi Academia, we are deeply committed to safeguarding your privacy and ensuring that your experience with our app is secure,
            trustworthy, and enriching. This Privacy Policy outlines how we collect, use,
            and protect your personal information when you use our app,
            with the primary goal of providing transparency and trust.
            We collect various types of information to enhance your user experience, including personal information you provide directly,
            such as your name and email address, and usage data automatically collected,
            such as your interactions with the app, time and date of visits, IP address, and device information.
            Cookies and similar tracking technologies are employed to improve functionality, remember your preferences, and analyze usage patterns.
            The information we collect is used to provide and improve our services, customize content, and enhance the overall user experience. 
            We also use your contact information to send updates, notifications, and promotional materials related to Shahmukhi Academia, with the option for you to opt out at any time. 
            Security is a top priority, and we implement robust technical and organizational measures to protect your personal information from unauthorized access, alteration, or disclosure. 
           
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PP;
