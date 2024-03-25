import { SafeAreaView, ScrollView, StatusBar, StyleSheet, FlatList, Alert, Text, View, Image } from 'react-native';
import * as SQLite from 'expo-sqlite';
import React, { useEffect, useState } from 'react';
import { navigation } from '@react-navigation/native';

import AppListItem from '../components/AppListItem';

const category = [
    { label: "Study", value: "1", imagePath: "'../assets/icons/study.jpg'" },
    { label: "Work", value: "2", imagePath: "'../assets/icons/work.png'" },
    { label: "Travel", value: "3", imagePath: "'../assets/icons/travel.png'" },
    { label: "Personal", value: "4", imagePath: "'../assets/icons/personal.png'" }
];

export default function NoteList({ navigation,route }) {

    const [noteData, setNoteData] = useState([]);

    const dbSQL = SQLite.openDatabase("my_note.db");

    useEffect(() => {
        noteDataFromDB();
    }, []);

    noteDataFromDB = () => {
        dbSQL.transaction(tx => {
            tx.executeSql('SELECT * FROM note WHERE mobile_id=? ORDER BY date DESC',
            [route.params.mobile],
                (txObj, resultSet) => {                   
                    setNoteData(resultSet.rows._array);
                },
                (txObj, error) => console.log("Search data error bacause " + error)
            );
        });
    }

    deleteData = (id) => {

        Alert.alert(
            'Do you want to delete this note?',
            'Are you sure?',
            [
                {
                    text: 'Yes', onPress: () => {
                        dbSQL.transaction((tx) => {
                            tx.executeSql('DELETE FROM note WHERE id=?', [id],
                                (txObj, resultSet) => {
                                    Alert.alert("Delete", "Successfully");
                                    noteDataFromDB();
                                },
                                (txObj, error) => {
                                    Alert.alert("Delete", error);
                                }
                            );
                        });
                    }
                },
                { text: 'No', onPress: () => console.log('Cancelled.'), style: 'cancel' },
            ],
            {
                cancelable: true
            }
        );
    }

    return (
        <SafeAreaView style={styles.container}>

            <StatusBar style='auto' hidden={false} />

            <FlatList
                data={noteData}
                renderItem={(items) => {
                    // console.log(items.item.img);

                    let p = items.item.category;
                    let a;

                    switch (p) {
                        case '1':
                            a = require('../assets/icons/study.jpg');
                            break;
                        case '2':
                            a = require('../assets/icons/work.png');
                            break;
                        case '3':
                            a = require('../assets/icons/travel.png');
                            break;
                        case '4':
                            a = require('../assets/icons/personal.png');
                            break;
                    }

                    return (

                        <AppListItem
                            onPressTitle={() => {
                                navigation.navigate('Full Details', items.item);
                            }}
                            imgPath={a}
                            title={items.item.title}
                            date={items.item.date}
                            subTitle={items.item.description}
                            onPress={() => {
                                deleteData(items.item.id);
                            }}
                        />
                    )
                }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        //    justifyContent: 'center',
    }
});

