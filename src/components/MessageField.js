import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class MessageList extends Component {
  constructor(props){
    super(props);
    this.state = {
      value=''
    }
    
    this.messagesRef = this.props.firebase.database().ref('messages');
  }
  
  // typing in the enter message form field
  handleChange(event){
    this.setState( {value: event.target.value} );
  }
  
  // adding the submitted message to the firebase database
  handleMessageSubmit(event){
    this.props.messagesRef.push({
      content: this.state.value,
      roomId: this.props.activeRoom.key,
      username: this.props.user,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
    });
    this.setState( { value: '' } );
    event.preventDefault();
  }
  
  render(){
    return(
      <section className='message-form-container'>
      <form onSubmit={(event)=>this.handleMessageSubmit(event)}>
          <label htmlFor='text' id='input-message-field'>
            <input type='text'
                   placeholder='Enter your message here.'
                   id ='input-message-field'
                   value={this.state.value}
                   onChange={(event)=>this.handleChange(event)}/>
          </label>
          <input id='submit-message' type="submit" value="Send message" />
        </form>
      </section>
    );
  }
}
