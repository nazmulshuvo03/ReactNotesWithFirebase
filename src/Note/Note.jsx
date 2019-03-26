import React, { Component } from "react";
import propTypes from "prop-types";

import "./Note.css";

class Note extends Component {
    constructor(props) {
        super(props);
        this.noteContent = props.noteContent;
        this.noteId = props.noteId;
    }

    render(props) {
        return (
            <div className="note fade-in">
                <p className="noteContent">{this.noteContent}</p>
            </div>
        );
    }
}

Note.propTypes = {
    noteContent: propTypes.string
};

export default Note;
