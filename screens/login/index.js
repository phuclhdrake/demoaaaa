import { View, Text, Alert, Image, StyleSheet, TextInput, Button, Pressable } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';

const SignInScreen = () => {
    const navigation = useNavigation();

    const [users, setUsers] = useState([]);

    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const navigateToHome = () => {
        navigation.navigate('Home');
    };

    const fetchData = async () => {
        try {
            const API_URL = 'http://192.168.1.82:3000/users';
            const response = await fetch(API_URL);
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.log('Tìm kiếm dữ liệu lỗi: '+ error);
            return null;
        }
    };

    // validate dữ liệu 
    const validateAuthInfo = (authInfo) => {
        if (authInfo.username === '') {
            setUsernameError('Người dùng không được để trống !');
            return false;
        } else if (authInfo.password === '') {
            setUsernameError('');
            setPasswordError('Mật khẩu không được để trống !');
            return false;
        }
        return true;
    };

    // hàm clear messages lỗi
    const clearError = (usernameError, passwordError) => {
        if (usernameError) setUsernameError('');
        if (passwordError) setPasswordError('');
    };

    // Funtion lưu thông tin authentication vào AsyncStorage
    const storageAutheInfo = async (value) => {
        try {
            const authInfo = JSON.stringify(value);
            await AsyncStorage.setItem('authInfo', authInfo);
        } catch (error) {
            console.log(error);
        }
    };

    const doLogin = () => {
        // tao doi tuong luu tru thong tin login
        let request = {username: username, password: password};

        console.log('authInfor: '+ JSON.stringify(request));

        if (users) {
            // Validate dữ liệu nhập vào
            const validateResult = validateAuthInfo(request);

            if (validateResult === true) {
                //tìm user trong danh sách user từ API trả về
                const authInfo = users.find((user) => user.userName === request.username);
                // Thực hiện validate thông tin đăng nhâp
                if (!authInfo) {
                    clearError(usernameError, passwordError);
                    setUsernameError('Tài khoản không chính sác !');
                } else {
                    if (!(authInfo.password === request.password)) {
                        clearError(usernameError, passwordError);
                        setPasswordError('Mật khẩu không chính xác !');
                        return;
                    } else {
                        clearError(usernameError, passwordError);
                        storageAutheInfo(authInfo);
                        Alert.alert('Thông Báo', 'Đăng nhập thành công với tài khoản: ' + request.username, [
                            { text: 'OK', onPress: () => navigateToHome() },
                            { text: 'Cancel', onPress: () => console.log('Press Cancel') }
                        ]);
                    }
                }
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    

    return(
        <View style={styles.root}>
            <Image source={require('../../assets/bg.jpg')} style={styles.logo} />

            <TextInput style={styles.customInput} placeholder='username' value={username} onChangeText={(text) => setUsername(text)} secureTextEntry={false} />
            <Text style={styles.textError}>{usernameError}</Text>
            <TextInput style={styles.customInput} placeholder='password' value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={true} />
            <Text style={styles.textError}>{passwordError}</Text>

            <Pressable style={styles.customButton} onPress={doLogin} >
                <Text style={styles.textButton}>Sign In</Text>
            </Pressable>
        </View>
    );


};

export default SignInScreen;

const styles = StyleSheet.create({
    root: {
        padding: 20
    },
    logo: {
        width: '100%',
        height: '55%',
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
        marginTop: 20,
        marginBottom: 5,
    },
    textButton: {
        backgroundColor: '#539165',
        color: 'white',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#000000',
        margin: 10,
        padding: 10,
        fontSize: 20,
        width: '100%',
        textAlign: 'center',
    },
    customButton: {
        width: 200,
        marginTop: 10,
        alignSelf: 'center',
    },
    textError: {
        fontSize: 12,
        color: 'red',
        textAlign: 'left'
    }
});