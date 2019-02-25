import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class AddRoomForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: ''
    }
  }

  // typing in the form field
  handleChange(event){
    this.setState( {value: event.target.value} );
  }

  // adding the submitted new room to firebase
  createRoom(event){
    this.props.roomsRef.push({
      name: this.state.value
    });
    this.setState( {value: '' } );
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
