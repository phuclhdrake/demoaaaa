import { View, Text, Alert, Image, StyleSheet, TextInput, Button, Pressable } from 'react-native'
import React, { useState } from 'react'

const SignInScreen = (props) => {
    let users = [];
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    async function fetchData(){
        try {
            const response = await fetch('http://192.168.1.82:3000/users');
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    async function storeData(){
        users = await fetchData();
    };

    storeData();

    const doLogin = () => {
        // kiêm tra
        if (username.length == 0){
            alert('Hay nhap user name');
            return;
        }
        if (password.length == 0){
            alert('Hay nhap password');
            return;
        }

        // tao doi tuong luu tru thong tin login
        let request = {username: username, password: password};

        console.log('authInfor: '+ JSON.stringify(request));

        if (users) {
            const authInfo = users.find((user) => user.userName === request.username);

            if (!authInfo) {
                Alert.alert('Notification', 'Cant find user infomation', [{ text: 'Cancel', onPress: () => log.error('Cant find user ' + request.username) }]);
            } else {
                if (!(authInfo.password === request.password)) {
                    Alert.alert('Notification', 'Password is not correct', [{ text: 'Cancel', onPress: () => log.error('Password is not correct for ' + request.username) }]);
                } else {
                    Alert.alert('Notification', 'Login successfull ' + request.username, [
                        { text: 'OK', onPress: () => navigateToHome() },
                        { text: 'Cancel', onPress: () => log.info('Press Cancel') }
                    ]);
                }
            }
        }
    };

    const navigateToHome = () => {
        props.navigation.navigate('Home');
    };

    return(
        <View style={styles.root}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <TextInput placeholder='username' value={username} s />

            <CustomInput placeholder='Username' value={username} setValue={setUsername} secureTextEntry={false} />
            <CustomInput placeholder='Password' value={password} setValue={setPassword} secureTextEntry={true} />
            <CustomButton btnLabel={'Sign In'} onPress={doLogin} />
            <CustomButton btnLabel={'Back to Home'} onPress={navigateToHome} />
        </View>
    );


};

export default SignInScreen;

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20
    },
    logo: {
        width: '50%',
        height: '50%',
        resizeMode: 'contain'
    }
});