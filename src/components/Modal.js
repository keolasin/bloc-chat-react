import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class Modal extends Component {
  constructor(props){
    super(props);
    this.el = document.createElement('section');
  }

  componentDidMount(){
    document.querySelector('.modal').appendChild(this.el);
    document.querySelector('.modal').classList.add('showing');
  }

  componentWillUnmount(){
    document.querySelector('.modal').removeChild(this.el);
    document.querySelector('.modal').classList.remove('showing');
  }

  render(){
    return ReactDOM.createPortal(
      this.props.children,
      this.el,
    );
  }
}

export default Modal;
