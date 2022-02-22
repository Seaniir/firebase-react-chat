import React from "react";
import "./messages.css";
import {auth} from "./firebase-config";

class Message extends React.Component {
    render() {
        const user = auth.currentUser;
        const { author, content } = this.props.message.data;
        return(
            <div className={user.uid === this.props.message.data.uid ? 'message-inner' : 'message-exterior'}>
                <p>{content}</p>
                {user.uid === this.props.message.data.uid ? <img src={user.photoURL} className={"imageMessage"}/> : null}
            </div>
        );
    }
}

export default Message;