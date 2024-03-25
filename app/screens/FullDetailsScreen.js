import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { navigation } from '@react-navigation/native';

import AppText from '../components/AppText';


export default function FllDetailsScreen({ navigation, route }) {
    return (
        <ScrollView>
            <SafeAreaView>
                <StatusBar style='auto' hidden={false} />

                <View style={styles.container}>
                    <AppText >Title</AppText>
                    <AppText fs={24} color='red' numberOfLines={2}>{route.params.title}</AppText>

                    <AppText >Added Date </AppText>
                    <AppText fs={24} color='green' numberOfLines={2}>{route.params.date}</AppText>

                    <AppText >Description </AppText>
                    <AppText fs={18} numberOfLines={30}>{route.params.description}</AppText>
                </View>

            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    }
});

