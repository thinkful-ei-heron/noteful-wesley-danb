import React from 'react'
import Note from '../Note/Note'
import {getNotesForFolder, findNote, findFolder} from '../notes-helpers';
import './NotePageMain.css'

export default function NotePageMain(props) {

  render(){
    const {noteId} = this.props.match.param
    const note = findNote(this.context.notes, noteId )


  }
  return (
    <section className='NotePageMain'>
      <Note
        id={note.id}
        name={note.name}
        modified={note.modified}
      />
      <div className='NotePageMain__content'>
        {props.note.content.split(/\n \r|\n/).map((para, i) =>
          <p key={i}>{para}</p>
        )}
      </div>
    </section>
  )
}

NotePageMain.defaultProps = {
  note: {
    content: '',
  }
}
