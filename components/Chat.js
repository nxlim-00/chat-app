import { useEffect, useState } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import {
  onSnapshot,
  query,
  orderBy,
  collection,
  addDoc,
} from 'firebase/firestore';

const Chat = ({ route, navigation, db }) => {
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

  // useEffect hook to set messages options
  // Create a query to get the "messages" collection from the Firestore database
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
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));

    // Subscribe to changes in the "messages" collection using onSnapshot.
    // This function will be called whenever there are changes in the collection.
    const unsubMessages = onSnapshot(q, (documentsSnapshot) => {
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
      setMessages(newMessages);
    });

    // Clean up code
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userID,
          name: name,
        }}
      />
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
