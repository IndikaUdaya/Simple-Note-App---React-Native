import { View, StyleSheet, TextInput, Pressable, Modal, Button, FlatList } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from '../config/colors';
import AppText from './AppText';
import React, { useState } from 'react';
import { ComboboxItem } from './ComboboxItem';

export function AppCombobox({ icon, items, placeholder, onSelectItem, selectedItem }) {

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <React.Fragment>

            <Pressable onPress={() => setModalVisible(true)} style={styles.container}>

                {icon && <MaterialCommunityIcons name={icon} size={30} color={colors.black} style={styles.icon} />}
                <AppText fs={18}>{selectedItem ? selectedItem.label : placeholder}</AppText>

                <MaterialCommunityIcons style={{ marginLeft: 180 }} name='chevron-down' size={30} color={colors.black} />

            </Pressable>

            <Modal visible={modalVisible} animationType='slide'>
                <Button title='Close' onPress={() => setModalVisible(false)} />
                <FlatList data={items}
                    keyExtractor={(item) => item.value}
                    renderItem={({ item }) =>
                        <ComboboxItem label={item.label}
                            onPress={() => {
                                setModalVisible(false);
                                onSelectItem(item);
                            }}
                        />}
                />
            </Modal>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.lightCyan,
        borderRadius: 20,
        flexDirection: 'row',
        width: "95%",
        padding: 15,
        marginVertical: 10,       
        justifyContent: 'start'
    },
    icon: {
        marginRight: 10
    },

});