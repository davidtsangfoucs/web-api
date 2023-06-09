// MessageList.js
import axios from '../commons/axios';
import React, { useState, useEffect } from 'react';
import { baseURL } from '../commons/helper';

const MessageList = () => {
    const [messages, setMessages] = useState([]);

    const fetchMessages = async () => {
        const res = await axios.get(`${baseURL}/get-messages`);
        setMessages(res.data.data);
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleDelete = async (id) => {
        await axios.delete(`/delete-messages/${id}`);
        // Refetch the messages after one is deleted
        fetchMessages();
    };

    return (
        <div>
            {Array.isArray(messages) && messages.map(msg => (
                <div key={msg._id}>
                    <p><strong>Sender:</strong> {msg.sender}</p>
                    <p><strong>Content:</strong> {msg.content}</p>
                    <button onClick={() => handleDelete(msg._id)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default MessageList;
