// import React, { useState, useRef } from 'react';
// import { View, Text, Image, Button, StyleSheet, ScrollView } from 'react-native';
// import ViewShot from "react-native-view-shot";
// import Share from 'react-native-share';

// const App = () => {
//   const ref = useRef();
//   const [imageUri, setImageUri] = useState(null);

//   const dummyData = [
//     {
//       name: 'Product 1',
//       quantity: 5,
//       image: 'https://via.placeholder.com/150'
//     },
//     {
//       name: 'Product 2',
//       quantity: 3,
//       image: 'https://via.placeholder.com/150'
//     },
//     {
//       name: 'Product 3',
//       quantity: 2,
//       image: 'https://via.placeholder.com/150'
//     },
//     {
//       name: 'Product 4',
//       quantity: 4,
//       image: 'https://via.placeholder.com/150'
//     },
//     {
//       name: 'Product 5',
//       quantity: 1,
//       image: 'https://via.placeholder.com/150'
//     },
//     {
//       name: 'Product 6',
//       quantity: 6,
//       image: 'https://via.placeholder.com/150'
//     },
//     {
//       name: 'Product 7',
//       quantity: 7,
//       image: 'https://via.placeholder.com/150'
//     },
//     {
//       name: 'Product 8',
//       quantity: 8,
//       image: 'https://via.placeholder.com/150'
//     },
//     {
//       name: 'Product 9',
//       quantity: 9,
//       image: 'https://via.placeholder.com/150'
//     },
//     {
//       name: 'Product 10',
//       quantity: 10,
//       image: 'https://via.placeholder.com/150'
//     },
//   ];

//   const captureView = () => {
//     ref.current.capture().then(uri => {
//       console.log("Captured URI: ", uri);
//       setImageUri(uri);
//     }).catch(error => {
//       console.error("Capture failed", error);
//     });
//   };

//   const shareImage = () => {
//     if (imageUri) {
//       Share.open({
//         url: imageUri,
//         message: 'Check out this image',
//         social: Share.Social.WHATSAPP,
//       }).catch(err => console.log(err));
//     }
//   };

//   return (
//     <>
//       <ScrollView>
//         <ViewShot ref={ref} options={{ fileName: "Your-File-Name", format: "jpg", quality: 0.9 }}>
//           <View style={styles.captureArea}>
//             {dummyData.map((product, index) => (
//               <View key={index} style={styles.productContainer}>
//                 <Image source={{ uri: product.image }} style={styles.productImage} />
//                 <Text style={styles.productName}>{product.name}</Text>
//                 <Text style={styles.productQuantity}>Quantity: {product.quantity}</Text>
//               </View>
//             ))}
//           </View>
//         </ViewShot>
//         <Button title="Capture" onPress={captureView} />
//         <Button title="Share on WhatsApp" onPress={shareImage} />
//       </ScrollView>
//       {imageUri && (
//         <Image 
//           style={styles.capturedImage}
//           source={{ uri: imageUri }}
//         />
//       )}
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   captureArea: {
//     padding: 20,
//     margin: 20,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//   },
//   productContainer: {
//     flexDirection:'row',
//     marginBottom: 20,
//     alignItems: 'center',
//     justifyContent:'space-around'
//   },
//   productImage: {
//     width: 40,
//     height: 40,
//     marginBottom: 10,
//   },
//   productName: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   productQuantity: {
//     fontSize: 14,
//   },
//   capturedImage: {
//     height: 400,
//     width: '100%',
//     marginTop: 20,
//   }
// });

// export default App;



import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Navigation from './Screens/Universal/Navigation'
import Navigationwl from './Screens/Universal/Navigationwl'
import { AppProvider } from './AppContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

const App = () => {
  // const mobileid = DeviceInfo.getUniqueId();
  const [id, setid] = useState(false)
  const [flag, setflag] = useState(true)

  useEffect(() => {
    AsyncStorage.getItem("mobileid").then((id) => {
      if (id) {
           
          setid(true)
          setflag(false)

      }
      else {
       setid(false)
       setflag(false)
      }
    })
  }, [])
  return (
    <>
      {
        flag ? 
         <ActivityIndicator style={{flex:1, justifyContent:'center' , alignSelf:'center'}} size={'large'}/>
        :
        id ?
          <AppProvider>
            <Navigation />
          </AppProvider>
          :
          <AppProvider>
            <Navigationwl />
          </AppProvider>
      }

    </>
  )
}


export default App