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
    });
  }

  handleModalShow(event){
    (console.log(event.target));
    this.setState( {showRoomModal: true} );
  }
  handleModalHide(event){
    this.setState( {showRoomModal: false} );
  }
  handleDeleteRoom(){
    console.log(this.props.activeRoom.key);
  }

  render() {
    return (
      <aside>
        <header className='site-header'>
          <h1 id='site-name'>Bloc Chat</h1>
        </header>
        <section className='room-container'>
          <header>
            <h2 id='room-head'>Available Rooms</h2>
            <button className='modal-btn'
                    onClick={this.handleModalShow}>
                    Add Room
            </button>
          </header>

          {/* looping through the state 'rooms' array assigning each item to an h3 element and giving the activeRoom/clicked room a unique CSS id*/
            this.state.rooms.map( (room) =>
              <h3 className='rooms'
                  key={room.key}
                  id={this.props.activeRoom.key === room.key ? 'active-room' : null}
                  onClick={()=>this.props.handleRoomClick(room)}>{room.name}
              </h3>
            )
          }

          <button className='del-room-btn'
                  onClick={this.handleDeleteRoom}>
                  Delete Selected Room
          </button>


          <div className='modal-container'>
            { // room modal showing if showRoomModal true, true when 'add room' button clicked
              this.state.showRoomModal ?
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
