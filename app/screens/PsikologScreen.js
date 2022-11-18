import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { getDocs, collection, where, query } from 'firebase/firestore'
import { db } from '../../configFirebase'

function PsikologScreen(props) {
    async function getPsychologists() {
        const q = query(collection(db, "users"), where("status", "==", "psikolog"));
        const queryResult = await getDocs(q);

        const result = []

        queryResult.forEach((record) => {
            result.push(record.data())
        })

        return result
    }

    const psychologists = []
    getPsychologists().then((result) => {
        psychologists.concat(result)
        console.log(psychologists)
    });


    return (
        <View style={styles.container}>
            {psychologists.map((psychologist) =>
                <View key={psychologist.email}>
                    <Text>{psychologist.username}</Text>
                </View>
            )}
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