# Mobile Flashcards React Native App

This is an app build using React Native that allows users to create different decks of flashcards and quiz themselves.

## Install and Run 

Make sure you have [https://nodejs.org/en/](Node) installed in your machine.

Navigate to the MobileFlashcards repository and run:

```
yarn install
yarn start
```.

That will start the the development server. 

You can use the application by: 
1. Downloading the Expo App ([https://play.google.com/store/apps/details?id=host.exp.exponent](Android) and [https://itunes.apple.com/us/app/expo-client/id982107779?mt=8(iOS)) in your phone and scanning the generated QRCode;
2. Pressing `i` to open iOS emulator; 
3. Pressing `a` to open Android emulator.

## Usage 

The Decks page shows the default decks: 
- React
- JavaScript
- Redux

The Add Deck page allows the user to create a new deck.

Clicking in one decks gives you some options: 

- Add a new question to the deck
- Start the deck quiz 

The Quiz view show the question and a "Answer" button that allows the users to flip the card by default. 
Clicking the "Answer" button allows the users to select if their answer were "Correct" or "Incorrect".

After the last flashcards the Quiz Result page shows the percentage of right answers and gives to the users the option of "Restart Quiz" or go "Back to Deck". 