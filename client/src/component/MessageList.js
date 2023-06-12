import axios from '../commons/axios';
import React, { useState, useEffect } from 'react';
import { baseURL } from '../commons/helper';
import UseAuth from '../component/UseAuth';
import MsgPanel from '../component/MsgPanel';

const MessageList = () => {
    const [messageGroups, setMessageGroups] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [showPanel, setShowPanel] = useState(false);
    const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [selectedMessageId, setSelectedMessageId] = useState(null); // New state variable

    const { isLoggedIn, premission, userId, objId, location, userName, userEmail } = UseAuth();

    useEffect(() => {
        if (location) {
            fetchMessages();
        }
    }, [location]);

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`${baseURL}/get-messages`);
            const messages = response.data.data;

            let filteredMessages;
            if (premission === "Charity Worker") {
                filteredMessages = messages.filter(
                    (message) => message.receiver === location || message.sender === location
                );
            } else {
                filteredMessages = messages.filter(
                    (message) => message.receiver === userEmail
                );
            }

            const groupedMessages = [];
            filteredMessages.forEach((message) => {
                const groupIndex = groupedMessages.findIndex((group) =>
                    (group.sender === message.sender && group.receiver === message.receiver) ||
                    (group.sender === message.receiver && group.receiver === message.sender)
                );

                if (groupIndex > -1) {
                    // Append content and time to existing group
                    groupedMessages[groupIndex].content.push(message.sender + ": " + message.content); // Include sender name in content
                    groupedMessages[groupIndex].createdAt.push(message.createdAt);
                    groupedMessages[groupIndex].updatedAt.push(message.updatedAt);
                    groupedMessages[groupIndex]._id.push(message._id);
                } else {
                    // Create new group
                    groupedMessages.push({
                        sender: message.sender,
                        receiver: message.receiver,
                        content: [message.sender + ": " + message.content], // Include sender name in content
                        createdAt: [message.createdAt],
                        updatedAt: [message.updatedAt],
                        _id: [message._id]
                    });
                }
            });

            // Sort messages within each group by time in ascending order
            groupedMessages.forEach((group) => {
                const messages = group.content.map((content, index) => ({
                    content,
                    createdAt: group.createdAt[index],
                    updatedAt: group.updatedAt[index],
                    _id: group._id[index]
                }));

                messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

                group.content = messages.map((message) => message.content);
                group.createdAt = messages.map((message) => message.createdAt);
                group.updatedAt = messages.map((message) => message.updatedAt);
                group._id = messages.map((message) => message._id);
            });

            setMessageGroups(groupedMessages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleDelete = (id) => {
        setDeleteConfirmationOpen(true);
        setSelectedMessageId(id); // Set the selected message ID
    };

    const handleDeleteOneData = (id) => {
        alert('ss')
        confirmDeleteOneMsgAction(id)
        // setDeleteConfirmationOpen(true);
        // setSelectedMessageId(id); // Set the selected message ID
    };

    const confirmDeleteOneMsgAction = async (id) => {
        try {
            await axios.delete(`/delete-one-messages/${id}`);
            fetchMessages();
        } catch (error) {
            console.error('Error deleting message:', error);
        } finally {
            setDeleteConfirmationOpen(false);
            setSelectedMessageId(null); // Reset the selected message ID
        }
    };

    const confirmDeleteAction = async (id) => {
        try {
            await axios.delete(`/delete-messages/${id}`);
            fetchMessages();
        } catch (error) {
            console.error('Error deleting message:', error);
        } finally {
            setDeleteConfirmationOpen(false);
            setSelectedMessageId(null); // Reset the selected message ID
        }
    };

    const handleReply = (message) => {
        setSelectedMessage(message);
        setShowPanel(!showPanel);
    };

    const handleCloseReply = () => {
        setSelectedMessage(null);
    };

    const cancelDeleteAction = () => {
        setDeleteConfirmationOpen(false);
        setSelectedMessageId(null); // Reset the selected message ID
    };

    const formatDateTime = (dateTimeString) => {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            timeZone: 'Asia/Hong_Kong'
        };

        const dateTime = new Date(dateTimeString);
        return dateTime.toLocaleString('en-US', options);
    };

    const closeMessagePanel = () => {
        setShowPanel(false);
    };

    return (
        <div className="container">
            <table className="table is-bordered is-fullwidth">
                <thead>
                    <tr>
                        <th>Sender</th>
                        <th>Receiver</th>
                        <th>Content</th>
                        <th>Time</th>
                        <th>Delete Msg</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {messageGroups.map((group) => (
                        <tr key={`${group.sender}-${group.receiver}`}>
                            <td>{group.sender}</td>
                            <td>{premission === "Public User" ? userEmail : group.receiver}</td>
                            <td>
                                {group.content.map((content, index) => (
                                    <div key={index}>{content}</div>
                                ))}
                            </td>
                            <td>
                                {group.createdAt.map((createdAt, index) => (
                                    <div key={index}>{formatDateTime(createdAt)}</div>
                                ))}
                            </td>
                            <td>
                                {group.content.map((content, index) => (
                                    <div key={index}>
                                        {premission === "Charity Worker" && (
                                            <button
                                                className="button small-delete is-danger"
                                                onClick={() => handleDeleteOneData(group._id[index])}
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </td>
                            <td>
                                <button
                                    className="button is-primary"
                                    onClick={() => handleReply(group)}
                                >
                                    Reply
                                </button>
                                {premission === "Charity Worker" && (
                                    <button
                                        className="button is-danger"
                                        onClick={() => handleDelete(group._id[0])}
                                    >
                                        Delete
                                    </button>
                                )}
                                {isDeleteConfirmationOpen && selectedMessageId === group._id[0] && (
                                    <div className="modal is-active">
                                        <div className="modal-background"></div>
                                        <div className="delete-box modal-content">
                                            <div className="box has-text-centered">
                                                <h2 className="confirm-delete-msg">Confirm Deletion</h2>
                                                <p>Are you sure you want to delete this Msg?</p>
                                                <div className="buttons">
                                                    <button
                                                        className="button is-danger"
                                                        onClick={() => confirmDeleteAction(group._id[0])}
                                                    >
                                                        Yes
                                                    </button>
                                                    <button className="button" onClick={cancelDeleteAction}>
                                                        No
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            className="modal-close is-large"
                                            aria-label="close"
                                            onClick={cancelDeleteAction}
                                        ></button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showPanel && (
                <MsgPanel
                    closePanel={closeMessagePanel}
                    replyReceiver={selectedMessage.sender}
                    replySender={selectedMessage.receiver}
                    publicUserName={premission === "Public User" ? userName : selectedMessage.receiver}
                    onClose={handleCloseReply}
                />
            )}
        </div>
    );
};

export default MessageList;
