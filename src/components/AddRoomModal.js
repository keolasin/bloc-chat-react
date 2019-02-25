import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class AddRoomModal extends Component {
  constructor(props){
    super(props);
    this.el = document.createElement('section');
  }

  componentDidMount(){
    document.querySelector('.modal').appendChild(this.el);
  }

  componentWillUnmount(){
    document.querySelector('.modal').removeChild(this.el);
  }

  render(){
    return ReactDOM.createPortal(
      this.props.children,
      this.el,
    );
  }
}

export default AddRoomModal;
