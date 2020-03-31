import React, { Component } from 'react';

class AddRoomForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: ''
    }
  }

  // update DOM when typing in the form field (due to change in state)
  handleChange(event){
    this.setState( {value: event.target.value} );
  }

  // adding the submitted new room to firebase
  createRoom(event){
    this.props.roomsRef.push({ // pushing the state 'value' to the new room on button click
      name: this.state.value
    });
    this.setState( {value: '' } ); // resetting the state value to ''
    event.preventDefault();
  }

  render(){
    return (
      <section className='form-container'>
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
        <button className='modal-btn'
                onClick={this.props.handleModalHide}>Close</button>
      </section>
    );
  }
}

export default AddRoomForm;
