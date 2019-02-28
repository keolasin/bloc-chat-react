import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AddRoomModal from './AddRoomModal.js';
import AddRoomForm from './AddRoomForm.js';

class RoomList extends Component {
  constructor(props){
    super(props);
    this.state = {
      rooms : [],
      showRoomModal: false
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
      console.log(room);
      console.log(room.name);
    });
  }

  handleModalShow(){
    this.setState( {showRoomModal: true} );

  }
  handleModalHide(){
    this.setState( {showRoomModal: false} );
  }

  render() {
    return (
      <aside>
        <h1 id='site-name'>Bloc Chat</h1>
        <section className='room-container'>
          <header>
            <h2 id='room-head'>Available Rooms</h2>
            <button className='modal-btn'
                    onClick={this.handleModalShow}>
                    Add Room
            </button>
          </header>

          { /* looping through the state 'rooms' array assigning each item to an h3 element and giving the activeRoom/clicked room a unique CSS id*/
            this.state.rooms.map( (room) =>
            this.props.activeRoom.name ===room.name ?
            <h3 className='rooms'
                key={room.key}
                id='active-room'
                onClick={()=>this.props.handleRoomClick(room) }>{room.name}
            </h3>:
            <h3 className='rooms'
                key={room.key}
                onClick={()=>this.props.handleRoomClick(room)}>{room.name}
            </h3>)}

          <div className='modal-container'>
            {this.state.showRoomModal ?
              (<AddRoomModal>
                  <AddRoomForm roomsRef={this.roomsRef}
                               handleModalHide={this.handleModalHide}
                  />
               </AddRoomModal>)
              : null}
          </div>

        </section>
      </aside>
    );
  }
}

export default RoomList;
