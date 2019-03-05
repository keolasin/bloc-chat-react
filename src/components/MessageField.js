import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class MessageField extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: ''
    }

    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  // typing in the enter message form field
  handleChange(event){
    this.setState( {value: event.target.value} );
  }

  // adding the submitted message to the firebase database
  handleMessageSubmit(event){
    this.messagesRef.push( {
        content: this.state.value,
        roomId: this.props.activeRoom.key,
        username: (this.props.user ? this.props.user.displayName : 'Guest'),
        sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
      }
    );
    this.setState( { value: '' } );
    this.props.handleMessageAdded();
    event.preventDefault();
  }

  render(){
    return(
      <section className='message-form-container'>
        <form onSubmit={(event)=>this.handleMessageSubmit(event)}>
          <input type='text'
                 placeholder='Enter your message here.'
                 className ='input-message-field'
                 value={this.state.value}
                 onChange={(event)=>this.handleChange(event)}/>
          <input id='submit-message' type="submit" value="Send" />
        </form>
      </section>
    );
  }
}

export default MessageField;
