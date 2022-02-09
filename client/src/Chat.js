import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import './chat.scss';

const Chat = ({
    socket,
    username,
    room
}) => {

    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
        }
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
        });
    }, [socket]);

   return (
        <div className="chat-window">
            <div className="chat-header">
                <p>Live Chat</p>
            </div>
            <div className="chat-body">
                {messageList.map((messageContent) => {
                    return <h1 key={messageContent.message}>{messageContent.message}</h1>
                })}
            </div>
            <div className="chat-footer">
                <input type="text" placeholder="Hey..." 
                onChange={(event) => {
                    setCurrentMessage(event.target.value)
                }} 
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
   );
};

Chat.propTypes = {
    socket: PropTypes.shape().isRequired,
    username: PropTypes.string.isRequired,
    room: PropTypes.string.isRequired,
};
Chat.defaultProps = {
};
export default React.memo(Chat);
