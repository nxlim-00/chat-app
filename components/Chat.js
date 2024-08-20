import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';

const Chat = ({ route, navigation }) => {
  const { name, backgroundColor } = route.params;

  // changing color font depending on darkness of background color
  const fontColor =
    backgroundColor === '#090C08' || backgroundColor === '#474056'
      ? '#fff'
      : '#000';

  // Set the title and header color for the chat screen
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
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <Text style={{ color: fontColor }}>Hello {name}!</Text>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Chat;
