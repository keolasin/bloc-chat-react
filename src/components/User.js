import React, { Component } from 'react';

class User extends Component {
  componentDidMount(){
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

  componentWillUnmount(){
    this.props.firebase.auth();
  }

  handleSignInClick(){
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  handleSignOutClick(){
    this.props.firebase.auth().signOut();
  }

  render(){
    return(
      <section className='user-signIn'>
        <h3>{ this.props.user ? this.props.user.displayName : 'Guest' /*display the username */}</h3>
        {// change sign-in/sign-out button depending if the user is signed in/out
          this.props.user ? <button onClick={()=>this.handleSignOutClick()}>Sign out</button>
          : <button onClick={()=>this.handleSignInClick()}>Sign in</button>
        }
      </section>
    );
  }
}

export default User;
