import React, { Component } from 'react';
import Modal from './Modal.js';
import AddRoomForm from './AddRoomForm.js';

class RoomList extends Component {
  constructor(props){
    super(props);
    this.state = {
      rooms : [],
      showRoomModal: false,
      roomDeleted: false
    }
    this.handleModalShow = this.handleModalShow.bind(this);
    this.handleModalHide = this.handleModalHide.bind(this);

    // grabbing 'rooms' path from firebase database, assigning as this.roomsRef
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount(){
    // pulling each room in the database and returning the key (name) and value stored there (room1, room2, etc.)
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      // assigning the state property 'rooms' an array containing the room objects in the database
      this.setState( {rooms: this.state.rooms.concat( room )} );
    });
  }

  handleModalShow(){
    this.setState( {showRoomModal: true} );
  }

  handleModalHide(){
    this.setState( {showRoomModal: false} );
  }

  handleDeleteRoom(key){
    this.roomsRef.child(key).remove();
    this.setState( {roomDeleted: true} );
  }

  render() {
    return (
      <section className='room-container'>
        <button id="chatrooms-btn"
                onClick={this.handleModalShow}>
          Chatrooms
        </button>
        <div className='modal-container'>
          { // room modal showing if showRoomModal true, true when 'add room' button clicked
            this.state.showRoomModal ?
            (<Modal>
                {/* looping through the state 'rooms' array assigning each item to an h3 element and giving the activeRoom/clicked room a unique CSS id*/
                  this.state.rooms.map( (room) =>
                  <section className='room-button-container'
                            key={room.key}>
                    <h3 className='rooms'
                        id={this.props.activeRoom.key === room.key ? 'active-room' : null}
                        onClick={()=>this.props.handleRoomClick(room)}>{room.name}
                    </h3>
                    <button className='delete-room-button'
                            onClick={()=>this.handleDeleteRoom(room.key)}>Delete</button>
                  </section>)
                }
                <AddRoomForm 
                  roomsRef={this.roomsRef}
                  handleModalHide={this.handleModalHide}
                />
              </Modal>)
            : null}
        </div>

      </section>
    );
  }
}

export default RoomList;
