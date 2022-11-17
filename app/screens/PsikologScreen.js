import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

function PsikologScreen(props) {
    return (
        <View style={styles.container}>
            <Text>Psikolog List</Text>
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

export default PsikologScreen;