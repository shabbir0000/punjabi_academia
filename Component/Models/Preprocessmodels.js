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

const Preprocessmodels = ({ navigation }) => {

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
                name={'Data Filtering Script'}
                left={10}
                onPress={() => navigation.navigate("Home")}
            />
            <Image
                style={tw`h-60 w-80 self-center absolute mt-65`}
                resizeMode='contain'
                source={require("../../Images/scriptl.png")}
            />
            <ScrollView vertical showsVerticalScrollIndicator={true}>
                <View style={tw`items-start self-center flex-1`}>
                    <Text style={tw`w-80 text-sm text-start  mt-5`}>
                        <Text style={tw`font-bold  text-xl`}>The Role of Python Scripts in Data Preprocessing: </Text> {'\n'}
                        Python scripts are a powerful and flexible way to automate tasks, especially when dealing with large datasets. A script is essentially a file containing a sequence of instructions that the Python interpreter can execute. Scripts are invaluable for data preprocessing, a crucial step in preparing data for analysis. This is particularly true for rare datasets, such as those involving the Shahmukhi script, which require specialized handling due to their scarcity and unique characteristics.    </Text>

                    <Text style={tw`w-80 text-sm text-start mt-5`}>
                        <Text style={tw`font-bold  text-xl `}>Importance of Preprocessing Rare Datasets  {'\n'}</Text>

                        Rare datasets, like those for the Shahmukhi script of the Punjabi language, often pose significant challenges. They may contain inconsistencies, noise, and other issues that can affect the quality of analysis. Preprocessing these datasets involves cleaning and organizing the data, making it suitable for various research and analytical purposes. Python scripts are essential tools for this process, allowing for efficient, reproducible, and scalable data handling.
                        <Text style={tw`font-bold  text-xl `}>{'\n'}Our Contribution: Building and Utilizing Python Scripts for Shahmukhi Data</Text>

                        {'\n'}
                        Recognizing the need for specialized preprocessing, my team and I have developed a series of Python scripts designed to handle over 3 million characters of data. These scripts perform various tasks, such as removing stop words, filtering out English text, scraping data, removing special characters, and merging datasets. Our efforts have resulted in a comprehensive and ready-to-use dataset for research, specifically tailored for the Shahmukhi script.
                        {'\n'}
                    </Text>
                    <Image
                        style={tw`h-60 w-80`}
                        resizeMode='contain'
                        source={require("../../Images/preprocesslist.png")}
                    />
                    <Text style={tw`w-80 text-sm text-start pb-40 `}>
                        <Text style={tw`font-bold  text-xl `}>{'\n'}Key Python Scripts and Their Functions</Text>


                        <Text style={tw`font-bold  text-base `}>{'\n'}Stop Words Removal Script</Text>

                        {'\n'}
                        Purpose: Stop words are common words that usually do not contribute significant meaning to the text analysis. Examples include "is," "the," "and," etc. Removing these words helps in focusing on the more meaningful parts of the text.            {'\n'}


                        {'\n'}<Text onPress={() => copyFileToDownloads('stop_words_cleaning.ipynb')} style={[tw`underline text-base `, { color: '#14B8A6' }]}>Click To Download The Script</Text> {'\n'}

                        {'\n'}<Text onPress={() => copyFileToDownloads1('stop_words_cleaning.ipynb', 'application/octet-stream')} style={[tw`underline text-base `, { color: '#14B8A6' }]}>Click To Share The Script On Anywhere</Text> {'\n'}

                        <Text style={tw`font-bold  text-base `}>{'\n'}English Text Removal Script</Text>

                        {'\n'}
                        Purpose: When working with Shahmukhi datasets, it's essential to filter out any English text that might be mixed in, ensuring the dataset remains pure.
                        {'\n'}
                        {'\n'}<Text onPress={() => copyFileToDownloads('englishRemoveScript.ipynb')} style={[tw`underline text-base `, { color: '#14B8A6' }]}>Click To Download The Script</Text> {'\n'}

                        {'\n'}<Text onPress={() => copyFileToDownloads1('englishRemoveScript.ipynb', 'application/octet-stream')} style={[tw`underline text-base `, { color: '#14B8A6' }]}>Click To Share The Script On Anywhere</Text> {'\n'}


                        <Text style={tw`font-bold  text-base `}>{'\n'}Web Scraping Script</Text>

                        {'\n'}
                        Purpose: Web scraping involves extracting data from websites. This script automates the process of gathering Shahmukhi text from various online sources.
                        {'\n'}

                        {'\n'}<Text onPress={() => copyFileToDownloads('scrapping.ipynb')} style={[tw`underline text-base `, { color: '#14B8A6' }]}>Click To Download The Script</Text> {'\n'}

                        {'\n'}<Text onPress={() => copyFileToDownloads1('scrapping.ipynb', 'application/octet-stream')} style={[tw`underline text-base `, { color: '#14B8A6' }]}>Click To Share The Script On Anywhere</Text> {'\n'}


                        <Text style={tw`font-bold  text-base `}>{'\n'}Special Character Removal Script</Text>

                        {'\n'}
                        Purpose: Special characters can introduce noise into the dataset. Removing them helps in standardizing the text.

                        {'\n'}

                        {'\n'}<Text onPress={() => copyFileToDownloads('merge_data_script.ipynb')} style={[tw`underline text-base `, { color: '#14B8A6' }]}>Click To Download The Script</Text> {'\n'}

                        {'\n'}<Text onPress={() => copyFileToDownloads1('merge_data_script.ipynb', 'application/octet-stream')} style={[tw`underline text-base `, { color: '#14B8A6' }]}>Click To Share The Script On Anywhere</Text> {'\n'}


                        <Text style={tw`font-bold  text-base `}>{'\n'}Letter Occurrences Script</Text>

                        {'\n'}
                        Purpose: Analyzing the frequency of each letter in a text is essential for various linguistic and statistical analyses. This script helps in determining the occurrences of each letter within a given text, which can be particularly useful in preprocessing and understanding the characteristics of the text. This is especially important for rare datasets, like Shahmukhi, where specific letters may have unique frequencies and distributions that need to be studied.
                        {'\n'}

                        {'\n'}<Text onPress={() => copyFileToDownloads('letter_occurencies_script.ipynb')} style={[tw`underline text-base `, { color: '#14B8A6' }]}>Click To Download The Script</Text> {'\n'}

                        {'\n'}<Text onPress={() => copyFileToDownloads1('letter_occurencies_script.ipynb', 'application/octet-stream')} style={[tw`underline text-base `, { color: '#14B8A6' }]}>Click To Share The Script On Anywhere</Text> {'\n'}




                        <Text style={tw`font-bold  text-base `}>{'\n'}Merge All Data Script</Text>

                        {'\n'}
                        Purpose: After preprocessing individual data sources, it's essential to merge them into a single, cohesive dataset. This script handles that task.                        {'\n'}
                        {'\n'}<Text onPress={() => copyFileToDownloads('cbow_model_training.ipynb')} style={[tw`underline text-base `, { color: '#14B8A6' }]}>Click To Download The Script</Text> {'\n'}

                        {'\n'}<Text onPress={() => copyFileToDownloads1('cbow_model_training.ipynb', 'application/octet-stream')} style={[tw`underline text-base `, { color: '#14B8A6' }]}>Click To Share The Script On Anywhere</Text> {'\n'}


                        <Text style={tw`font-bold  text-xl `}>{'\n'}Preprocessing Pipeline for Shahmukhi Data</Text>

                        {'\n'}
                        Data Collection: Gather raw Shahmukhi text data from various sources using the scraping script.
                        {'\n'}
                        {'\n'}
                        Cleaning:
                        {'\n'}
                        1.Remove English text using the English removal script.
                        {'\n'}
                        2.Filter out stop words with the stop words removal script.
                        {'\n'}
                        3.Eliminate special characters using the special character removal script
                        {'\n'}
                        Merging: Combine all cleaned datasets into a single dataset using the merge script.

                        {'\n'}
                        Validation: Verify the integrity and quality of the final dataset through manual and automated checks

                        <Text style={tw`font-bold  text-xl `}>{'\n'}Impact and Results</Text>

                        {'\n'}
                        By employing these scripts, we processed over 3 million characters of Shahmukhi data, resulting in a high-quality, ready-to-use dataset for research. This comprehensive preprocessing ensured that the dataset is:
                        {'\n'}
                        Accurate: Free from errors, inconsistencies, and irrelevant information.
                        {'\n'}
                        Complete: Covers various categories and domains relevant to the Shahmukhi script.
                        {'\n'}
                        Consistent: Standardized in format, making it easy to work with.
                        {'\n'}
                        Rich: Contains meaningful and diverse data, enhancing its utility for various research purposes.

                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Preprocessmodels