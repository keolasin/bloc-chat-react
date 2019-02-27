import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';
import Chatroom from './components/Chatroom.js';


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
  constructor(props){
    super(props);
    this.state = {
      activeRoom: '', // currently selected room name/value
      activeRoomId: '' // currently selected room key (for firebase)
    }

    this.handleRoomClick = this.handleRoomClick.bind(this);
  }

  handleRoomClick(event, room){
    this.setState( {activeRoom: room.name } ); // assigning clicked room name to state
    this.setState( {activeRoomId: room.key}); // assigning clicked room key to state
    console.log(this.state.activeRoomId);
  }

  render() {
    return (
      <div className="App">
        <RoomList firebase={firebase}
                  activeRoom={this.state.activeRoom}
                  handleRoomClick={this.handleRoomClick} />
        <Chatroom firebase={firebase}
                  activeRoom={this.state.activeRoom}/>
        <section className="modal"></section>
      </div>
    );
  }
}

export default App;
