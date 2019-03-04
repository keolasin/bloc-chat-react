import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class User extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: ''
    }

    const provider = new this.props.firebase.auth.GoogleAuthProvider();
  }

  componentDidMount(){

  }

  handleSignInClick(){
    this.setState( {} );
  }

  render(){
    return(
      <section className='user-sign-in'>
        <button>Sign in</button>
      </section>
    );
  }
}

export default User;
