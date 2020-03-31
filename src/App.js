import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';
import Chatroom from './components/Chatroom.js';
import User from './components/User.js';
import About from './components/About.js';

// Initialize Firebase
var config = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId
}
firebase.initializeApp(config);


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeRoom: {}, // currently selected room name/value
      user: {}, // user signed in, default 'guest'
    }
  }

  setUser(user){
    this.setState( {user: user} ); // user state assigned to the google user who signs in from User component
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
                  activeRoom={this.state.activeRoom}
                  user={this.state.user}
                  messageAdded={this.state.messageAdded}/>
        <User firebase={firebase}
              setUser={(event)=>this.setUser(event, this.user)} user={this.state.user} />>
        <section className="modal"></section>
      </div>
    );
  }
}

export default App;
