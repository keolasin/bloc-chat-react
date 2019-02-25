import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class AddRoomForm extends Component {
  constructor(props){
    super(props);

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  // typing in the form field
  handleChange(event){
    this.setState( {value: event.target.value} );
  }

  // adding the submitted new room to firebase
  createRoom(event){
    this.setState( {value: '' });
    this.roomsRef.push({
      name: this.state.value
    });
    event.preventDefault();
  }

  render(){
    return (
      <form onSubmit={(event)=>this.createRoom(event)}>
        <label htmlFor='text' id='room-label'>
          New room
          <input type='text'
                 placeholder='Name a room!'
                 id ='room-text-field'
                 value={this.state.value}
                 onChange={(event)=>this.handleChange(event)}/>
        </label>
        <input id='create-room' type="submit" value="Create room" />
      </form>
    );
  }
}

export default AddRoomForm;
