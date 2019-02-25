import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AddRoomModal from './AddRoomModal.js';

class RoomList extends Component {
  constructor(props){
    super(props);
    this.state = {
      rooms : [],
      showRoomModal: false
    }

    // grabbing 'rooms' path from firebase database, assigning as this.roomsRef
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount(){
    // pulling each room in the database and returning the key (name) and value stored there (room1, room2, etc.)
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;

      // assigning the state property 'rooms' an array containing the names of the rooms in the database
      this.setState( {rooms: this.state.rooms.concat( room )} );
    });
  }

  handleModalShow(){
    this.setState( {showRoomModal: true} );
  }
  handleModalHide(){
    this.setState( {showRoomModal: false} );
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

  render() {
    return (
      <aside>
        <h1 id='site-name'>Bloc Chat</h1>
        <section className='room-container'>
          <header>
            <h2 id='room-head'>Available Rooms</h2>
            <button className='create-room'
                    onClick={() => this.handleModalShow}>
                    Create Room asdfa
            </button>
          </header>
          { /* looping through the state 'rooms' array assigning each item to an h3 element */
            this.state.rooms.map( (room) =>
            <h3 className='rooms' key={room.key}>{room.name}</h3>)}



          <div className='modal-container'>
          {this.state.showRoomModal ? <AddRoomModal handleModalHide={()=> this.handleModalHide}/> : null}
          </div>

          {/* form to add/create rooms */}
          <form onSubmit={(event)=>this.createRoom(event)}>
            <label htmlFor='text' id='room-label'>
              New room
              <input type='text'
                     placeholder='Name a room!'
                     id ='room-text-field'
                     value={this.state.value}
                     onChange={(event)=>this.handleChange(event)}/>
            </label>
            <input className='create-room' type="submit" value="Create room" />
          </form>

        </section>
      </aside>
    );
  }
}

export default RoomList;
