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

const Supplier = ({ navigation, }) => {

  useEffect(() => {
    requestStoragePermission();
  }, []);

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ]);

        if (
          granted[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] === PermissionsAndroid.RESULTS.GRANTED &&
          granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] === PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('Storage permissions granted');
        } else {
          console.log('Storage permissions denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

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
        name={'DATASETS'}
        left={20}
        onPress={() => navigation.goBack()}
      />
      <ScrollView vertical showsVerticalScrollIndicator={true}>
        <View style={tw`items-start self-center flex-1`}>
          <Text style={tw`w-80 text-sm text-start  mt-5`}>
            <Text style={tw`font-bold  text-xl`}>The Significance of Language and the Role of Punjabi Shahmukhi: </Text>

            Language is a fundamental aspect of human civilization, serving as a medium for communication, expression, and cultural preservation. It is through language that societies pass on knowledge, traditions, and values from one generation to the next. In the context of South Asia, the Punjabi language holds a significant place, being one of the most widely spoken languages in the region.

            Punjabi is primarily spoken in the Punjab regions of India and Pakistan. It is an Indo-Aryan language with a rich literary and cultural heritage. In Pakistan, Punjabi is written using the Shahmukhi script, which is a variant of the Persian script. The Shahmukhi script has historical importance and is integral to the identity of Punjabi speakers in Pakistan. It is used in various domains, including literature, journalism, and daily communication.
          </Text>
          <Image
            style={tw`h-60 w-80`}
            resizeMode='contain'
            source={require("../../Images/ld.jpg")}
          />
          <Text style={tw`w-80 text-sm text-start mt-5`}>
            <Text style={tw`font-bold  text-xl `}>{'\n'}The Importance of Shahmukhi in the Global Context </Text>

            {'\n'}
            Shahmukhi, while predominantly used in Pakistan, has a global significance. The Punjabi diaspora, which is spread across countries such as the United Kingdom, Canada, the United States, and Australia, continues to use Shahmukhi for literary and cultural purposes. This script serves as a vital link for the diaspora, connecting them to their roots and heritage. The preservation and promotion of Shahmukhi are crucial for maintaining the linguistic diversity of Punjabi and ensuring that future generations can access the rich literary traditions of their ancestors.

            <Text style={tw`font-bold  text-xl `}>{'\n'}Our Contribution: Building a Comprehensive Shahmukhi Dataset Bank</Text>

            {'\n'}
            In an effort to support research and promote the use of Shahmukhi, my team and I have developed a comprehensive dataset bank. This dataset bank is a valuable resource for linguists, researchers, and developers working on Shahmukhi and Punjabi language projects. We have meticulously collected, preprocessed, and categorized over 12,000 rows of data to make it ready for use in various models and research endeavors.
          </Text>
          <Image
            style={tw`h-40 w-80`}
            resizeMode='contain'
            source={require("../../Images/contibution.png")}
          />

          <Text style={tw`w-80 text-sm text-start pb-40 `}>
            <Text style={tw`font-bold  text-xl `}>{'\n'}Data Collection and Preprocessing</Text>

            {'\n'}Our data collection process involved sourcing information from diverse domains to ensure a well-rounded dataset. The data was then carefully preprocessed to enhance its quality and usability. This preprocessing involved cleaning the data, removing inconsistencies, and organizing it into meaningful categories. The categories we focused on include:

            {'\n'}1. Pakistan: This category includes data specific to the region of Pakistan, encompassing geographical information, cultural nuances, and socio-political contexts relevant to the Punjabi-speaking population.

            {'\n'}<Text onPress={() => copyFileToDownloads('Pakistan.xlsx')} style={tw`underline text-base text-green-400 `}>Click Here To Download The Dataset</Text> {'\n'}

            {'\n'}<Text onPress={() => copyFileToDownloads1('Pakistan.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')} style={tw`underline text-base text-green-400 `}>Click To Share The Dataset On Anywhere</Text> {'\n'}

            {'\n'}2. Actors: We have compiled information on actors from the Punjabi film and television industry. This includes biographical details, filmography, and notable achievements. This data is useful for researchers studying the influence of media on language and culture.

            {'\n'}<Text onPress={() => copyFileToDownloads('Actors.xlsx')} style={tw`underline text-base text-green-400 `}>Click Here To Download The Dataset</Text> {'\n'}

            {'\n'}<Text onPress={() => copyFileToDownloads1('Actors.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')} style={tw`underline text-base text-green-400 `}>Click To Share The Dataset On Anywhere</Text> {'\n'}

            {'\n'}3. Special Writing: This category features unique and specialized forms of writing in Shahmukhi, including classical literature, historical documents, and contemporary writings. It provides insights into the evolution of the script and its application in various literary genres.

            {'\n'}<Text onPress={() => copyFileToDownloads('special_writing.xlsx')} style={tw`underline text-base text-green-400 `}>Click Here To Download The Dataset</Text> {'\n'}

            {'\n'}<Text onPress={() => copyFileToDownloads1('special_writing.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')} style={tw`underline text-base text-green-400 `}>Click To Share The Dataset On Anywhere</Text> {'\n'}

            {'\n'}4. Poetry: Punjabi poetry, particularly in Shahmukhi, has a profound impact on the cultural landscape. Our dataset includes a wide range of poetic works, from traditional forms like qasidas and nazms to modern expressions. This is an invaluable resource for literary studies and comparative analyses.

            {'\n'}<Text onPress={() => copyFileToDownloads('Peotry.xlsx')} style={tw`underline text-base text-green-400 `}>Click Here To Download The Dataset</Text> {'\n'}

            {'\n'}<Text onPress={() => copyFileToDownloads1('Poetry.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')} style={tw`underline text-base text-green-400 `}>Click To Share The Dataset On Anywhere</Text> {'\n'}

            {'\n'}5. Ghazals: The ghazal is a poetic form that has been popular in South Asia for centuries. Our dataset includes a collection of Shahmukhi ghazals, highlighting their thematic diversity and stylistic variations. This data supports research in literary traditions and poetic forms.

            {'\n'}<Text onPress={() => copyFileToDownloads('today_talks.xlsx')} style={tw`underline text-base text-green-400 `}>Click Here To Download The Dataset</Text> {'\n'}

            {'\n'}<Text onPress={() => copyFileToDownloads1('today_talks.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')} style={tw`underline text-base text-green-400 `}>Click To Share The Dataset On Anywhere</Text> {'\n'}

            {'\n'}6. Random Facts: This category includes an assortment of interesting and lesser-known facts about the Punjabi language, culture, and history. These facts serve as a resource for educators, researchers, and anyone interested in the richness of Punjabi heritage.

            {'\n'}<Text onPress={() => copyFileToDownloads('random_facts.xlsx')} style={tw`underline text-base text-green-400 `}>Click Here To Download The Dataset</Text> {'\n'}

            {'\n'}<Text onPress={() => copyFileToDownloads1('random_facts.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')} style={tw`underline text-base text-green-400 `}>Click To Share The Dataset On Anywhere</Text> {'\n'}

            <Text style={tw`font-bold  text-xl `}>{'\n'}Advancing Research and Applications</Text>

            {'\n'}Our dataset bank is designed to facilitate a wide range of applications and research projects. By providing a structured and comprehensive resource, we aim to support the development of language models, natural language processing (NLP) tools, and other linguistic technologies tailored to Shahmukhi and Punjabi. Some potential applications include:

            {'\n'}- Machine Translation: Improving translation systems between Shahmukhi and other languages.
            {'\n'}- Text-to-Speech: Developing accurate text-to-speech systems for Shahmukhi.
            {'\n'}- Sentiment Analysis: Analyzing the sentiment of texts written in Shahmukhi.
            {'\n'}- Cultural Studies: Conducting in-depth studies on Punjabi culture and its literary traditions.
            {'\n'}<Text onPress={() => copyFileToDownloads('full_merged_file.xlsx')} style={tw`underline text-base text-green-400 `}>Click To Download The Full Dataset</Text> {'\n'}

            {'\n'}<Text onPress={() => copyFileToDownloads1('full_merged_file.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')} style={tw`underline text-base text-green-400 `}>Click To Share The Dataset On Anywhere</Text> {'\n'}
            <Text style={tw`font-bold  text-xl `}>{'\n'}Conclusion</Text>

            {'\n'}Language is a bridge that connects people, cultures, and histories. The Punjabi language, with its Shahmukhi script, is an essential part of South Asian heritage. Our efforts in building a comprehensive Shahmukhi dataset bank are aimed at preserving and promoting this script, enabling researchers and developers to explore its depths and applications.

            We are committed to continuous improvement and expansion of our dataset bank, ensuring that it remains a valuable resource for the global research community. By providing structured and high-quality data, we hope to contribute to the advancement of linguistic studies and the development of innovative technologies that honor and utilize the richness of the Shahmukhi script.

            In the digital age, where language technology is rapidly evolving, resources like our dataset bank play a crucial role in ensuring that lesser-known scripts and languages receive the attention and development they deserve. We invite researchers, developers, and enthusiasts to explore and utilize our dataset bank, contributing to the vibrant and diverse world of Punjabi language studies.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Supplier;

