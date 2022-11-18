import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, LogBox, Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from '@react-navigation/native';
import { auth, currentUser, db, onAuthChanged } from '../../configFirebase';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { collection, addDoc } from 'firebase/firestore'

import colors from '../config/colors';

function Register() {
    const navigation = useNavigation()

    const initialState = {
        fullname: '',
        username: '',
        email: '',
        password: ''
    }

    const [fullname, setFullName] = useState(initialState.fullname)
    const [username, setUsername] = useState(initialState.username)
    const [email, setEmail] = useState(initialState.email)
    const [password, setPassword] = useState(initialState.password)

    function handleSignUp() {

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                try {
                    const docRef = await addDoc(collection(db, "users"), {
                        fullname: fullname,
                        username: username,
                        email: email,
                        password: password,
                        // 
                        status: 'user'
                        // 
                    });
                    console.log("Document written with ID: ", docRef.id);

                    await onAuthChanged()
                    console.log(currentUser.username)
                } catch (e) {
                    console.error("Error adding document: ", e);
                }

                setUsername(initialState.username)
                setEmail(initialState.email)
                setPassword(initialState.password)

                navigation.navigate('LandingPage')
            }).catch((error) => {
                const errorMessage = error.message == 'Firebase: Error (auth/email-already-in-use).'
                    ? 'Email already used' : 'Something is Wrong, try again'

                Alert.alert('Sign Up Failed', errorMessage)
            })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Register</Text>
            <View style={styles.form}>

                <View style={styles.inputContainer}>

                    <TextInput
                        placeholder='Full Name'
                        value={fullname}
                        onChangeText={text => setFullName(text)}
                        style={styles.input} />

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
                    onPress={() => navigation.navigate('LoginUser')}
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
        color: colors.black,
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

export default Register;