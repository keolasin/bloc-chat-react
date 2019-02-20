import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class RoomList extends Component {
  constructor(props){
    super(props);
    this.state = {
      rooms : []
    }

    // grabbing rooms path from database, assigning as this.roomsRef
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount(){
    // pulling each room in database and returning the key (name) and value stored there (room1, room2, etc.)
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;

      // assigning the state property 'rooms' an array containing the names of the rooms in the database 
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });
  }

  render() {
    return (
      <sidebar>
        <h1 id='site-name'>Bloc Chat</h1>
        <section className='room-container'>
          <h2>Available Rooms</h2>
          {
            this.state.rooms.map( (room) =>
            <h3 className='rooms' key={room.key}>{'Room: ' +room.name}</h3>)}
        </section>
      </sidebar>
    );
  }
}

export default RoomList;
