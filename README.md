# ChatApp

ChatApp is a real-time messaging application built with React Native, Firebase, and Expo. This app allows users to send and receive messages, share images, and even send their current location. It also supports offline message caching using AsyncStorage.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Firebase Configuration](#firebase-configuration)
- [Running the App](#running-the-app)
- [Project Structure](#project-structure)
- [Components](#components)
  - [Start Screen](#start-screen)
  - [Chat Screen](#chat-screen)
  - [CustomActions Component](#customactions-component)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Features

- **Real-time messaging:** Send and receive messages in real-time.
- **Media sharing:** Upload images from your library or take a new photo using your camera.
- **Location sharing:** Share your current location with others in the chat.
- **Offline support:** Messages are cached locally when offline and synced once reconnected.
- **Customizable UI:** Users can set their preferred background color for the chat screen.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Firebase Project](https://firebase.google.com/)

### Clone the Repository

```bash
git clone https://github.com/yourusername/chatapp.git
cd chatapp
```

### Install Dependencies

```bash
npm install
```

## Firebase Configuration

To use Firebase for authentication, Firestore for data storage, and Firebase Storage for media uploads, you need to configure Firebase in your project.

1. Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
2. Add a new web app to your Firebase project.
3. Copy your Firebase configuration and paste it into the `App.js` file where the Firebase is initialized:

   ```javascript
   const firebaseConfig = {
     apiKey: 'YOUR_API_KEY',
     authDomain: 'YOUR_AUTH_DOMAIN',
     projectId: 'YOUR_PROJECT_ID',
     storageBucket: 'YOUR_STORAGE_BUCKET',
     messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
     appId: 'YOUR_APP_ID',
   };
   ```

4. Enable Firestore and Firebase Storage in the Firebase Console.

## Running the App

After setting up Firebase and installing dependencies, you can start the app using Expo:

```bash
npm start
```

This will open Expo Developer Tools in your browser. You can then run the app on an emulator or your physical device using the Expo Go app.

## Project Structure

```
├── components
│   ├── Start.js           # Start screen component
│   ├── Chat.js            # Chat screen component
│   ├── CustomActions.js   # Custom actions for media and location sharing
├── App.js                 # Main application entry point
├── README.md              # Project documentation
├── package.json           # Project metadata and dependencies
└── ...
```

## Components

### Start Screen

The `Start` component is the landing page where users can enter their name and select a background color for the chat screen.

### Chat Screen

The `Chat` component handles the core messaging functionality, including sending and receiving messages, displaying media, and handling location data. It uses the `GiftedChat` library for an enhanced chat UI.

### CustomActions Component

The `CustomActions` component provides additional options for the user, such as sending images and sharing their location. This component integrates with Firebase Storage to upload media files and stores references in Firestore.

```javascript
const CustomActions = ({
  wrapperStyle,
  iconTextStyle,
  onSend,
  storage,
  userID,
}) => {
  // Code for handling image upload and location sharing
};
```

### Key Methods:

- **`generateReference(uri)`**: Generates a unique reference for each uploaded image.
- **`uploadAndSendImage(imageURI)`**: Uploads the image to Firebase Storage and sends the download URL as a message.
- **`pickImage()`**: Opens the user's image library to select an image.
- **`takePhoto()`**: Launches the camera to take a photo.
- **`getLocation()`**: Fetches the user's current location and sends it as a message.

## Troubleshooting

- **Image Not Displaying Correctly**: Ensure that the image URL is correctly stored in Firestore and the file is properly uploaded to Firebase Storage. Check console logs for any errors during upload.
- **Permissions Errors**: Ensure that the app has the necessary permissions for accessing the camera, photo library, and location services.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
