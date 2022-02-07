import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import './chat.scss';

const Chat = ({
    socket,
    username,
    room
}) => {

    const [currentMessage, setCurrentMessage] = useState("");

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", messageData);
            setCurrentMessage('');
        }
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log(data);
        });
    }, [socket]);

   return (
        <div>
            <div className="chat-header">
                <p>Live Chat</p>
            </div>
            <div className="chat-body"></div>
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
    socket: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    room: PropTypes.number.isRequired,
};
Chat.defaultProps = {
};
export default React.memo(Chat);
