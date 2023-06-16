// MsgPanel.js
import React, { useState } from 'react';
import axios from '../commons/axios';

const MsgPanel = ({ closePanel, selectedLocation, replyReceiver, replySender, userName, objId, publicUserName, userEmail }) => {
    const [sender, setSender] = useState(replySender || userEmail ? userEmail : objId);
    const [receiver, setReceiver] = useState('');
    const [content, setContent] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate name and message fields
        if (replySender) {
            setSender(replySender)
        }
        if (
            // !sender?.trim() ||
            // !content?.trim() ||
            sender === null ||
            content === null
        ) {
            setErrorMessage('Please fill in all fields.');
            alert('Please fill in all fields');
            return;
        }

        try {
            if (replyReceiver && replySender) {
                // staff reply to public logic 
                await axios.post('/send-messages', { sender: replySender, receiver: replyReceiver, content });

                // successful send msg 
                alert("Successful Sent Msg")
                // Clear the form fields
                // setSender('');
                // setReceiver('');
                // setContent('');
                setErrorMessage('');
            } else {
                // public send to location staff logic 
                await axios.post('/send-messages', { sender, receiver: selectedLocation, content });

                // successful send msg 
                alert("Successful Sent Msg")
                // Clear the form fields
                // setSender('');
                // setReceiver('');
                // setContent('');
                setErrorMessage('');
            }
            window.location.reload();
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
                                value={sender ? userEmail : publicUserName ? publicUserName : replySender ? replySender : userName}
                                onChange={(e) => setSender(e.target.value)}
                                placeholder="Your Email"
                                className="input"
                                disabled={publicUserName ? true : objId ? true : false}
                            />
                            <input
                                value={replyReceiver ? replyReceiver : selectedLocation}
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
