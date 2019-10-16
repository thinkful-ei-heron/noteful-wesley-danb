import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import './NotePageNav.css'
import {getNotesForFolder, findNote, findFolder} from '../notes-helpers';
import NoteContext from '../noteContext'


export default class NotePageNav extends React.Component {
    static contextType = NoteContext

  componentDidMount(){
    const note = findNote(this.context.notes, this.props.noteId) || {};
    const folder = findFolder(this.context.folders, note.folderId)

  }
  render(){
    console.log(this.props)
  return (
    <div className='NotePageNav'>
      <CircleButton
        tag='button'
        role='link'
        onClick={() => this.props.routeProps.history.goBack()}
        className='NotePageNav__back-button'
      >
        <FontAwesomeIcon icon='chevron-left' />
        <br />
        Back
      </CircleButton>
      {this.folder && (
        <h3 className='NotePageNav__folder-name'>
          {this.folder.name}
        </h3>
      )}
    </div>
  )
  }
}

NotePageNav.defaultProps = {
}
