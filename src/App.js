import React from "react";
import { db } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { doc, onSnapshot, orderBy } from "firebase/firestore";
import { query, where } from "firebase/firestore";
import MessagesList from "./MessagesList";
import message from "./Message";
import MessageSender from "./MessageSender";
import {getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup} from "firebase/auth";
import firebase from "firebase/compat/app";

class App extends React.Component {
  state = { messages: [], email: "", pwd: "", useruid: "" };

  onGetMessage = async (db)  => {
    const q = query(collection(db, "messages"), orderBy("date"));
    const list = onSnapshot(q, (querySnapshot) => {
      this.setState({messages: []});
      querySnapshot.forEach((doc) => {
        const joined = this.state.messages.concat([{id: doc.id, data: doc.data()}]);
        this.setState({ messages: joined });
      });
      console.log(this.state.messages);
    });
  }

  componentDidMount() {
    this.onGetMessage(db);
  }

  connectUser = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.state.email, this.state.pwd)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          this.setState({useruid: user.uid});
          console.log(this.state.useruid);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
  }

    connectUserWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                this.setState({useruid: user.uid});
                // ...
            }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
    }

  render() {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
          return (
              <div className="App">
                  <div className={"entireChat d-flex flex-column"}>
                      <MessagesList messages={this.state.messages}/>
                      <MessageSender uid={user.uid}/>
                  </div>
              </div>
          );
      } else {
          return (
              <div className="App">
                  <input type={"text"} value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })}/>
                  <input type={"password"} value={this.state.pwd} onChange={(e) => this.setState({ pwd: e.target.value })}/>
                  <button onClick={this.connectUser}>Connexion</button>
                  <button onClick={this.connectUserWithGoogle}>Google Connect</button>
              </div>
          );
      }
    return;
  }
}

export default App;
