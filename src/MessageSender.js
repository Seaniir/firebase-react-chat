import React from "react";
import "./messages.css";
import {collection, doc, setDoc, addDoc} from "firebase/firestore";
import {db} from "./firebase-config";


class MessageSender extends React.Component {
    state = { term: "" };

    sendMessage = async () => {
        console.log(this);
        console.log(this.state.term);
        console.log(this.props.uid);
        await addDoc(collection(db, "messages"), {
            author: "7",
            content: this.state.term,
            date: new Date(),
            uid: this.props.uid
        });
        this.setState({term: ""});
    }

    render() {
        return(
            <div className={"messageSender container"}>
                <input type={"text"} value={this.state.term} onChange={(e) => this.setState({ term: e.target.value })}/>
                <button onClick={this.sendMessage}>Envoyer</button>
            </div>
        );
    }
}

export default MessageSender;