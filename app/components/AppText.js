import React from 'react';
import { Platform, StyleSheet, Text } from 'react-native';
import { useFonts } from 'expo-font';
import colors from '../config/colors';

let fontStatus=false;

function AppText({ children,fs=35,pd=1,color=colors.black,...otherPara}) {

    const [fontsLoaded, fontError] = useFonts({
        'CGB': require('../assets/fonts/CormorantGaramond-Bold.ttf'),
        'CGR': require('../assets/fonts/CormorantGaramond-Regular.ttf'),
    });

    fontStatus = fontsLoaded;

    return (
        <Text  style={[styles.text,{fontSize:fs},{color:color},{padding:pd}]} {...otherPara}>{children}</Text>
    );
}

const styles = StyleSheet.create({
    text: {        
        fontFamily: Platform.OS === "android" ? fontStatus ? 'CGB' : 'Roboto' : fontStatus ? 'CGB' : 'Avenir'
   
    }
})

export default AppText;