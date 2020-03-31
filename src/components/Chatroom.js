import React, { Component } from 'react';
import MessageField from './MessageField.js'

class Chatroom extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      messages: [], // all messages pulled from firebase
      activeMessages: [], // messages with matching roomId to activeRoom
      messageAdded: false // checking if a message has been added
    }

    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount(){ // need to get the messages currently in the room on mount
    this.refreshMessages();
  }

  refreshMessages(){ // checking messages in the room currently
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      // adding the messages from firebase to the state 'messages'
      this.setState( { messages: this.state.messages.concat(message)});
    });
  }

  componentDidUpdate(prevProps, prevState){
    // when component updates, check if we are in the activeRoom and get those msgs
    if (this.props.activeRoom !== prevProps.activeRoom){
      this.getActiveRoomMessages();
    }
    // check if a new message as been added to firebase using state change
    if (this.state.messageAdded !== prevState.messageAdded){
      this.getActiveRoomMessages();
      this.setState({messageAdded: false}); // reset state after refresh for next new msg submit
    }
  }

  // passed as prop down to MessageField component, should trigger when a new msg is submitted
  handleMessageAdded(){
    this.setState( {messageAdded: true} );
  }


  getActiveRoomMessages(){
    // pulling messages with message.roomId matching this.props.activeRoom.key
    this.setState( {activeMessages: this.state.messages.filter( message =>
      message.roomId == this.props.activeRoom.key)}
    );
  }

  // converting firebase unix time to desired format
  timeConverter(time){
    let exactTime = new Date(time);
    let month = exactTime.getMonth();
    let date = exactTime.getDate();
    let year = exactTime.getFullYear();
    let hour = exactTime.getHours();
    let minutes = '0'+exactTime.getMinutes();
    let seconds = '0'+exactTime.getSeconds();

    // time + date string, format of HH:MM:SS on MM/DD/YYYY
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
