import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, LogBox } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../configFirebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
    const navigation = useNavigation()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSignIn() {
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                const user = userCredentials.user
                console.log(user.email)
                navigation.navigate('LandingPage')
            }).catch(error => {
                alert(error.message)
            })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Login</Text>
            <View style={styles.form}>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder='Email'
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={styles.input} />

                    <TextInput
                        placeholder='Password'
                        value={password}
                        secureTextEntry
                        onChangeText={text => setPassword(text)}
                        style={styles.input} />
                </View>

                <TouchableOpacity
                    onPress={handleSignIn}
                    style={[styles.button, styles.primaryButton]}>
                    <Text style={styles.primaryButtonText}>Log In</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Register')}
                    style={[styles.button, styles.secondaryButton]}>
                    <Text style={styles.secondaryButtonText}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

// Style

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'black',
        fontSize: 26,
        fontWeight: '500'
    },
    form: {
        width: '70%',
        marginTop: 30
    },
    inputContainer: {
        marginBottom: 20
    },
    input: {
        margin: 3,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 10,
    },
    button: {
        height: 45,
        margin: 3,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    primaryButton: {
        backgroundColor: 'mediumpurple'
    },
    secondaryButton: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'mediumpurple'
    },
    primaryButtonText: {
        color: 'white'
    },
    secondaryButtonText: {
        color: 'mediumpurple'
    }
})

export default Login;