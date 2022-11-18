import React from 'react';
import { StyleSheet, View, SafeAreaView, Text, Platform, StatusBar, LogBox, useColorScheme } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage"
import Ionicons from 'react-native-vector-icons/Ionicons'

import { auth, currentUser } from '../../configFirebase';
import colors from '../config/colors';

function HomeScreen() {
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.headerContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Ionicons name='list-sharp' size={25}></Ionicons>
                    <View style={styles.profile}></View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.header1}>Welcome back </Text>
                    <Text style={styles.header1}>{currentUser.username}!</Text>
                </View>
            </SafeAreaView>

            <View style={styles.carousel}>
                <View style={styles.box}>

                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        height: '25%',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        paddingHorizontal: 20,
        justifyContent: 'space-around',
    },
    header1: {
        fontFamily: '',
        fontSize: 20,
        fontWeight: '700'
    },
    profile: {
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        backgroundColor: colors.lightgrey
    },
    carousel: {
        height: '35%',
        padding: 20,
        justifyContent: 'center'
    },
    box: {
        backgroundColor: colors.lightgrey,
        height: '80%',
        borderRadius: 10
    }
})

export default HomeScreen;