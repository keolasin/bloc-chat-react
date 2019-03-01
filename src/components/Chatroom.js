import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Chatroom extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      messages: [],
      sortedMessages: []
    }

    this.messagesRef = this.props.firebase.database().ref('Messages');
  }

  componentDidMount(){
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      this.setState( { messages: this.state.messages.concat(message) } );
    });
  }

  messageSorter(){
    // need to make sure the message 'roomId' matches our activeRoom, use .filter()
    this.props.activeRoom.messages = this.state.messages.filter( (message) =>
      message.roomId === this.props.activeRoom.key
    );

    // want to put our messages in a chronologically sorted array, older messages first (smaller unix timestamp integer)
    // use quicksort? .sort?
    /*let timeSorted = sortedMessagesArray.map( message =>
      message.child('sentAt')
    );
    */
    //this.setState( { sortedMessages: sortedMessagesArray} );
  }

  quickSort(unsortedArray){
    const sortedArray = '';
  }

  timeConverter(message){
    let date = new Date(message.child('sentAt'));
    let hour = date.getHour();
    let minutes = '0'+date.getMinutes();
    let seconds = '0'+date.getSeconds();

    return `${hour}:${minutes.substr(-2)}:${seconds.substr(-2)} on ${date}`;
  }

  render(){
    return(
      <main className='chat-container'>
        <header>
          <h1 className='active-room'>{this.props.activeRoom.name}</h1>
        </header>
        <article>
          <p>{this.props.activeRoom.key}</p>
        </article>
      </main>
    );
  }
}

export default Chatroom;
