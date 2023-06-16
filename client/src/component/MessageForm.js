import axios from '../commons/axios';
import React, { useState } from 'react';


const MessageForm = () => {
    const [sender, setSender] = useState('');
    const [receiver, setReceiver] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {

        e.preventDefault();
        await axios.post('/send-messages', { sender, receiver, content });
        // Clear the form fields
        setSender('');
        setReceiver('');
        setContent('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={sender}
                onChange={e => setSender(e.target.value)}
                placeholder="Your name"
            />
            <input
                value={receiver}
                onChange={e => setReceiver(e.target.value)}
                placeholder="Receiver's name"
            />
            <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Your message"
            />
            <button type="submit">Send</button>
        </form>
    );
};

export default MessageForm;
