import React from 'react';
import { StyleSheet, View, Text, LogBox } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage"

function HomeScreen(props) {
    return (
        <View style={styles.container}>
            <Text>Home</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default HomeScreen;