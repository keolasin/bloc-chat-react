import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';
import Chatroom from './components/Chatroom.js';
import User from './components/User.js';

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
      user: {} // user signed in, default 'guest'
    }
  }

  setUser(user){
    console.log(user);
    this.setState( {user: user} ); // user state assigned to the google user who signs in from User component
    console.log(this.state.user);
  }

  handleRoomClick(room){
    this.setState( {activeRoom: room } ); // assigning clicked room object to state
  }

  render() {
    return (
      <div className="App">
        <RoomList firebase={firebase}
                  activeRoom={this.state.activeRoom}
                  handleRoomClick={(event)=>this.handleRoomClick(event, this.room)} />
        <Chatroom firebase={firebase}
                  activeRoom={this.state.activeRoom}/>
        <User firebase={firebase}
              setUser={(event)=>this.setUser(event, this.user)} user={this.state.user} />
        <section className="modal"></section>
      </div>
    );
  }
}

export default App;
