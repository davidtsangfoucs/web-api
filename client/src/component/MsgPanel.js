// MsgPanel.js
import React, { useState } from 'react';
import axios from '../commons/axios';

const MsgPanel = ({ closePanel, selectedLocation }) => {
    const [sender, setSender] = useState('');
    const [receiver, setReceiver] = useState('');
    const [content, setContent] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate name and message fields
        if (!sender.trim() || !content.trim()) {
            setErrorMessage('Please fill in all fields.');
            alert("Please fill in all fields")
            return;
        }

        try {
            await axios.post('/send-messages', { sender, receiver: selectedLocation, content });

            // successful send msg 
            alert("Successful Sent Msg")
            // Clear the form fields
            setSender('');
            setReceiver('');
            setContent('');
            setErrorMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
            setErrorMessage('Error sending message. Please try again later.');
            alert("Error sending message. Please try again later.")
        }
    };


    return (
        <div className="msg-panel">
            <article className="panel is-info">
                <button className="panel-close delete is-pulled-right has-text-info" onClick={closePanel}></button>
                <p className="panel-heading">Message</p>
                <div className="panel-block customer-panel-msg">
                    <div className="msg-panel-body">
                        <form onSubmit={handleSubmit}>
                            <p className="panel-tabs">
                                <a className="is-active">Location 1</a>
                                {/* <a>Public</a>
                                <a>Private</a>
                                <a>Sources</a>
                                <a>Forks</a> */}
                            </p>
                            <input
                                value={sender}
                                onChange={(e) => setSender(e.target.value)}
                                placeholder="Your name"
                                className="input"
                            />
                            <input
                                value={selectedLocation}
                                disabled={true}
                                onChange={(e) => setReceiver(e.target.value)}
                                placeholder="Receiver's name"
                                className="input"
                            />
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Your message"
                                className="textarea"
                            />
                            <button type="submit" className="button is-info">Send</button>
                        </form>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default MsgPanel;
