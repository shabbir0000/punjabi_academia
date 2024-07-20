import {View, Text, ScrollView, BackHandler, Alert} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import Menuchatbar from '../../Component/Home/Menuchatbar';
import Showbalance from '../../Component/Home/Showbalance';
import tw from 'twrnc';
import {useFocusEffect} from '@react-navigation/native';
import Cbids from '../../Component/Home/Cbids';

const Home = ({navigation,route}) => {
 
  // const [userflag, setuserflag] = useState(true);

  

  // const backAction = () => {
  //   if (flag) {
  //     Alert.alert('Hold on!', 'Are you sure you want Exit?', [
  //       {
  //         text: 'Cancel',
  //         onPress: () => null,
  //         style: 'cancel',
  //       },
  //       {text: 'YES', onPress: () => BackHandler.exitApp()},
  //     ]);
  //     return true;
  //   } else {
  //     setflag(false);
  //   }
  // };

  // useBackHandler(backAction);

  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        handleBackButtonPress,
      );

      return () => backHandler.remove();
    }, []),
  );

  const handleBackButtonPress = () => {
    Alert.alert(
      'Exit App',
      'Are you sure you want to exit?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            BackHandler.exitApp();
          },
        },
      ],
      {cancelable: false},
    );
    return true; // Prevent default back button behavior
  };

  return (
    <>
      <View style={[tw`flex flex-1`, {backgroundColor: '#F3F4F6'}]}>
        <Menuchatbar navigation={navigation} />
        <Showbalance   />


         <Cbids navigation={navigation} />
      </View>
    </>
  );
};

export default Home;
