import { View, StyleSheet, TextInput } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from '../config/colors';

export function AppTextInput({ icon,...other }) {
    return (
        <View style={styles.container}>
            {icon && <MaterialCommunityIcons name={icon}  size={30} color={colors.black} style={styles.icon}/>}
            <TextInput style={styles.textInput} {...other} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.lightCyan,
        borderRadius: 20,
        flexDirection: 'row',
        width: "95%",
        padding: 15,
        marginVertical: 10
    },
    textInput: {
        fontSize: 18,
        overflow: 'scroll',
    },
    icon:{
        marginRight:10
    }
});