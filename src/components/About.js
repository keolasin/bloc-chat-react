import React, { useState } from 'react';
import Modal from './Modal.js';

function About() {
    const [toggleModal, setToggleModal] = useState(false);

    return ( 
        <>
            <button style={buttonStyle}
                onClick={() => setToggleModal(true)}>
                Chatter
            </button>

            <section className='modal-container'>
                { // room modal showing if showRoomModal true, true when 'add room' button clicked
                    toggleModal ?
                    (<Modal>
                        <article className="about-info">
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
    position: "relative",
    marginLeft: "10px",
    marginRight: "50px",
    marginTop: "42px",
    color: "#FFEFD3",
    fontSize: "3em",
    fontFamily: "Questrial, arial, sans-serif",
    filter: "drop-shadow(0px 4px 4px rgba(17, 20, 24, 0.25))",
    backgroundColor: "rgba(0,0,0,0)",
    border: "0px",
    ":hover": {
        cursor: "pointer"
    }
}

const linkStyle = {
    textDecoration: 'none',
    color: "#FFC49B",
}

export default About;
