import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/database";

import Note from "./Note/Note";
import Noteform from "./Noteform/Noteform";
import { DB_CONFIG } from "./config/config";

import "./App.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.addNote = this.addNote.bind(this);

        this.app = firebase.initializeApp(DB_CONFIG);
        this.db = this.app
            .database()
            .ref()
            .child("notes");

        this.state = {
            notes: []
        };
    }

    componentWillMount = () => {
        const previousNotes = this.state.note;

        //Datasnapshot
        this.database.on("child_added", snap => {
            previousNotes.push({
                id: snap.key,
                noteContent: snap.val().noteContent
            });
        });
    };

    addNote = note => {
        this.database.push().set({ noteContent: note });
    };

    render() {
        return (
            <div className="notesWrapper">
                <div className="notesHeader">
                    <div className="heading">React & Firebase ToDo List</div>
                </div>
                <div className="noteBody">
                    {this.state.notes.map(note => {
                        return (
                            <Note
                                noteContent={note.noteContent}
                                noteId={note.id}
                                key={note.id}
                            />
                        );
                    })}
                </div>
                <div className="notesFooter">
                    <Noteform addNote={this.addNote} />
                </div>
            </div>
        );
    }
}

export default App;
