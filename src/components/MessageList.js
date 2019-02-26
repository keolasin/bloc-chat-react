import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class MessageList extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      message: ''
    }

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount(){
    // pulling each room in the database and returning the key (name) and value stored there (room1, room2, etc.)
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
    });
  }

  render(){
    return(
      <section className='message-container'>

      </section>
    );
  }
}

export default MessageList;
