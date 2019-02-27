import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Chatroom extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      messages: []
    }

    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.messagesRef = this.props.firebase.database().ref('Messages');
  }

  componentDidMount(){
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      this.setState( { messages: this.state.messages.concat(message.key) } );
    });
  }

  render(){
    return(
      <section className='chat-container'>
        <h2>{this.props.activeRoom}</h2>
        <content>

        </content>
      </section>
    );
  }
}

export default Chatroom;
