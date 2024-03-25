import { Image, StyleSheet, View } from 'react-native';
import AppText from './AppText';
import colors from '../config/colors';
import AppButton from './AppButton';

function AppListItem({ title, subTitle, onPressTitle, onPress, date, imgPath}) {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={imgPath} />
            <View style={styles.text}>
                <AppText onPress={onPressTitle} fs={22} numberOfLines={1}>{title}</AppText>
                <AppText fs={18} color={colors.primary} numberOfLines={3}>{subTitle}</AppText>
            </View>
            <View style={styles.deleteButton}>
                <AppText fs={12} >{date}</AppText>
                <AppButton title={"X"} onPress={onPress} color='danger' />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        shadowColor: colors.gray,
        backgroundColor: "#F0F8FF",
        borderRadius: 15,
        width: "100%",
        padding: 5,
        borderColor: colors.black,
        borderStyle: 'solid',
        borderWidth: 2,
        marginBottom: 8

    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 50,
        marginRight: 10
    },
    title: {
        fontSize: 12,
        fontWeight: "500"
    },
    subTitle: {
        fontWeight: "500",
    },
    deleteButton: {
        flexGrow: 1,

        alignItems: 'flex-end',
        marginTop: 10,
        width: 120,
    },
    text: {
        width: 150,
    }
})

export default AppListItem;