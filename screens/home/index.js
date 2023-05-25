import { View, Text, Button } from 'react-native'
import React from 'react'

const HomeScreen = ({ navigation }) => {
    const navigateToLogin = () => {
        navigation.navigate('Login');
    };

    return <Button title='go Login screen' onPress={navigateToLogin} />
};

export default HomeScreen;