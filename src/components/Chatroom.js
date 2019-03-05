import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MessageField from './MessageField.js'

class Chatroom extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      messages: [], // all messages pulled from firebase
      activeMessages: [], // messages with matching roomId to activeRoom
      messageAdded: false
    }

    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount(){
    this.refreshMessages();
  }

  refreshMessages(){
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState( { messages: this.state.messages.concat(message)});
    });
  }

  componentDidUpdate(prevProps, prevState){
    if (this.props.activeRoom !== prevProps.activeRoom){
      this.getActiveRoomMessages();
    }
    if (this.state.messageAdded !== prevState.messageAdded){
      this.getActiveRoomMessages();
      this.setState({messageAdded: false});
    }
  }

  handleMessageAdded(){
    this.setState( {messageAdded: true} );
  }

  getActiveRoomMessages(){
    // pulling messages with message.roomId matching this.props.activeRoom.key
    this.setState( {activeMessages: this.state.messages.filter( message =>
      message.roomId == this.props.activeRoom.key)} // need to check type so I can use ===
    );
  }

  timeConverter(time){
    let exactTime = new Date(time);
    let month = exactTime.getMonth();
    let date = exactTime.getDate();
    let year = exactTime.getFullYear();
    let hour = exactTime.getHours();
    let minutes = '0'+exactTime.getMinutes();
    let seconds = '0'+exactTime.getSeconds();

    return `${hour}:${minutes.substr(-2)}:${seconds.substr(-2)} on ${month+1}/${date}/${year}`;
  }

  render(){
    return(
      <article className='chatroom-container'>
        <header>
          <h1 className='room-name'>{this.props.activeRoom.name}</h1>
        </header>
        <section className='messages-bin'>
          {this.state.activeMessages.map( message =>
            <section className='message-container'
                     key={message.key}>
              <p className='message-content'>{message.content}</p>
              <p className='message-sentAt'>{this.timeConverter(message.sentAt)}</p>
              <p className='message-username'>{message.username}</p>
            </section>
          )}
        </section>
        <MessageField user={this.props.user}
                      activeRoom={this.props.activeRoom}
                      firebase={this.props.firebase}
                      handleMessageAdded={()=>this.handleMessageAdded()} />
      </article>
    );
  }
}

export default Chatroom;
