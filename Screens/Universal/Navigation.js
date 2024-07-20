import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Auth/Login';
import Signup from '../Auth/Signup';
import Forget from '../Auth/Forget';
import WelcomeScreen from '../Auth/WelcomeScreen';
import Code from '../Auth/Code';
import Newpass from '../Auth/Newpass';
import Product from '../Tabbar/Product';
import Supplier from '../Tabbar/Supplier';
import Profile from '../Tabbar/Profile';
import Tabbar from './Tabbar';
import Addproduct from '../ProductsAndCat/Addproduct';
import PP from './PP';
import Viewcat from '../ProductsAndCat/Viewcatproduct';
import Vieworder from '../Order/Vieworder';
import Orders from '../Tabbar/Orders';
import Updateprofile from '../../Component/Profile/Updateprofile';
import Viewsupplierorder from '../Order/Viewsupplierorder';
import Shareorder from '../Order/Shareorder';
import Preprocessscript from '../../Component/Models/Preprocessscript';
import preprocessmodels from '../../Component/Models/Preprocessmodels';
import Trainedmodel from '../../Component/Models/Trainedmodel';
import Aboutshahmukhi from '../../Component/Models/Aboutshahmukhi';
import Aboutus from '../../Component/Models/Aboutus';
import Showoptionscreen from '../../Component/Models/Showoptionscreen';

// import Home from '../Bottomtabs/Home';
// import Tabbar from './Tabbar';
// import Changepass from '../../Components/Setting/Changepass';
// import Sendfeedback from '../../Components/Setting/Sendfeedback';
// import Tou from '../../Components/Setting/Tou';
// import PP from '../../Components/Setting/PP';
// import Orders from '../Bottomtabs/Orders';
// import Upload from '../Bottomtabs/Upload';
// import Addproduct from '../ProductsAndCat/Addproduct';
// import Viewproduct from '../ProductsAndCat/Viewproduct';
// import Addcat from '../ProductsAndCat/Addcat';
// import Viewcat from '../ProductsAndCat/Viewcat';
// import Viewcatproduct from '../ProductsAndCat/Viewcatproduct';
// import Productdetail from '../ProductsAndCat/Productdetail';
// import Vieworder from '../Order/Vieworder';


const Stack = createNativeStackNavigator();


function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Tabbar' screenOptions={{
        headerShown: false,

      }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Forget" component={Forget} />
        <Stack.Screen name="Code" component={Code} />
        <Stack.Screen name="Newpass" component={Newpass} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="Models" component={Product} />
        <Stack.Screen name="Supplier" component={Supplier} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Tabbar" component={Tabbar} />
        <Stack.Screen name='Addproduct' component={Addproduct} />
        <Stack.Screen name='PP' component={PP} />
        <Stack.Screen name='Viewproduct' component={Viewcat} />
        <Stack.Screen name="Vieworder" component={Vieworder} />
        <Stack.Screen name="Orders" component={Orders} />
        <Stack.Screen name="Updateprofile" component={Updateprofile} />
        <Stack.Screen name="Viewsupplierorder" component={Viewsupplierorder} />
        <Stack.Screen name="Shareorder" component={Shareorder} />
        <Stack.Screen name="Preprocessscript" component={Preprocessscript} />
        <Stack.Screen name="Preprocessmodels" component={preprocessmodels} />
        <Stack.Screen name="Trainedmodel" component={Trainedmodel} />
        <Stack.Screen name="Aboutshahmukhi" component={Aboutshahmukhi} />
        <Stack.Screen name="Aboutus" component={Aboutus} />
        <Stack.Screen name="Showoptionscreen" component={Showoptionscreen} />
        
        
        
        {/* <Stack.Screen name="Viewcatproduct" component={Viewcatproduct} /> */}
        {/* <Stack.Screen options={{
           cardStyle: { backgroundColor: '#fffff' }
        }} name="Home" component={Home} /> */}
        {/* <Stack.Screen name="Tabbar" component={Tabbar} />
        <Stack.Screen name="Orders" component={Vieworder} />
        <Stack.Screen name="Productdetail" component={Productdetail} />
        <Stack.Screen name='Changepass' component={Changepass} />
        <Stack.Screen name='Sendfeedback' component={Sendfeedback} />
        <Stack.Screen name='TOU' component={Tou} />
        <Stack.Screen name='PP' component={PP} />
        <Stack.Screen name='ORDER' component={Orders} />
        <Stack.Screen name='Product' component={Upload} />
        <Stack.Screen name='Addproduct' component={Addproduct} />
        <Stack.Screen name='Viewproduct' component={Viewproduct} />
        <Stack.Screen name='Addcat' component={Addcat} />
        <Stack.Screen name='Viewcat' component={Viewcat} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;