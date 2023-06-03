import { View, Text, Image, Pressable, StyleSheet, ScrollView, SafeAreaView, Button } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Students from '../../components/students';

const HomeScreen = () => {
    const navigation = useNavigation();
    
    const [students, setStudents] = useState([]);
    const [authInfo, setAuthInfo] = useState();

    const navigateToLogin = () => {
        navigation.navigate('Login');
    };

    // Funtion lấy data login từ AsyncStorage bộ nhớ tạm
    const duLieuTamThoi = async () => {
        try {
            const authInfo = await AsyncStorage.getItem('authInfo');
            if (authInfo !== null) {
                console.log('authInfo của bộ nhớ tạm thời', authInfo);
                setAuthInfo(JSON.parse(authInfo));
            }
        }catch (error) {
            console.log(error);
        }
    };
    // hàm logout
    const doLogout = () => {
        AsyncStorage.removeItem('authInfo');
        navigation.reset({
            index: 0,
            routes: [{name: 'Login'}]
        });
    };

    // lấy danh sách  sinh viên
    const getListStudent = async () => {
        try {
            const API_URL = 'http://192.168.1.82:3000/students';
            const response = await fetch(API_URL);
            const data = await response.json();
            console.log('student: ', JSON.stringify(data));
            setStudents(data);
        } catch (error) {
            console.log('Fetch data failed ' + error);
        }
    };

    useEffect(()=> {
        duLieuTamThoi();
        getListStudent();
    },[]);

    const danhSachSinhVien = () => {
        return (
            <ScrollView style={styles.scrollView}>
                <View>
                    <Text style={styles.txtHeader}>List Student</Text>
                </View>

                <View style={styles.studentContainer}>
                    {students.map((item, index) => {
                        return <Students student={item} key={index}></Students>;
                    })}
                </View>
            </ScrollView>
        );
    };

    return(
        <SafeAreaView style={styles.container}>
            {authInfo ? 
                <Pressable style={styles.customButton} onPress={doLogout}>
                    <Text style={styles.textButton}>Logout</Text>
                </Pressable> 
                :
                <Pressable style={styles.customButton} onPress={navigateToLogin}>
                    <Text style={styles.textButton}>Go to Login Screen</Text>
                </Pressable>
            }
            {authInfo?.role === 'ADMIN' ? danhSachSinhVien() : null}
        </SafeAreaView>
    ); 
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    txtHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        color: '#539165'
    },
    textButton: {
        backgroundColor: '#539165',
        color: 'white',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#000000',
        padding: 10,
        fontSize: 20,
        width: '100%',
        textAlign: 'center',
    },
    customButton: {
        width: 200,
        marginTop: 30,
        alignSelf: 'center',
        marginBottom: 20,
    },
    scrollView: {
        flexGrow: 1,
        padding: 20
    },

});