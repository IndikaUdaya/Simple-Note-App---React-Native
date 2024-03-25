import { Alert, Button, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { navigation } from '@react-navigation/native';
import { useState } from 'react';
import * as SQLite from 'expo-sqlite';

import AppText from '../components/AppText';
import { AppTextInput } from '../components/AppTextInput';
import AppButton from '../components/AppButton';

const validation = Yup.object().shape({
    mobile: Yup.number().required().min(10).label("Mobile"),
    password: Yup.string().required().min(8).label("Password")
});

export default function LoginScreen({ navigation }) {

    const [mobile, setMobile] = useState();
    const [password, setPassword] = useState();

    const dbSQL = SQLite.openDatabase("my_note.db");

    checkDataForLogin = () => {
        dbSQL.transaction(tx => {
            tx.executeSql('SELECT * FROM user WHERE mobile=? AND password=?',
                [mobile, password],
                (trObj, resultSet) => {
                    activeStatus();
                    redirect();
                },
                (trObj, error) => {
                    Alert.alert("Login", error.message);
                }
            );
        });
    }

    redirect = () => {
        dbSQL.transaction(tx => {
            tx.executeSql('SELECT * FROM user WHERE mobile=? AND password=?',
                [mobile, password],
                (trObj, resultSet) => {
                    let obj;
                    resultSet.rows._array.forEach(element => {
                        obj = element;
                    });
                    (resultSet.rows.length == 1) ? navigation.navigate("Home", obj) : Alert.alert("Login", "Wrong data, please check your mobile and password..");

                },
                (trObj, error) => {
                    Alert.alert("Login", error.message);
                }
            );
        });
    }


    activeStatus = () => {
        dbSQL.transaction(tx => {
            tx.executeSql('UPDATE user SET status=? WHERE mobile=? ', ['active', mobile],
                (trObj, resultSet) => {
                },
                (trObj, error) => {
                    Alert.alert("Login", error.message);
                }
            );
        });
    }


    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>

                {/* <StatusBar style='auto' hidden={false} /> */}

                <Image
                    style={styles.logo}
                    source={require('../assets/user.png')} />

                <Formik
                    initialValues={{ mobile: '', password: '' }}
                    onSubmit={values => {
                        setMobile(values.mobile);
                        setPassword(values.password);
                        checkDataForLogin();
                    }}
                    validationSchema={validation}
                >
                    {({ handleChange, handleSubmit, errors }) => (
                        <>
                            <AppTextInput
                                icon="phone"
                                keyboardType="numeric"
                                autoComplete='off'
                                autoFocus={false}
                                maxLength={10}
                                placeholder="mobile number"
                                onChangeText={handleChange('mobile')}
                            />
                            <AppText fs={12} color='red'>{errors.mobile}</AppText>

                            <AppTextInput
                                icon="lock"
                                autoCapitalize="none"
                                autoCorrect={false}
                                autoComplete='off'
                                placeholder="password"
                                secureTextEntry
                                textContentType="password"
                                onChangeText={handleChange('password')}
                            />
                            <AppText fs={12} color='red'>{errors.password}</AppText>

                            <AppButton title="Login" onPress={handleSubmit} />

                        </>
                    )}
                </Formik>

                <AppText fs={12}>Don't have an account, please signup</AppText>
                <Button title='siguup' onPress={() => { navigation.navigate('Signup'); }} />

            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12
    },
    logo: {
        width: 220,
        height: 220,
        alignSelf: 'center',
        marginBottom: 50,
        objectFit: 'contain'
    }
});