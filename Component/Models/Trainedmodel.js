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

const Trainedmodel = ({ navigation }) => {
  const copyFileToDownloads = async (fileName) => {
    try {
      const { fs } = RNFetchBlob;
      const assetFilePath = Platform.OS === 'android' ? `bundle-assets://${fileName}` : `${fs.dirs.MainBundleDir}/${fileName}`;
      const downloadPath = `${fs.dirs.DownloadDir}/${fileName}`;

      await fs.cp(assetFilePath, downloadPath);

      // Alert.alert('Download Success', `File Path ${downloadPath}`);
      Alert.alert('Dowload Sucesss', 'Do You Want To Open File', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK', onPress: () => {
            FileViewer.open(downloadPath) // absolute-path-to-my-local-file.
              .then(() => {
              })
              .catch((error) => {
                Alert.alert('Download Error', error.message);
              });
          }
        },
      ]);

    } catch (error) {
      console.log('Error copying file: ', error.message);
      Alert.alert('Download Error', error.message);
    }
  };

  const copyFileToDownloads1 = async (fileName, mimeType) => {
    try {
      const { fs } = RNFetchBlob;
      const assetFilePath = Platform.OS === 'android' ? `bundle-assets://${fileName}` : `${fs.dirs.MainBundleDir}/${fileName}`;
      const downloadPath = `${fs.dirs.DownloadDir}/${fileName}`;

      await fs.cp(assetFilePath, downloadPath);

      // Alert.alert('Download Success', `File Path ${downloadPath}`);
      try {
        await Share.open({
          url: `file://${downloadPath}`,
          type: mimeType, // Adjust based on your file type
          title: 'Share File',
        });
      } catch (error) {
        console.log('Error sharing file:', error.message);
        Alert.alert('Cancel', 'Failed to share file.');
      }

    } catch (error) {
      console.log('Error copying file: ', error.message);
      Alert.alert('Download Error', error.message);
    }
  };

  return (
    <SafeAreaView style={[{ backgroundColor: '#FFFFFF' }]}>
      <Screensheader
        name={'Trained Model'}
        left={15}
        onPress={() => navigation.goBack()}
      />
      <Image
        style={tw`h-60 w-80 absolute self-center mt-65`}
        resizeMode='contain'
        source={require("../../Images/ai-cloud.png")}
      />
      <ScrollView vertical showsVerticalScrollIndicator={true}>
        <View style={tw`items-start self-center flex-1`}>
          <Text style={tw`w-80 text-sm text-start  mt-5`}>
            <Text style={tw`font-bold  text-xl`}>Understanding Classification Models in Machine Learning: </Text> {'\n'}
            In the realm of machine learning, a model is a mathematical representation that is trained to recognize patterns in data. This training involves feeding the model large amounts of data and allowing it to learn the underlying structure and relationships. Once trained, the model can make predictions or classify new, unseen data based on what it has learned. Models are crucial in various applications, from predicting stock prices to classifying emails as spam or not spam
          </Text>

          <Text style={tw`w-80 text-sm text-start mt-5`}>
            <Text style={tw`font-bold  text-xl `}>The Importance of Classification Models  {'\n'}</Text>


            Classification models are a subset of machine learning models that are used to categorize data into predefined classes or groups. These models are essential for tasks such as medical diagnosis, sentiment analysis, fraud detection, and many others. They help in making informed decisions by predicting the category or class of new data points.
            <Text style={tw`font-bold  text-xl `}>{'\n'}Our Project: Building and Training Classification Models</Text>

            {'\n'}
            Recognizing the importance of robust classification models, my team and I embarked on a project to build and train six different classification models using a dataset comprising 12,000 rows of data. The models we developed include Naive Bayes, Linear Regression, Polynomial Regression, Logistic Regression, K-Nearest Neighbors (KNN), and Random Forest. Each of these models has unique characteristics and applications, making them suitable for different types of classification problems.
            {'\n'}
          </Text>
          <Image
            style={tw`h-60 w-80 mt-5`}
            resizeMode='contain'
            source={require("../../Images/models.png")}
          />
          <Text style={tw`w-80 text-sm text-start pb-40 `}>
            <Text style={tw`font-bold  text-xl `}>{'\n'}The Six Classification Modelss</Text>


            <Text style={tw`font-bold  text-base `}>{'\n'}Naive Bayes</Text>

            {'\n'}
            Purpose and Description:
            {'\n'}
            Naive Bayes is a probabilistic classifier based on Bayes' theorem, which assumes independence between the features. Despite its simplicity, it performs surprisingly well for many real-world tasks, especially text classification and spam filtering.

            {'\n'}<Text onPress={() => copyFileToDownloads('naive_bayes_model.joblib')} style={[tw`underline text-base `, { color: '#14B8A6' }]}>Click To Download The Model</Text> {'\n'}

            {'\n'}<Text onPress={() => copyFileToDownloads1('naive_bayes_model.joblib', 'application/octet-stream')} style={[tw`underline text-base `, { color: '#14B8A6' }]}>Click To Share The Model On Anywhere</Text> {'\n'}

            <Text style={tw`font-bold  text-base `}>{'\n'}Linear Regression</Text>

            {'\n'}
            Purpose and Description:
            {'\n'}
            Linear Regression is traditionally used for regression tasks but can be adapted for classification. It models the relationship between the input features and the target variable as a linear function.
            {'\n'}
            {'\n'}<Text onPress={() => copyFileToDownloads('lr_model.joblib')} style={[tw`underline text-base `, { color: '#14B8A6' }]}>Click To Download The Model</Text> {'\n'}

            {'\n'}<Text onPress={() => copyFileToDownloads1('lr_model.joblib', 'application/octet-stream')} style={[tw`underline text-base `, { color: '#14B8A6' }]}>Click To Share The Model On Anywhere</Text> {'\n'}


            <Text style={tw`font-bold  text-base `}>{'\n'}Polynomial Regression</Text>

            {'\n'}
            Purpose and Description:
            {'\n'}
            Polynomial Regression extends Linear Regression by considering polynomial features of the input data. This allows it to model non-linear relationships more effectively.
            {'\n'}

            {'\n'}<Text onPress={() => copyFileToDownloads('poly_sgd_model.joblib')} style={[tw`underline text-base `, { color: '#14B8A6' }]}>Click To Download The Model</Text> {'\n'}

            {'\n'}<Text onPress={() => copyFileToDownloads1('poly_sgd_model.joblib', 'application/octet-stream')} style={[tw`underline text-base `, { color: '#14B8A6' }]}>Click To Share The Model On Anywhere</Text> {'\n'}


            <Text style={tw`font-bold  text-base `}>{'\n'}Logistic Regression</Text>

            {'\n'}
            Purpose and Description:
            {'\n'}
            Logistic Regression is a widely used classification algorithm that models the probability of a binary outcome based on one or more input features. It uses the logistic function to convert the linear combination of features into a probability.
            {'\n'}

            {'\n'}<Text onPress={() => copyFileToDownloads('logistic_reg_model.joblib')} style={[tw`underline text-base `, { color: '#14B8A6' }]}>Click To Download The Model</Text> {'\n'}

            {'\n'}<Text onPress={() => copyFileToDownloads1('logistic_reg_model.joblib', 'application/octet-stream')} style={[tw`underline text-base `, { color: '#14B8A6' }]}>Click To Share The Model On Anywhere</Text> {'\n'}


            <Text style={tw`font-bold  text-base `}>{'\n'}K-Nearest Neighbors (KNN)</Text>

            {'\n'}
            Purpose and Description:
            {'\n'}
            KNN is a non-parametric, instance-based learning algorithm. It classifies a data point based on the majority class among its k-nearest neighbors in the feature space.

            {'\n'}

            {'\n'}<Text onPress={() => copyFileToDownloads('knn_model.joblib')} style={[tw`underline text-base `, { color: '#14B8A6' }]}>Click To Download The Model</Text> {'\n'}

            {'\n'}<Text onPress={() => copyFileToDownloads1('knn_model.joblib', 'application/octet-stream')} style={[tw`underline text-base `, { color: '#14B8A6' }]}>Click To Share The Model On Anywhere</Text> {'\n'}




            <Text style={tw`font-bold  text-base `}>{'\n'}Random Forest</Text>

            {'\n'}
            Purpose and Description:
            {'\n'}
            Random Forest is an ensemble learning method that constructs multiple decision trees during training and outputs the mode of the classes (classification) or mean prediction (regression) of the individual trees.
            {'\n'}<Text onPress={() => copyFileToDownloads('rf_model.joblib')} style={[tw`underline text-base `, { color: '#14B8A6' }]}>Click To Download The Model</Text> {'\n'}

            {'\n'}<Text onPress={() => copyFileToDownloads1('rf_model.joblib', 'application/octet-stream')} style={[tw`underline text-base `, { color: '#14B8A6' }]}>Click To Share The Model On Anywhere</Text> {'\n'}

            <Text style={tw`font-bold  text-xl `}>{'\n'}Conclusion</Text>

            {'\n'}
            Building and training these six classification models provided us with a comprehensive understanding of their capabilities and applications. Each model has its unique advantages, making them suitable for different types of classification problems. By leveraging a dataset of 12,000 rows, we ensured that our models were well-trained and ready for practical use in research and development.
            {'\n'}
            Our project underscores the importance of using diverse models to tackle classification tasks, particularly when dealing with rare and complex datasets like those involving the Shahmukhi script. By continuing to refine these models and exploring new approaches, we aim to contribute valuable insights and tools to the field of machine learning and data science.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Trainedmodel