import { StyleSheet, Pressable } from 'react-native';
import AppText from './AppText';

export function ComboboxItem({ label, onPress,handle }) {
    return (
        <Pressable onPress={onPress}>
            <AppText fs={18} pd={15} style={styles.text}>{label}</AppText>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    text: { padding: 20 },
});