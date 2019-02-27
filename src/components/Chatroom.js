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
    let roomChecked = this.state.messages.filter( (message) =>
      message.child('roomId') === this.props.activeRoom.key;
    );
    
    // want to put our messages in a chronologically sorted array, older messages first (smaller unix timestamp integer)
    // use quicksort
    let timeSorted = sortedMessagesArray.map( message =>
      message.child('sentAt')
    );
    
    this.setState( { sortedMessages: sortedMessagesArray} );                        
  }
  
  quickSort(unsortedArray){
    const sortedArray;
  }
  
  timeConverter(message){
    let date = new Date(message.child('sentAt'));
    let hour = date.getHour();
    let minutes = '0'+date.getMinutes();
    let seconds = '0'+date.getSeconds();
    
    return formattedTime = `${hour}:${minutes.substr(-2)}:${seconds.substr(-2)} on ${date}`;
  }

  render(){
    return(
      <main className='chat-container'>
        <header>
          <h1 classname='active-room'>{this.props.activeRoom.name}</h2>
        </header>
        <article>
          {
            this.state.messages.map( (message, this.props.activeRoom) => {
              if (message.child('roomId') === this.props.activeRoom.key){
                return (
                  <section className='message'>
                   <h1 className='message-userName'>{ message.child('userName') }</h1>
                   <p className='message-content'>{ message.child('content') }</p>
                   <h2 className='message-sentAt'>{ message.child('sentAt') }</h2>
                 </section>
                );
              } else {
                return null;
              }
            });
          }
        </article>
      </main>
    );
  }
}

export default Chatroom;
