import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import AddRoomForm from './AddRoomForm.js';

class AddRoomModal extends Component {
  constructor(props){
    super(props);

    this.el = document.createElement('div');

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

  componentDidMount(){
    document.querySelector('.modal-container').appendChild(this.el);
  }
  componentWillUnmount(){
    document.querySelector('.modal-container').removeChild(this.el);
  }

  render(){
    return ReactDOM.createPortal(
      this.props.children,
      this.el,
    );
  }
}

export default AddRoomModal;
