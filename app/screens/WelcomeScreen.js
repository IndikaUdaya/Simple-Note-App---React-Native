import { Alert, Image, ImageBackground, StyleSheet, View } from 'react-native';
import { CommonActions, StackActions, navigation } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';
import { useEffect } from 'react';

import AppText from '../components/AppText';
import AppButton from '../components/AppButton';

const userType = [
    { label: "Employee", value: "1" },
    { label: "Student", value: "2" }
]

export default function WelcomeScreen({ navigation }) {

    const dbSQL = SQLite.openDatabase("my_note.db");

    useEffect(() => {
        console.log("useEffect");
        checkDataForDeactivateScreen();
    }, []);

    checkDataForDeactivateScreen = () => {
        dbSQL.transaction(tx => {
            tx.executeSql('SELECT * FROM user WHERE status=?', ['active'],
                (trObj, resultSet) => {
                    
                    if (resultSet.rows.length == 0) {                       
                    } else {
                        let obj;
                        resultSet.rows._array.forEach(element => {
                            obj = element;
                        });

                        navigation.dispatch(
                            StackActions.replace("Home", obj)
                        )
                    }

                },
                (trObj, error) => {
                    // Alert.alert("Login", error.message);
                }
            );
        });
    }

    return (
        <ImageBackground style={styles.background} resizeMode="cover" source={require('../assets/background.jpg')}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../assets/notebook_icon.png')} />
                <AppText style={styles.mainText}>MyNotes</AppText>
            </View>
            <View style={styles.buttonContainer}>
                <AppButton title="Login" color='success' onPress={() => { navigation.navigate("Login"); }} />
                <AppButton title="Register" color='tomato' onPress={() => { navigation.navigate("Signup"); }} />
            </View>
        </ImageBackground>
    );
}


const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    buttonContainer: {
        padding: 25,
        width: '100%'
    },
    logo: {
        width: 150,
        height: 150,
    },
    logoContainer: {
        position: 'absolute',
        top: 80,
        alignItems: 'center'
    },
    mainText: {
        fontSize: 30,
    }
})
