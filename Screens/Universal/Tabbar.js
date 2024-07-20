import React from "react";
import { Image, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import tw from "twrnc"
import Supplier from "../Tabbar/Supplier";
import Home from "../Tabbar/Home";
import Profile from "../Tabbar/Profile";
import Product from "../Tabbar/Product";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Orders from "../Tabbar/Orders";
const Tab = createBottomTabNavigator();

function Tabbar() {

    const [uvisible, setuvisible] = React.useState(true);

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


    return (
        <Tab.Navigator

            screenOptions={{
                tabBarActiveTintColor: '#009688',  // Green color when focused
                tabBarInactiveTintColor: '#000000',  // Black color when not focused

                // tabBarBackground: () => (
                //     <View style={{flex:1, backgroundColor: 'white' }} />
                //   ),
                tabBarHideOnKeyboard: true,
                headerShown: false,
                tabBarStyle: {
                    // borderRadius: 40,
                    // marginBottom: 10,
                    // width: 300,
                    alignItems: 'center',
                    justifyContent: 'center',
                    // left: 30,
                    // right: 30,
                    // height: 60,
                    backgroundColor: 'white'
                    //  paddingBottom:20,
                    // position:'absolute'

                }
            }}>
            <Tab.Screen
                options={{

                    tabBarLabel: 'Home',
                    tabBarIcon: ({ focused }) => (
                        <Image style={tw`h-8 w-8`} source={focused ? require("../../Images/homeg.png") : require("../../Images/home.png")} />
                    ),
                }}
                name="Home"
                component={Home}
            />

            <Tab.Screen
                options={{

                    tabBarLabel: 'Models',
                    tabBarIcon: ({ focused }) => (
                        <Image style={tw`h-8 w-8`} source={focused ? require("../../Images/predictivemodelsgg.png") : require("../../Images/predictivemodels.png")} />
                    ),
                }}
                name="Models"
                component={Product}
            />


           
                    <Tab.Screen
                        name="Supplier"
                        // initialParams={{
                        //     suppliername: "",
                        //     suplierphone: "",
                        //     suppliercompany: "",
                        //     supplierid: "",
                        //     email: "",

                        // }}

                        listeners={({ navigation }) => ({
                            tabPress: (e) => {
                                // Prevent default behavior
                                e.preventDefault();

                                // Generate a new key to force re-render
                                navigation.navigate('Supplier', {
                                    suppliername: "",
                                    suplierphone: "",
                                    suppliercompany: "",
                                    supplierid: "",
                                    email: "",
                                });
                            },
                        })}
                        options={{

                            tabBarLabel: 'Datasets',
                            tabBarIcon: ({ focused }) => (
                                <Image style={tw`h-8 w-8`} source={focused ? require("../../Images/analyticsgg.png") : require("../../Images/analytics.png")} />
                            ),
                        }}
                        component={Supplier}
                    />

            




            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{

                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ focused }) => (
                        <Image style={tw`h-8 w-8`} source={focused ? require("../../Images/persong.png") : require("../../Images/person.png")} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default Tabbar;