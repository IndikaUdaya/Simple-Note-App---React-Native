import { Alert, Button, Image, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { StackActions, navigation } from '@react-navigation/native';
import * as SQLite from 'expo-sqlite';

import AppText from '../components/AppText';
import colors from '../config/colors';
import { useEffect } from 'react';

export default function HomeScreen({ navigation, route }) {

    const dbSQL = SQLite.openDatabase("my_note.db");

    logout = () => {
        dbSQL.transaction(tx => {
            tx.executeSql('UPDATE user SET status=? WHERE mobile=? ',
                ['deactive', route.params.mobile],
                (trObj, resultSet) => {
                    navigation.dispatch(
                        StackActions.popToTop("Welcome")
                    )
                },
                (trObj, error) => {
                    Alert.alert("Login", error.message);
                }
            );
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='auto' hidden={false} />

            <View style={styles.hedarText}>
                <AppText >Welcome Back!</AppText>
                <AppText fs={28} color={colors.danger}>{route.params.first_name + " " + route.params.last_name}</AppText>
            </View>

            <View style={{ flexDirection: 'row' }}>
                <Pressable onPress={() => { navigation.navigate('Add New Note', route.params); }}>
                    <View style={styles.view1}>
                        <Image style={styles.image} source={require('../assets/add-note-icon-2.jpg')} />
                        <AppText fs={18}  >Add New Note</AppText>
                    </View>
                </Pressable>
                <Pressable onPress={() => { navigation.navigate('View All Note', route.params); }}>
                    <View style={styles.view2}>
                        <Image style={styles.image} source={require('../assets/savenote.png')} />
                        <AppText fs={18}>View Note</AppText>
                    </View>
                </Pressable>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Pressable onPress={() => { Alert.alert("About Me", "I am Indika Udaya. I'm an undergraduate student at Java Institute in 2nd year.") }}>
                    {/* <View style={styles.view3}></View> */}
                    <View style={styles.view4}>
                        <Image style={styles.image} source={require('../assets/about.png')} />
                        <AppText fs={18}>About</AppText>
                    </View>
                </Pressable>
            </View>

            <View style={{ marginTop: 50 }}>
                <Button color={colors.success} title='Signout' onPress={logout} />
            </View>

        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    view1: {
        width: 175,
        height: 175,
        backgroundColor: 'tamato',
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        marginBottom: 5,
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'red',
        borderWidth: 2,
    },
    view2: {
        width: 175,
        height: 175,
        backgroundColor: 'pink',
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'red',
        borderWidth: 2,
    },
    view3: {
        width: 175,
        height: 175,
        backgroundColor: 'orage',
        borderBottomLeftRadius: 30,
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    view4: {
        width: 175,
        height: 175,
        backgroundColor: 'yellow',
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'red',
        borderWidth: 2,
        shadowColor: 'black'
    },
    image: {
        width: 160, height: 160, flex: 5,
    },
    hedarText: {
        marginBottom: 30,
        alignItems: 'center'
    }
});