import React, { useState } from 'react';
import Modal from './Modal.js';

function About() {
    const [toggleModal, setToggleModal] = useState(false);

    return ( 
        <>
            <button style={buttonStyle}
                onClick={() => setToggleModal(true)}>
                Help
            </button>

            <section className='modal-container'>
                { // room modal showing if showRoomModal true, true when 'add room' button clicked
                    toggleModal ?
                    (<Modal>
                        <article>
                            <h2>Chatter</h2>
                            <p>This was my first react app, built using create-react-app for the frontend, and firebase for authentication and the message database.</p>
                            <p>To use this app, sign-in using a google account, create or selecting an existing chatroom, and start messaging the room!</p>
                            <p>You can find more of my projects at <a style={linkStyle} href="https://mreyes.info/projects">mreyes.info</a></p>
                            <button className='modal-btn'
                                    onClick={() => setToggleModal(false)}>
                                    Close
                            </button>
                        </article>
                    </Modal>)
                    : null
                }
            </section>
        </>
    )
}

const buttonStyle = {
    padding: '5px',
    border: '2px white solid',
    margin: '10px',
    backgroundColor: '#BEB9F1',
    fontSize: '0.9em',
    color: 'black',
    cursor: 'pointer'
}

const linkStyle = {
    color: 'rgb(188, 150, 18)',
    fontSize: '1.5em',
    fontFamily: 'astounder-squared-bb',
    textDecoration: 'none'
}

export default About;
