// src/screens/WelcomeScreen.js

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import tw from "twrnc"

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../Images/S.png')} style={styles.logo} />
      <Text style={[styles.title,tw`underline `]}>Shahamukhi Academia</Text>
      <Text style={styles.subtitle}>Let's get started!</Text>
      <Text style={styles.description}>Login to enjoy the features we’ve provided!</Text>
      
      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#7e7e7e',
    textAlign: 'center',
    marginBottom: 40,
  },
  loginButton: {
    backgroundColor: '#1E3A8A',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 30,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpButton: {
    borderColor: '#1E3A8A',
    borderWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 30,
  },
  signUpButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
