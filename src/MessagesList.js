import React from "react";
import Message from "./Message";
import "./messages.css";

const MessagesList = (props) => {
    const messages = props.messages.map(message => {
        return <Message key={message.id} message={message}/>
    });

    return <div className="message-list container bg-dark">{messages}</div>
};

export default MessagesList;