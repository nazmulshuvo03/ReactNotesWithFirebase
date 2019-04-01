import React, { Component } from 'react';
import 'firebase/database';

import Note from './Note/Note';
import Noteform from './Noteform/Noteform';
import firebase from './config/config';

import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.addNote = this.addNote.bind(this);
		this.removeNote = this.removeNote.bind(this);

		this.app = firebase;
		this.database = this.app.database().ref().child('notes');

		this.state = {
			notes: []
		};
	}

	componentWillMount = () => {
		const previousNotes = this.state.notes;

		//Datasnapshot
		this.database.on('child_added', (snap) => {
			//console.log(snap.val().noteContent);
			previousNotes.push({
				id: snap.key,
				noteContent: snap.val().noteContent
			});

			this.setState({
				notes: previousNotes
			});
		});

		this.database.on('child_removed', (snap) => {
			for (let i = 0; i < previousNotes.length; i++) {
				if (previousNotes[i].id === snap.key) {
					previousNotes.splice(i, 1);
				}
			}

			this.setState({
				notes: previousNotes
			});
		});
	};

	addNote = (note) => {
		this.database.push().set({ noteContent: note });
	};

	removeNote = (noteId) => {
		this.database.child(noteId).remove();
	};

	render() {
		//console.log(this.state.notes);
		return (
			<div className="notesWrapper">
				<div className="notesHeader">
					<div className="heading">React & Firebase ToDo List</div>
				</div>
				<div className="noteBody">
					{this.state.notes.map((note) => {
						return (
							<Note
								noteContent={note.noteContent}
								noteId={note.id}
								key={note.id}
								removeNote={this.removeNote}
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
