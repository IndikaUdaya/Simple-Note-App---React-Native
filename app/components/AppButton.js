import { StyleSheet, Text, Pressable } from 'react-native';

import colors from '../config/colors';

function AppButton({ title, onPress, color = "success" }) {

    return (
        <Pressable style={[styles.button,{backgroundColor:colors[color]}]} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        // backgroundColor: colors.success,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        width: '100%',
        marginVertical:5
    },
    text: {
        color: colors.white,
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        alignItems:'center',
        justifyContent:'center'
    }
});

export default AppButton;