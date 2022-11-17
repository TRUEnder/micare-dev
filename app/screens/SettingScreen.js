import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

function SettingScreen(props) {
    return (
        <View style={styles.container}>
            <Text>Settings</Text>
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

export default SettingScreen;
