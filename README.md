
# Chat App

This is a simple Chat App built using React Native and Expo. The application allows users to choose a background color, input their name, and start chatting in a chat screen with a custom background.

## Features

- **Start Screen**: Allows users to enter their name and select a background color.
- **Chat Screen**: Displays a chat interface with the user's chosen background color and appropriately styled text.
- **Custom Navigation**: The app uses React Navigation for transitioning between the Start and Chat screens.

## Technologies Used

- **React Native**: For building the user interface.
- **Expo**: For ease of development and deployment.
- **React Navigation**: For handling navigation between screens.

## File Structure

```bash
├── App.js              # Entry point of the app
├── components/
│   ├── Start.js        # Start screen component
│   └── Chat.js         # Chat screen component
└── assets/
    ├── Background Image.png   # Background image for the start screen
    ├── icon.svg               # Icon used in the text input
```

### Components

- **`Start.js`**: This component allows the user to input their name and select a background color. When the user clicks "Start Chatting", they are navigated to the Chat screen with their chosen settings.

- **`Chat.js`**: This component displays a chat screen with the background color chosen by the user on the Start screen. The text color is adjusted dynamically based on the background color for readability.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
