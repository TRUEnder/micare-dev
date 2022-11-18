import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, Platform, StatusBar, TouchableWithoutFeedback, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth'
import { auth } from '../../configFirebase'

import colors from '../config/colors'


function SettingScreen(props) {

    const navigation = useNavigation()

    function handleSignOut() {
        signOut(auth).then(() =>
            navigation.navigate('Login')
        ).catch(error => {
            Alert.alert('Error happened', error.message)
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header1}>Settings</Text>
            </View>
            <View style={styles.profile}>
                <View style={styles.profileLeft}>
                    <Text style={styles.username}>
                        {auth.currentUser.displayName !== null ? auth.currentUser.displayName : 'Username'}
                    </Text>
                    <Text style={styles.email}>{auth.currentUser.email}</Text>
                    <TouchableWithoutFeedback onPress={handleSignOut}>
                        <Text style={styles.logout}>Log Out</Text>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.profileRight}>
                    <View style={styles.profilePicture}></View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    headerContainer: {
        height: '15%',
        justifyContent: 'center',
        paddingLeft: 20
    },
    header1: {
        fontFamily: '',
        fontSize: 20,
        fontWeight: '700'
    },
    profile: {
        flexDirection: 'row',
        height: '21%',
        marginHorizontal: 15,
        borderColor: colors.lightgrey,
        borderWidth: 1,
        borderRadius: 5
    },
    profileLeft: {
        width: '65%',
        height: '100%',
        paddingLeft: 23,
        paddingRight: 15,
        justifyContent: 'center'
    },
    username: {
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 10,
    },
    email: {
        fontSize: 14
    },
    logout: {
        fontSize: 16,
        color: colors.red,
        marginTop: 20
    },
    profileRight: {
        height: '100%',
        justifyContent: 'center'
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        backgroundColor: colors.lightgrey,
    }
})

export default SettingScreen;
