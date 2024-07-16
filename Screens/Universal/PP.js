import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import Screensheader from '../../Screens/Universal/Screensheader';

const PP = ({navigation}) => {
  return (
    <SafeAreaView style={[{backgroundColor: '#FFFFFF'}]}>
      <Screensheader
        name={'Privacy Policy'}
        left={18}
        onPress={() => navigation.goBack()}
      />
      <ScrollView vertical showsVerticalScrollIndicator={true}>
        <View style={tw`items-start self-center flex-1`}>
          <Text style={tw`w-80 text-sm text-start pb-80 mt-10`}>
            Welcome to SupplySync! We are committed to protecting your privacy and
            ensuring the security of your personal information. This Privacy
            Policy explains how we collect, use, share, and protect your data
            when you use our application. Account Information:
            When you sign up , we may collect your name, email
            address, and other account details. Calendar and Data: We
            collect and store the tasks you create, including event
            titles, dates, locations, and descriptions. We take data security
            seriously and employ industry-standard measures to protect your
            information. However, no method of transmission or storage is 100%
            secure, and we cannot guarantee absolute security.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PP;
