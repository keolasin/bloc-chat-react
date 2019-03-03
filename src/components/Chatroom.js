import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Chatroom extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      messages: [], // all messages pulled from firebase
      activeMessages: [] // messages with matching roomId to activeRoom
    }

    this.messagesRef = this.props.firebase.database().ref('messages');
    console.log(this.messagesRef);
  }

  componentDidMount(){
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      console.log(message);
      this.setState( { messages: this.state.messages.concat(message) } );
      }
    );
  }

  componentDidUpdate(prevProps){
    if (this.props.activeRoom !== prevProps.activeRoom){
      console.log('Props did update.');
      this.getActiveRoomMessages();
    }
  }

  getActiveRoomMessages(){
    // pulling messages with message.roomId matching this.props.activeRoom.key
    console.log('getActiveRoomMessages called');
    this.setState( {activeMessages: this.state.messages.filter( message =>
      message.roomId == this.props.activeRoom.key)}
    );
  }

  timeConverter(time){
    let date = new Date(time);
    let hour = date.getHours();
    let minutes = '0'+date.getMinutes();
    let seconds = '0'+date.getSeconds();

    return `${hour}:${minutes.substr(-2)}:${seconds.substr(-2)} on ${date}`;
  }

  render(){
    return(
      <article className='chatroom-container'>
        <header>
          <h1 className='room-name'>{this.props.activeRoom.name}</h1>
        </header>
        {this.state.activeMessages.map( message =>
          <section className='message-container'
                   key={message.key}>
            <p className='message-content'>{message.content}</p>
            <p className='message-sentAt'>{this.timeConverter(message.sentAt)}</p>
            <p className='message-username'>{message.username}</p>
          </section>
        )}
      </article>
    );
  }
}

export default Chatroom;
