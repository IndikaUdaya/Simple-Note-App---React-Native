import { Alert, Button, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';

import { useEffect, useState } from 'react';
import * as Yup from 'yup'
import { Formik } from "formik";
import * as SQLite from 'expo-sqlite';
import { StackActions, navigation } from '@react-navigation/native';

import AppText from '../components/AppText';
import { AppTextInput } from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import { AppCombobox } from '../components/AppCombobox';
import colors from '../config/colors';

const category = [
    { label: "Study", value: "1" },
    { label: "Work", value: "2" },
    { label: "Travel", value: "3" },
    { label: "Personal", value: "4" }
]

const validation = Yup.object().shape({
    title: Yup.string().required().min(7).label('Title'),
    description: Yup.string().required().min(10).label('Description'),
});

export default function AddNote({ navigation, route }) {

    const [categoryType, setCategoryType] = useState(category[1]);
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();

    const dbSQL = SQLite.openDatabase("my_note.db");
    
    insertData = () => {

        const d = new Date();
        let datetime = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + "";
        
        dbSQL.transaction((tx) => {
            tx.executeSql('INSERT INTO note(title,description,category,date,mobile_id) VALUES (?,?,?,?,?)',
                [title, description, categoryType.value, datetime, route.params.mobile],
                (txObj, resultSet) => {
                    Alert.alert("Note added Successfully..", "Add more note");                  
                },
                (txObj, error) => { Alert.alert("Save Data Error", error.message); }
            );
        });
    };

    return (

        <ScrollView>
            <SafeAreaView style={styles.container}>
                <StatusBar style='auto' hidden={false} />

                <Image
                    style={styles.logo}
                    source={require('../assets/addNewNote.png')} />

                <AppText fs={20}>Add New Note</AppText>

                <Formik                
                    initialValues={{ title: '', description: '', category: '' }}
                    onSubmit={(values, {resetForm}) => {

                        setTitle(values.title);
                        setDescription(values.description);

                        insertData();
                        resetForm({values:''});

                        // fetch("http://IP address/addNote.php", {
                        //     method: "POST",
                        //     body: values,
                        //     headers: {
                        //         "Content-Type": "application/json",
                        //     }
                        // }).then(response => {
                        //     if (!response.ok && response.status != 200) {
                        //         throw new Error("Response error from php");
                        //     }
                        //     return response.text();

                        // }).then(data => {
                        //     console.log(data);
                        // }).catch(error => {
                        //     Alert.alert("Save Note", error);
                        // });

                       
                    }}
                    validationSchema={validation}
                >
                    {({ handleChange, handleSubmit, errors }) => (
                        <>                    
                            <AppTextInput
                                icon="alpha-t-box"
                                autoComplete='off'
                                autoFocus={false}
                                // value={Formik.values.title}
                                maxLength={30}
                                placeholder="title"
                                onChangeText={handleChange('title')}
                            />
                            <AppText fs={12} color='red'>{errors.title}</AppText>

                            <AppTextInput
                                icon="beaker"
                                autoCorrect={false}
                                // value={Formik.values.description}
                                autoComplete='off'
                                placeholder="description"
                                onChangeText={handleChange('description')}
                                multiline={true}
                            />
                            <AppText fs={12} color='red'>{errors.description}</AppText>

                            <AppCombobox
                                title="Select Category"
                                icon={'dice-6'}
                                items={category}                                
                                placeholder={'category'}
                                selectedItem={categoryType}
                                onSelectItem={
                                    item => {
                                        setCategoryType(item);
                                        handleChange('category');
                                    }
                                }
                            />
                            {/* <AppText fs={12} color='red'>{errors.category}</AppText> */}

                            <AppButton onPress={handleSubmit} title="Save" color='tomato' />
                        </>
                    )}
                </Formik>
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
        alignItems: 'center',
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