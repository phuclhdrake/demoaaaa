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
            alert('Hãy nhập tài khoản!');
            return;
        }
        if (password.length == 0){
            alert('Hãy nhập mật khẩu!');
            return;
        }

        // tao doi tuong luu tru thong tin login
        let request = {username: username, password: password};

        console.log('authInfor: '+ JSON.stringify(request));

        if (users) {
            const authInfo = users.find((user) => user.userName === request.username);
9
            if (!authInfo) {
                Alert.alert('Thông Báo', 'Sai tài khoản', [{ text: 'Cancel', onPress: () => console.log('Cant find user ' + request.username) }]);
            } else {
                if (!(authInfo.password === request.password)) {
                    Alert.alert('Thông Báo', 'Sai mật khẩu!', [{ text: 'Cancel', onPress: () => console.log('Password is not correct for ' + request.username) }]);
                } else {
                    Alert.alert('Thông Báo', 'Đăng nhập thành công với tài khoản: ' + request.username, [
                        { text: 'OK', onPress: () => navigateToHome() },
                        { text: 'Cancel', onPress: () => console.log('Press Cancel') }
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
            <Image source={require('../../assets/favicon.png')} style={styles.logo} />
            <TextInput style={styles.customInput} placeholder='username' value={username} onChangeText={(text) => setUsername(text)} secureTextEntry={false} />
            <TextInput style={styles.customInput} placeholder='password' value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={true} />
            <Pressable style={styles.customButton} onPress={doLogin} >
                <Text style={styles.textButton}>Sig in</Text>
            </Pressable>
            <Pressable style={styles.customButton} onPress={navigateToHome} >
                <Text style={styles.textButton}>Back to Home</Text>
            </Pressable>
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
        width: '100%',
        height: '40%',
        backgroundColor: '#EEE9DA',
        resizeMode: 'contain',
    },
    customInput: {
        backgroundColor: 'white',
        width: '100%',
        borderColor: '#A4D0A4',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginVertical: 10
    },
    textButton: {
        backgroundColor: '#539165',
        color: 'white',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'Black',
        margin: 10,
        padding: 10,
        fontSize: 18,
        width: '100%',
        textAlign: 'center',
    },
    customButton: {
        width: 200,
    }
});