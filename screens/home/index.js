import { View, Text, Button, Pressable, StyleSheet } from 'react-native'
import React from 'react'

const HomeScreen = ({ navigation }) => {
    const navigateToLogin = () => {
        navigation.navigate('Login');
    };

    return(
        <View style={styles.container}>
            <Pressable style={styles.customButton} onPress={navigateToLogin} >
                <Text style={styles.textButton}>go Login screen</Text>
            </Pressable>
        </View>
    ); 
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    textButton: {
        backgroundColor: 'blue',
        color: 'white',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'Black',
        margin: 10,
        padding: 10,
        fontSize: 16,
        width: '100%',
        textAlign: 'center',
    },
    customButton: {
        width: 200,
    }
});