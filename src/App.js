import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';


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
      activeRoom: {}
    }

    this.handleRoomClick = this.handleRoomClick.bind(this);
  }

  handleRoomClick(event){
    this.setState( {activeRoom: event.target.innerHTML } );
  }

  render() {
    return (
      <div className="App">
        <RoomList firebase={firebase}
                  activeRoom={this.state.activeRoom}
                  handleRoomClick={this.handleRoomClick} />
        <MessageList firebase={firebase}
                     activeRoom={this.state.activeRoom}/>
        <section className="modal"></section>
      </div>
    );
  }
}

export default App;
