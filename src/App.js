import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';


// Initialize Firebase
var config = {
  apiKey: "AIzaSyAZjzpTf1LrKBqp-44ALeCtHaj2dxXCu0o",
  authDomain: "bloc-chat-af605.firebaseapp.com",
  databaseURL: "https://bloc-chat-af605.firebaseio.com",
  projectId: "bloc-chat-af605",
  storageBucket: "bloc-chat-af605.appspot.com",
  messagingSenderId: "166282699186"
}
firebase.initializeApp(config);


class App extends Component {
  render() {
    return (
      <div className="App">
        <RoomList firebase={firebase} />
        <section className="modal"></section>
      </div>
    );
  }
}

export default App;
