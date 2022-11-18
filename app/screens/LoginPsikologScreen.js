import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, LogBox, Alert, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from '@react-navigation/native';
import { auth, onAuthChanged, currentUser } from '../../configFirebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

import colors from '../config/colors';

function Login() {
    const navigation = useNavigation()

    const initialState = {
        email: '',
        password: ''
    }

    const [email, setEmail] = useState(initialState.email)
    const [password, setPassword] = useState(initialState.password)

    function handleSignIn() {
        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredentials) => {
                await onAuthChanged()
                console.log(currentUser)

                setEmail(initialState.email)
                setPassword(initialState.password)

                navigation.navigate('LandingPage')
            }).catch(() => {
                Alert.alert('Sign In Failed', 'Wrong email or password')
            })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Login</Text>
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.text, { color: colors.yellow }]}>as </Text>
                <Text style={[styles.text, { color: colors.green }]}>Psychologist</Text>
            </View>
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
                    onPress={() => navigation.navigate('RegisterPsikolog')}
                    style={[styles.button, styles.secondaryButton]}>
                    <Text style={styles.secondaryButtonText}>Register</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <Text>Login as a user </Text>
                <TouchableWithoutFeedback
                    onPress={() => navigation.navigate('LoginUser')}>
                    <Text style={{ color: colors.blue }}>here</Text>
                </TouchableWithoutFeedback>
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
        color: colors.black,
        fontSize: 26,
        fontWeight: '700',
        marginBottom: 6
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
        borderColor: colors.lightgrey,
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
        backgroundColor: colors.purple
    },
    secondaryButton: {
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.purple
    },
    primaryButtonText: {
        color: colors.white
    },
    secondaryButtonText: {
        color: colors.purple
    }
})

export default Login;