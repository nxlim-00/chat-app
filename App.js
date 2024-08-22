import { StyleSheet } from 'react-native';
// import the screens
import Start from './components/Start';
import Chat from './components/Chat';
// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// create navigator
const Stack = createNativeStackNavigator();

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from 'firebase/firestore';
import { useEffect } from 'react';
import { LogBox, Alert } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { getStorage } from 'firebase/storage';

LogBox.ignoreLogs([
  '[2024-08-22T18:34:02.213Z]  @firebase/auth: Auth (10.3.1)',
]);

const App = () => {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: 'AIzaSyBjUPHWX_6u9gs6556EInkLYawoJVKUeEI',
    authDomain: 'chatapp-e7706.firebaseapp.com',
    projectId: 'chatapp-e7706',
    storageBucket: 'chatapp-e7706.appspot.com',
    messagingSenderId: '708281788141',
    appId: '1:708281788141:web:220dfa218c963c2a54cee4',
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);
  // storage from firebase storage
  const storage = getStorage(app);

  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert('Connection Lost!');
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              storage={storage}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
