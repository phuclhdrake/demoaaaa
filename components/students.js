import { View, Text, StyleSheet, Image} from 'react-native'
import React from 'react'

const Students = ({ student }) => {
    return (
        <View style={styles.item}>
            <View style={styles.itemImageContainer}>
                {student.gender === 'Male' ? (
                    <Image style={styles.itemImage} source={require('../assets/male.png')} resizeMode='contain' />
                ) : (
                    <Image style={styles.itemImage} source={require('../assets/female.png')} resizeMode='contain' />
                )}
            </View>
            <View style={{ paddingLeft: 15 }}>
                <Text style={styles.txt}>{student.studentId}</Text>
                <Text style={styles.txt}>{student.fullName}</Text>
                <Text style={styles.txt}>{student.gender}</Text>
                <Text style={styles.txt}>{student.email}</Text>
                <Text style={styles.txt}>{student.dateOfBirth}</Text>
            </View>
        </View>
    );
}

export default Students;

const styles = StyleSheet.create({
    txt: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    item: {
        paddingVertical: 15,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        flexDirection: 'row',
    },
    itemImageContainer: {
        width: 100,
        height: 100,
        borderWidth: 1,
        borderRadius: 100,
        padding: 5,
        alignSelf: 'center',
    },
    itemImage: {
        flex: 1,
        width: undefined,
        height: undefined
    },
});
