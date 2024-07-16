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

const Preprocessmodels = () => {

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
                onPress={() => navigation.goBack()}
            />
            <ScrollView vertical showsVerticalScrollIndicator={true}>
                <View style={tw`items-start self-center flex-1`}>
                    <Text style={tw`w-80 text-sm text-start  mt-5`}>
                        <Text style={tw`font-bold  text-xl`}>The Importance of Preprocessing in Data Analysis: </Text> {'\n'}
                        Data is the backbone of any analytical or research project. However, raw data, in its initial form, is often incomplete, inconsistent, and noisy, making it challenging to derive meaningful insights directly. This is where data preprocessing comes into play. Preprocessing is a crucial step that transforms raw data into a clean and structured format, making it ready for analysis. This process involves several steps such as cleaning, normalization, transformation, and feature extraction, which enhance the quality and utility of the data.
                    </Text>
                    <Image
                        style={tw`h-60 w-80`}
                        resizeMode='contain'
                        source={require("../../Images/rawdata.png")}
                    />
                    <Text style={tw`w-80 text-sm text-start mt-5`}>
                        <Text style={tw`font-bold  text-xl `}>Understanding Raw Data  {'\n'}</Text>


                        Raw data refers to the unprocessed, original data collected from various sources. It can include text, numbers, images, audio, and more. This data is usually messy, containing errors, missing values, duplicates, and irrelevant information. Without preprocessing, the raw data can lead to inaccurate analysis, unreliable models, and poor decision-making.

                        In the context of rare datasets, such as those involving the Shahmukhi script of the Punjabi language, preprocessing becomes even more critical. Shahmukhi, a variant of the Persian script, is primarily used in Pakistan and holds significant cultural and linguistic value. However, resources and datasets for Shahmukhi are not as readily available as for more widely spoken languages. This scarcity makes the preprocessing of such data both challenging and essential.

                        <Text style={tw`font-bold  text-xl `}>{'\n'}The Importance of Preprocessing Rare Datasets</Text>

                        {'\n'}
                        Rare datasets, like those in Shahmukhi, require specialized preprocessing techniques to handle their unique characteristics and complexities. Proper preprocessing ensures that the data is accurate, complete, and ready for analysis. Here are some key reasons why preprocessing is vital for rare datasets:

                        {'\n'}
                        Accuracy: Preprocessing helps in identifying and correcting errors in the data. For rare datasets, even minor errors can lead to significant inaccuracies in analysis.
                        {'\n'}
                        Completeness: It fills in missing values and removes duplicates, ensuring that the dataset is comprehensive and reliable.
                        {'\n'}
                        Consistency: Preprocessing standardizes the data format, making it consistent and easy to work with.
                        {'\n'}
                        Noise Reduction: It removes irrelevant information, reducing noise and enhancing the signal in the data.
                        {'\n'}
                        Feature Extraction: Preprocessing helps in extracting meaningful features from the raw data, which are crucial for building effective models.          </Text>
                    <Image
                        style={tw`h-40 w-80 mt-5`}
                        resizeMode='contain'
                        source={require("../../Images/datapreprocess.png")}
                    />

                    <Text style={tw`w-80 text-sm text-start pb-40 `}>
                        <Text style={tw`font-bold  text-xl `}>{'\n'}Building the Shahmukhi Dataset Bank</Text>

                        {'\n'}
                        Recognizing the importance of preprocessing, my team and I embarked on a project to build a comprehensive dataset bank for the Shahmukhi script. This involved collecting over 12,000 rows of data from various sources, followed by meticulous preprocessing to ensure the data's quality and usability.


                        <Text style={tw`font-bold  text-xl `}>{'\n'}Data Collection</Text>

                        {'\n'}
                        Our data collection process involved sourcing information from diverse domains such as literature, media, historical documents, and online resources. We aimed to create a well-rounded dataset that covers various aspects of the Shahmukhi script. The categories we focused on include:
                        {'\n'}
                        Pakistan: Data specific to the region, including geographical information, cultural nuances, and socio-political contexts.
                        {'\n'}
                        Actors: Biographical details, filmography, and achievements of actors from the Punjabi film and television industry.
                        {'\n'}
                        Special Writing: Classical literature, historical documents, and contemporary writings in Shahmukhi.
                        {'\n'}
                        Poetry: A wide range of poetic works, from traditional forms like qasidas and nazms to modern expressions.
                        {'\n'}
                        Ghazals: Collection of Shahmukhi ghazals, highlighting their thematic diversity and stylistic variations.
                        {'\n'}
                        Random Facts: Interesting and lesser-known facts about the Punjabi language, culture, and history.

                        <Text style={tw`font-bold  text-xl `}>{'\n'}Data Preprocessing</Text>

                        {'\n'}
                        Once the data was collected, we employed a series of preprocessing steps to clean and structure it. These steps included:
                        {'\n'}
                        Data Cleaning: Removing errors, inconsistencies, and irrelevant information from the raw data.
                        {'\n'}
                        Normalization: Standardizing the data format to ensure uniformity.
                        {'\n'}
                        Missing Value Imputation: Filling in missing values to create a complete dataset.
                        {'\n'}
                        Deduplication: Removing duplicate entries to avoid redundancy.
                        {'\n'}
                        Categorization: Organizing the data into predefined categories for easier analysis.


                        <Text style={tw`font-bold  text-xl `}>{'\n'}The Role of the Continuous Bag of Words (CBOW) Model in Preprocessing</Text>

                        {'\n'}
                        To further enhance the quality of our dataset, we employed the Continuous Bag of Words (CBOW) model, a popular technique in natural language processing (NLP) for word embedding. The CBOW model helps in understanding the context of words by predicting a target word based on its surrounding context words. This model is particularly useful for generating similar words and understanding semantic relationships within the text.

                        <Text style={tw`font-bold  text-xl `}>{'\n'}How CBOW Works</Text>

                        {'\n'}
                        The CBOW model operates by training on a large corpus of text to learn the representations of words in a continuous vector space. During training, the model takes a context window (a fixed-size window of words surrounding a target word) and uses it to predict the target word. The key steps involved in the CBOW model are:
                        {'\n'}
                        Context Window: Define a context window size, which is the number of words surrounding the target word.
                        {'\n'}
                        Input Layer: Convert the context words into one-hot vectors, creating an input matrix.
                        {'\n'}
                        Hidden Layer: Pass the input matrix through a hidden layer to generate the average context vector.
                        {'\n'}
                        Output Layer: Use the average context vector to predict the target word, converting it back to a one-hot vector.
                        {'\n'}
                        Training: Adjust the weights of the model using backpropagation and gradient descent to minimize the prediction error.

                        {'\n'}<Text onPress={() => copyFileToDownloads('cbow_model_training.ipynb')} style={tw`underline text-base text-green-400 `}>Click To Download The CBOW Model Code</Text> {'\n'}

                        {'\n'}<Text onPress={() => copyFileToDownloads1('cbow_model_training.ipynb', 'application/octet-stream')} style={tw`underline text-base text-green-400 `}>Click To Share The Modal Code On Anywhere</Text> {'\n'}

                        <Text style={tw`font-bold  text-xl `}>{'\n'}Conclution</Text>

                        {'\n'}
                        Preprocessing is a critical step in transforming raw data into a clean and structured format, especially for rare datasets like those involving the Shahmukhi script. By meticulously collecting and preprocessing over 12,000 rows of data, my team and I have built a comprehensive dataset bank that is ready for research and analysis.
                        {'\n'}
                        The use of the Continuous Bag of Words (CBOW) model further enhanced the quality of our dataset, enabling better semantic understanding and similar word generation. This dataset bank serves as a valuable resource for researchers, linguists, and developers working on Shahmukhi and Punjabi language projects.

                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Preprocessmodels