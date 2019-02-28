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
      activeRoom: {}, // currently selected room name/value
    }
  }

  handleRoomClick(room){
    this.setState( {activeRoom: room } ); // assigning clicked room object to state
    console.log('active room is now ' +this.state.activeRoom.name);
  }

  render() {
    return (
      <div className="App">
        <RoomList firebase={firebase}
                  activeRoom={this.state.activeRoom}
                  handleRoomClick={(event)=>this.handleRoomClick(event, this.room)} />
        <Chatroom firebase={firebase}
                  activeRoom={this.state.activeRoom}/>
        <section className="modal"></section>
      </div>
    );
  }
}

export default App;
