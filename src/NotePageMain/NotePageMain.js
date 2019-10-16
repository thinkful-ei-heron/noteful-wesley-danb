import React from 'react'
import Note from '../Note/Note'
import {getNotesForFolder, findNote, findFolder} from '../notes-helpers';
import './NotePageMain.css'
import NoteContext from '../noteContext'


export default class NotePageMain extends React.Component{

  static contextType = NoteContext;

  render () {
    const {noteId} = this.props.match.params;
    const note = findNote(this.context.notes, noteId);

    return (
    <section className='NotePageMain'>
      <Note
        id={note.id}
        name={note.name}
        showDelete={false}
        modified={note.modified}
      />
      <div className='NotePageMain__content'>
        {note.content.split(/\n \r|\n/).map((para, i) =>
          <p key={i}>{para}</p>
        )}
      </div>
    </section>
    )
}
}

NotePageMain.defaultProps = {
  note: {
    content: '',
  }
}
