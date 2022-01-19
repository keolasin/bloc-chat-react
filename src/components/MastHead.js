import React, { Component } from 'react';
import About from './About.js';
import User from './User.js';
import * as firebase from 'firebase';

class MastHead extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render() {
    return (
      <nav className='site-header'>
          <About/>
          <User 
            firebase={firebase}
            setUser={(event)=>this.setUser(event, this.user)} user={this.state.user} />
      </nav>
    );
  }
}

export default MastHead;
