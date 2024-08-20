import React, { useState } from 'react';
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF'); // Default background color

  const backgroundColorList = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];

  return (
    <ImageBackground
      source={require('../img/Background Image.png')}
      style={[styles.container, { backgroundColor: backgroundColor }]} // Apply the selected background color
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Chat App</Text>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          {/* <Image
            source={require('../img/icon.svg')} // Replace with your image path
            style={styles.icon}
          /> */}
          <TextInput
            style={styles.textInput}
            placeholder="Your Name"
            onChangeText={setName}
            value={name}
            placeholderTextColor="#757083"
          />
        </View>
        <View>
          <Text style={styles.chooseColorText}>Choose a Background Color:</Text>
          <View style={styles.colorContainer}>
            {backgroundColorList.map((color, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.colorOption,
                  {
                    backgroundColor: color,
                    borderWidth: backgroundColor === color ? 2 : 0,
                    borderColor: '#FFF',
                  },
                ]}
                onPress={() => setBackgroundColor(color)}
              />
            ))}
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Chat', { name, backgroundColor })}
          style={styles.startButton}
        >
          <Text style={styles.startButtonText}>Start Chatting</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 45,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    marginTop: 50,
  },
  inputContainer: {
    flex: 1,
    width: '90%',
    padding: 10,
    marginBottom: 40,
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#333',
    shadowOffset: { width: 10, height: 10 },
  },
  textInput: {
    width: '88%',
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    padding: 15,
    width: '88%',
    marginTop: 15,
    marginBottom: 15,
  },
  /* icon: {
    width: 20, // Adjust size as needed
    height: 20, // Adjust size as needed
    marginRight: 10,
  }, */
  textInput: {
    flex: 1,
    color: '#757083',
  },
  chooseColorText: {
    color: '#757083',
    fontSize: 16,
    marginBottom: 20,
    fontWeight: '300',
    opacity: 0.5,
  },
  colorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  startButton: {
    width: '88%',
    height: 50,
    marginTop: 20,
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
});

export default Start;
