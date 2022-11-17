import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, LogBox } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../configFirebase';
import { createUserWithEmailAndPassword } from 'firebase/auth'


function Register() {
    const navigation = useNavigation()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSignUp() {
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const user = userCredential.user
                console.log(user.email)
                navigation.navigate('LandingPage')
            }).catch(error => {
                alert(error)
            })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Register</Text>
            <View style={styles.form}>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder='Username'
                        value={username}
                        onChangeText={text => setUsername(text)}
                        style={styles.input} />

                    <TextInput
                        placeholder='Email'
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={styles.input} />

                    <TextInput
                        placeholder='Password'
                        value={password}
                        onChangeText={text => setPassword(text)}
                        style={styles.input}
                        secureTextEntry />
                </View>

                <TouchableOpacity
                    onPress={handleSignUp}
                    style={[styles.button, styles.primaryButton]}>
                    <Text style={styles.primaryButtonText}>Register</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                    style={[styles.button, styles.secondaryButton]}>
                    <Text style={styles.secondaryButtonText}>Log In</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

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

export default Register;