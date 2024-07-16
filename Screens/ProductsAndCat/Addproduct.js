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
} from 'react-native';
import React, { useEffect, useReducer, useRef, useMemo, useState, useCallback, useContext } from 'react';
// import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import RadioGroup from 'react-native-radio-buttons-group';
import tw from 'twrnc';
import { Error, Input1, showToast } from '../../Screens/Universal/Input';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Screensheader from '../../Screens/Universal//Screensheader';
import LinearGradient from 'react-native-linear-gradient';
import { Dropdown } from 'react-native-element-dropdown';
import storage from '@react-native-firebase/storage';
import { ref1, app, db } from '../../Firebase';
import {
  arrayUnion,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
  collection,
  where,
  onSnapshot,
} from 'firebase/firestore';

import {
  ref,
  uploadBytesResumable,
  listAll,
  getDownloadURL,
} from 'firebase/storage';
import {
  getDatabase,
  set,
  onValue,
  orderByChild,
  query,
  startAt,
  endAt,
} from 'firebase/database';
import FilePicker from 'react-native-document-picker';
import uuid from 'react-native-uuid';
import { getAuth } from 'firebase/auth';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { Buttonnormal } from '../Universal/Buttons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../../AppContext';
import Toast from 'react-native-toast-message';

const Addproduct = ({ navigation, route }) => {
  const { cat } = useContext(AppContext);
  const { url, pname, pid } = route.params;

  const [selectedId, setSelectedId] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  console.log("public", selectedId);
  const showModal = () => {
    setModalVisible(true);
  };
  const [loading, setloading] = useState(false);

  //for image
  const [imglink1, setimglink1] = useState(null);
  const [name1, setimgname1] = useState(null);
  const [type1, setimgtype1] = useState(null);
  const [filedata1, setfiledata1] = useState(url);
  const [user, setuser] = useState(null);

  const videoref = useRef();
  const userid = uuid.v4();


  const Validation = Yup.object().shape({
    productname: Yup.string().required('Must be filled'),
  });


  // useEffect(() => {
  //   const users = user.currentUser;
  //   const coll = collection(db, 'Profile');
  //   const q = query(coll, where('email', '==', users.email));

  //   const unSubscribe = onSnapshot(q, snapshot => {
  //     setGetData(
  //       snapshot.docs.map(doc => ({
  //         selecteduser: doc.data(),
  //       })),
  //     );
  //   });
  //   return () => {
  //     unSubscribe();
  //   };
  // }, [isFocused]);


  //  console.log("following :",GetData[0].selecteduser.following);


  useFocusEffect(
    useCallback(() => {

      AsyncStorage.getItem('email').then((email) => {
        setuser(email);
      });
      return () => {

      };
    }, [])

  );

  const choosefileimg = async () => {
    try {
      const res = await FilePicker.pickSingle({
        presentationStyle: 'overFullScreen',
        copyTo: 'cachesDirectory',
        type: [FilePicker.types.images],
      });
      // if (res.size / 1000 / 1000 <= 5.0) {
      setfiledata1(res.uri);
      console.log(res.size / 1000 / 1000);
      console.log(res.uri);
      const path = res.fileCopyUri.replace('file://', '');
      setimglink1(path);
      setimgname1(res.name);
      setimgtype1(res.type);
    } catch (error) {
      if (FilePicker.isCancel(error)) {
        console.log('user cancel the pick file');
      } else {
        console.log('errror', error);
      }
    }
  };

  const uploadfile = async (productname) => {
    if (!imglink1 || !name1) {
      showToast("error", "Error", "Please Select The Image First", true, 3000)
    }
    else {
      try {
        showModal;
        setloading(true);
        const reference = storage().ref(`allfiles/${name1}`);
        await reference.putFile(imglink1);
        const url = await storage().ref(`allfiles/${name1}`).getDownloadURL();
        console.log('your file is locating :', url);
        Uploadata(productname, url);
      }
      catch (error) {
        showModal;
        setloading(false);
        console.log("Error :", error);
      }
    }
  };

  const Uploadata = async (productname, uploadedurlimg) => {
    setDoc(doc(db, 'Products', userid), {
      id: userid,
      productname: productname,
      suppliername: cat,
      imagelink: uploadedurlimg,
      email: user,
    })
      .then(() => {
        console.log('done');
        setloading(false);
        Alert.alert('Congratulation', 'Product Has Been Uploaded', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      })
      .catch(error => {
        setloading(false);
        Alert.alert('this :', error.message);
      });
  };


  const uploadupdatefile = async (productname) => {
    if (filedata1.startsWith('file://') || filedata1.startsWith('content://')) {
      showModal;
      setloading(true);
      const reference = storage().ref(`allfiles/${name1}`);
      await reference.putFile(imglink1);
      const url = await storage().ref(`allfiles/${name1}`).getDownloadURL();
      console.log('your file is locating :', url);
      Uploaupdatedata(productname, url);
    }
    else {
      try {
        showModal;
        setloading(true);
        Uploaupdatedata(productname, url);
      }
      catch (error) {
        showModal;
        setloading(false);
        console.log("Error :", error);
      }
    }
  };

  const Uploaupdatedata = async (productname, uploadedurlimg) => {

    updateDoc(doc(db, 'Products', pid), {
      id: pid,
      productname: productname,
      suppliername: cat,
      imagelink: uploadedurlimg,
      email: user,
      // friends : selectedId === "yes" ? GetData[0].selecteduser.following : []
    })
      .then(() => {
        console.log('done');
        setloading(false);
        Alert.alert('Congratulation', 'Product Has Been Updated', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      })
      .catch(error => {
        setloading(false);
        Alert.alert('this :', error.message);
      });
  };


  return (
    <>
      {loading ? (
        <>
          <View style={tw`mt-50 self-center items-center`}>
            <Text style={tw`w-80 text-center text-lg`}>
              Please Wait. Upload Time Depend On Your Data Size...
            </Text>

            <ActivityIndicator
              style={tw`mt-10 bg-transparent`}
              size="large"
              color="#199A8E"
            />
            <Text style={tw`text-blue-400 font-extrabold text-2xl my-10`}>
              Uploading ....
            </Text>
          </View>
        </>
      ) : (
        <>
          <View style={[tw`flex-1 flex`, { backgroundColor: '#FFFFFF' }]}>
            <>
              <Formik
                initialValues={{
                  productname: pname
                }}
                validationSchema={Validation}
                onSubmit={(values, { resetForm }) => {
                  if (pid) {
                    uploadupdatefile(
                      values.productname,
                    )
                  }
                  else {
                    uploadfile(
                      values.productname,
                    );

                  }


                  //  resetForm({values: ''});
                  //   navigation.navigate("Videoview")
                }}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  errors,
                  touched,
                  values,
                  isValid,
                }) => (
                  <SafeAreaView>
                    <ScrollView vertical showsVerticalScrollIndicator={true}>
                      <View style={tw`h-180`}>
                        <Screensheader
                          name={'Upload Your Product'}
                          left={10}
                          onPress={() => navigation.goBack()}
                        />

                        <View style={tw`left-5 mt-4 `}>
                          <Text style={tw`font-bold text-lg`}>
                            Add Details For Your Product
                          </Text>
                          <Text style={tw`font-thin text-sm w-80`}>
                            Add Image, And Fill All Field
                          </Text>
                        </View>

                        <View
                          style={tw`flex flex-col w-80 self-center justify-around`}>
                          <TouchableOpacity onPress={() => choosefileimg()}>
                            <View
                              style={tw`flex w-80 items-center  mt-5 flex-col`}>
                              <View
                                style={tw`  h-50 border-2 rounded-md w-70 items-center border-dotted`}>
                                {filedata1 && (
                                  <Image
                                    source={{
                                      uri: filedata1,
                                    }}
                                    resizeMode='contain'
                                    style={tw`h-full w-60 rounded-lg`}
                                  />
                                )}
                              </View>
                              <View style={tw`mt-2 items-center`}>
                                <Text style={tw`font-bold  `}>
                                  Add Product Thumbnail
                                </Text>
                                <Text style={tw`text-xs  `}>Max 5mb</Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>

                        <View style={tw` self-center  h-70`}>
                          <View style={tw`top-5`}>
                            <Input1
                              placeholder="Add Product Name"
                              onchangetext={handleChange('productname')}
                              onblur={handleBlur('productname')}
                              value={values.productname}
                              error={touched.productname ? errors.productname : false}
                            />
                          </View>

                          <View style={tw`top-5`}>
                            <Input1
                              placeholder={cat}
                              edit={false}
                            />
                          </View>



                          <View style={tw`mt-10`}>
                            <Buttonnormal
                              onPress={handleSubmit}
                              c1={'#199A8E'}
                              c2={'#199A8E'}
                              style={tw`text-white`}
                              title={pid ? "UPDATE PRODUCT" : "UPLOAD PRODUCT"}
                            />
                          </View>
                        </View>
                      </View>
                    </ScrollView>
                  </SafeAreaView>
                )}
              </Formik>
            </>
          </View>
          <Toast />
        </>
      )}
    </>
  );
};

export default Addproduct;

var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
