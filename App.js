import WelcomeScreen from './app/screens/WelcomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import LoginScreen from './app/screens/LoginScreen'
import Signup from './app/screens/Signup';
import NoteList from './app/screens/NoteList';
import AddNote from './app/screens/AddNote';
import HomeScreen from './app/screens/HomeScreen';
import FullDetailsScreen from './app/screens/FullDetailsScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name='Welcome' component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={Signup} />

        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Add New Note" component={AddNote} />
        <Stack.Screen name="View All Note" component={NoteList} />
        <Stack.Screen name="Full Details" component={FullDetailsScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}


