import { Alert, Button, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import * as Yup from 'yup'
import { Formik } from "formik";
import { navigation } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';

import AppText from '../components/AppText';
import { AppTextInput } from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import { AppCombobox } from '../components/AppCombobox';
import colors from '../config/colors';

const user_type = [
    { label: "Employee", value: "1" },
    { label: "Student", value: "2" }
]

const validation = Yup.object().shape({
    mobile: Yup.string().required().matches(/(077|070|071|072|074|075|076|078)/, { excludeEmptyString: true }).min(10).label('Mobile'),
    first_name: Yup.string().required().min(5).label('First name'),
    last_name: Yup.string().required().min(5).label('Last name'),
    password: Yup.string().required().min(8).label('Password'),
    çonfirm_password: Yup.string().oneOf([Yup.ref('password'), null], "Paasword must match").required().min(5).label('Confirm password'),
});


export default function Signup({ navigation }) {

    const [m, setM] = useState();
    const [fName, setFName] = useState();
    const [lName, setLname] = useState();
    const [useTy, setUseTy] = useState();
    const [pass, setPass] = useState();

    const [usertype, setUsertype] = useState(user_type[1]);

    const dbSQL = SQLite.openDatabase("my_note.db");

    useEffect(() => {
        createTableUser();
        createTableNote();
    }, []);

    createTableUser = () => {

        dbSQL.transaction((tabel) => {
            tabel.executeSql(
                `CREATE TABLE IF NOT EXISTS user(
                    mobile VARCHAR(10) PRIMARY KEY NOT NULL, 
                    first_name VARCHAR(30) NOT NULL,
                    last_name VARCHAR(30) NOT NULL,
                    password VARCHAR(20) NOT NULL,
                    user_type VARCHAR(30) NOT NULL,
                    status VARCHAR(8))`
            );
        });
    }

    createTableNote = () => {
        dbSQL.transaction((tabel) => {
            tabel.executeSql(
                `CREATE TABLE IF NOT EXISTS note(
                    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
                    title VARCHAR(100) NOT NULL,
                    description TEXT NOT NULL,
                    category VARCHAR(20) NOT NULL,                    
                    date VARCHAR(30) NOT NULL ,
                    mobile_id VARCHAR(10) NOT NULL,                    
                    FOREIGN KEY (mobile_id) REFERENCES user(mobile))`
            );
        });
    };

    insertData = () => {
        dbSQL.transaction((tx) => {
            tx.executeSql('INSERT INTO user (mobile,first_name,last_name,password,user_type,status) VALUES (?,?,?,?,?,?)',
                [m, fName, lName, pass, useTy, ''],
                (txObj, resultSet) => {
                    Alert.alert("Save Data Successfully..", "Redirect to Login window");
                    navigation.navigate("Login");
                },
                (txObj, error) => { Alert.alert("Save Data Error", "Already exsisting data, plase try again!"); }
                // (txObj, error) => { Alert.alert("Save Data Error", error.message); }
            );
        });
    }


    // add = async () => {
    //     let mo = await AsyncStorage.getItem("mobile");
    //     setM(mo);
    //     // setFName(await AsyncStorage.getItem("firstName"))
    //     // setLname(await AsyncStorage.getItem("lastName"))
    //     // setUserTy(await AsyncStorage.getItem("usreType"))
    // }




    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <StatusBar style='auto' hidden={false} />

                <Image
                    style={styles.logo}
                    source={require('../assets/notebook_icon.png')} />

                <AppText fs={24}>Welcome!</AppText>
                <AppText fs={16} color={colors.tomato}>Create your account.</AppText>

                <Formik
                    initialValues={{ mobile: '', first_name: '', last_name: '', password: '', çonfirm_password: '', usertype: '' }}
                    onSubmit={values => {

                        values.usertype = usertype.value;

                        setM(values.mobile);
                        setFName(values.first_name);
                        setLname(values.last_name);
                        setPass(values.password);
                        setUseTy(usertype.value);

                        // save data in sqlite

                        insertData();

                        // saveData({ values });

                        // fetch("http://192.168.8.152:80/myNote/userSave.php", {
                        //     method: "POST",
                        //     body: values,
                        //     headers: {
                        //         "Content-Type": "application/json",
                        //     }
                        // }).then(response => {
                        //     if (!response.ok) {
                        //         throw new Error("Response error from php");
                        //     }
                        //     return response.text();

                        // }).then(data => {
                        //     console.log(data);
                        //     Alert.alert("Save Data", "Successfully..");

                        // }).catch(error => {
                        //     console.log(error);
                        //     Alert.alert("Error", "Server side error");
                        // });


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
                                placeholder="mobile"
                                onChangeText={handleChange('mobile')}
                            />
                            <AppText fs={12} color='red'>{errors.mobile}</AppText>

                            <AppTextInput
                                icon="page-first"
                                autoCorrect={false}
                                autoComplete='off'
                                maxLength={20}
                                placeholder="first name"
                                onChangeText={handleChange('first_name')}
                            />
                            <AppText fs={12} color='red'>{errors.first_name}</AppText>

                            <AppTextInput
                                icon="page-first"
                                autoCorrect={false}
                                autoComplete='off'
                                maxLength={20}
                                placeholder="last name"
                                onChangeText={handleChange('last_name')}
                            />
                            <AppText fs={12} color='red'>{errors.last_name}</AppText>

                            <AppCombobox
                                title="Select User Type"
                                icon={'apps'}
                                items={user_type}
                                placeholder={'User type'}
                                selectedItem={usertype}
                                onSelectItem={
                                    item => {
                                        setUsertype(item);
                                        handleChange('usertype');
                                    }
                                }
                            />
                            <AppText fs={12} color='red'>{errors.userType}</AppText>

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

                            <AppTextInput
                                icon="lock"
                                autoCapitalize="none"
                                autoCorrect={false}
                                autoComplete='off'
                                placeholder="confirm password"
                                secureTextEntry
                                textContentType="password"
                                onChangeText={handleChange('çonfirm_password')}
                            />
                            <AppText fs={12} color='red'>{errors.çonfirm_password}</AppText>

                            <AppButton onPress={handleSubmit} title="Signup" color='tomato' />
                        </>
                    )}
                </Formik>


                <AppText fs={12}>If you have an account, please login</AppText>
                <Button title='Login' color={colors.danger} onPress={() => { navigation.navigate("Login"); }} />

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
        width: 150,
        height: 150,
        alignSelf: 'center',
        // marginBottom: 50,
        objectFit: 'contain'
    }
});