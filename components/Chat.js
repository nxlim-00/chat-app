import { useEffect, useState } from 'react';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import {
  onSnapshot,
  query,
  orderBy,
  collection,
  addDoc,
} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

const Chat = ({ route, navigation, db, isConnected, storage }) => {
  const { userID } = route.params;
  const { name, backgroundColor } = route.params;
  const [messages, setMessages] = useState([]);
  const onSend = (newMessages) => {
    addDoc(collection(db, 'messages'), newMessages[0]);
  };

  // changing color font depending on darkness of background color
  const fontColor =
    backgroundColor === '#090C08' ||
    backgroundColor === '#474056' ||
    backgroundColor === '#000'
      ? '#fff'
      : '#000';

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000',
          },
          left: {
            backgroundColor: '#FFF',
          },
        }}
      />
    );
  };

  // prevent user from sending message when offline
  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  };

  // useEffect hook to set messages options
  // Create a query to get the "messages" collection from the Firestore database
  let unsubMessages;
  useEffect(() => {
    navigation.setOptions({
      title: name,
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    });
    // check if user is connected to internet
    if (isConnected === true) {
      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));

      // Subscribe to changes in the "messages" collection using onSnapshot
      // This function will be called whenever there are changes in the collection
      unsubMessages = onSnapshot(q, async (documentsSnapshot) => {
        // Initialize an empty array to store the new messages
        let newMessages = [];
        // Iterate through each document in the snapshot
        documentsSnapshot.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
    } else loadCachedMessages();

    // Clean up code
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected]);

  const loadCachedMessages = async () => {
    const cachedMessages = (await AsyncStorage.getItem('messages')) || [];
    setMessages(JSON.parse(cachedMessages));
  };

  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  const renderCustomActions = (props) => {
    return <CustomActions onSend={onSend} storage={storage} {...props} />;
  };

  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  };

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <ActionSheetProvider>
        <GiftedChat
          messages={messages}
          renderBubble={renderBubble}
          renderActions={renderCustomActions}
          renderCustomView={renderCustomView}
          renderInputToolbar={renderInputToolbar}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: userID,
            name: name,
          }}
        />
      </ActionSheetProvider>
      {Platform.OS === 'android' ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
