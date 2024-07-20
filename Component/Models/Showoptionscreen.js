import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    Image,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    StyleSheet,
    Platform,
    PermissionsAndroid,
} from 'react-native';
import React, { useEffect, useReducer, useRef, useMemo, useState, useCallback } from 'react';
import tw from 'twrnc';
import { Error, Input1, showToast } from '../../Screens/Universal/Input';
import Screensheader from '../../Screens/Universal//Screensheader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';
import FileViewer from "react-native-file-viewer";
import Share from 'react-native-share';
const Showoptionscreen = ({ navigation }) => {
    return (
        <SafeAreaView style={[tw`flex-1`, { backgroundColor: '#FFFFFF' }]}>
            <Screensheader
                name={'Choose Screen'}
                left={15}
                onPress={() => navigation.goBack()}
            />
            <Image
                style={tw`h-60 w-80 self-center absolute mt-65`}
                resizeMode='contain'
                source={require("../../Images/scriptl.png")}
            />

            <View style={tw` h-4/5 w-80 border-black flex-col justify-around items-center self-center`}>



                <View style={[{ backgroundColor: "#1E3A8A" }, tw` flex flex-col items-start h-40 w-70 justify-around self-center  rounded-3xl`]} >

                    <View style={tw` h-15 w-60 mt-1 flex-row justify-around self-center items-start  rounded-md`}>

                        <View style={tw`items-start justify-end h-14 w-30`}>
                            <Text style={tw`text-xl text-center font-medium text-gray-100 `}>
                                {"GET"}
                            </Text>
                        </View>
                        <Image
                            resizeMode='contain'
                            style={tw`h-14 w-30 self-end justify-end `}
                            source={require("../../Images/aboutus.png")}
                        />
                    </View>

                    {/* // balance dev */}
                    <View style={tw`self-center h-25 w-60 items-start`} >

                        <Text numberOfLines={2} style={tw`text-base font-medium text-gray-100  `}>
                            {"Ready-To-Use Preproceesing CBOW Model"}
                        </Text>

                        <TouchableOpacity
                            onPress={() => {
                            
                                navigation.navigate("Preprocessscript")
                            }}
                        >
                            <Text style={[tw`text-base underline font-medium `, { color: '#14B8A6' }]}>
                                {"Click Here"}
                            </Text>
                        </TouchableOpacity>

                    </View>


                    {/* graph  */}



                </View>


                <View style={[{ backgroundColor: "#1E3A8A" }, tw` flex flex-col items-start h-40 w-70 justify-around self-center  rounded-3xl`]} >

                    <View style={tw` h-15 w-60 mt-1 flex-row justify-around self-center items-start  rounded-md`}>

                        <View style={tw`items-start justify-end h-14 w-30`}>
                            <Text style={tw`text-xl text-center font-medium text-gray-100 `}>
                                {"GET"}
                            </Text>
                        </View>
                        <Image
                            resizeMode='contain'
                            style={tw`h-14 w-30 self-end justify-end `}
                            source={require("../../Images/script.png")}
                        />
                    </View>

                    {/* // balance dev */}
                    <View style={tw`self-center h-25 w-60 items-start`} >

                        <Text numberOfLines={2} style={tw`text-base font-medium text-gray-100  `}>
                            {"Ready-To-Use Scripts For Preprocessing"}
                        </Text>

                        <TouchableOpacity
                            onPress={() => {
                              
                                navigation.navigate("Preprocessmodels")
                            }}
                        >
                            <Text style={[tw`text-base underline font-medium `, { color: '#14B8A6' }]}>
                                {"Click Here"}
                            </Text>
                        </TouchableOpacity>

                    </View>


                    {/* graph  */}



                </View>


                <View style={[{ backgroundColor: "#1E3A8A" }, tw` flex flex-col items-start h-40 w-70 justify-around self-center  rounded-3xl`]} >

                    <View style={tw` h-15 w-60 mt-1 flex-row justify-around self-center items-start  rounded-md`}>

                        <View style={tw`items-start justify-end h-14 w-30`}>
                            <Text style={tw`text-xl text-center font-medium text-gray-100 `}>
                                {"GET"}
                            </Text>
                        </View>
                        <Image
                            resizeMode='contain'
                            style={tw`h-14 w-30 self-end justify-end `}
                            source={require("../../Images/ai.png")}
                        />
                    </View>

                    {/* // balance dev */}
                    <View style={tw`self-center h-25 w-60 items-start`} >

                        <Text numberOfLines={2} style={tw`text-base font-medium text-gray-100  `}>
                            {"Ready-To-Run Trained 6 Model CodesFiles"}
                        </Text>

                        <TouchableOpacity
                            onPress={() => {
                               
                                navigation.navigate("Trainedmodel")
                            }}
                        >
                            <Text style={[tw`text-base underline font-medium `, { color: '#14B8A6' }]}>
                                {"Click Here"}
                            </Text>
                        </TouchableOpacity>

                    </View>


                    {/* graph  */}



                </View>




            </View>

        </SafeAreaView>
    )
}

export default Showoptionscreen