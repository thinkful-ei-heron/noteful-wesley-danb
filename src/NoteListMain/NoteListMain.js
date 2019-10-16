import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import NoteContext from '../noteContext'
import './NoteListMain.css'
import {getNotesForFolder, findNote, findFolder} from '../notes-helpers';


export default class NoteListMain extends React.Component {
  static contextType = NoteContext;

  render(){
     const notes = getNotesForFolder(this.context.notes, this.props.match.params.folderId)
  return (
    <section className='NoteListMain'>
       <ul>
        {notes.map(note =>
          <li key={note.id}>
            <Note
              id={note.id}
              name={note.name}
              showDelete={true}
              modified={note.modified}
            />
          </li>
        )}
      </ul>
      <div className='NoteListMain__button-container'>
        <CircleButton
          tag={Link}
          to='/add-note'
          type='button'
          className='NoteListMain__add-note-button'
        >
          <FontAwesomeIcon icon='plus' />
          <br />
          Note
        </CircleButton>
      </div>
    </section>
  )
  }
}

NoteListMain.defaultProps = {
  notes: [],
}
