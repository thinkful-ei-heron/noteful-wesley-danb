import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import dummyStore from '../dummy-store';
import {getNotesForFolder, findNote, findFolder} from '../notes-helpers';
import NoteContext from '../noteContext'
import './App.css';

class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    componentDidMount() {
        // fake date loading from API call
        setTimeout(() => this.setState(dummyStore), 600);
    }

    renderNavRoutes() {
        const {notes, folders} = this.state;

        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => (
                            <NoteListNav />
                        )}
                      />
                ))}
                  <Route
                      path="/note/:noteId"
                      render={routeProps => {
                      // const {noteId} = routeProps.match.params;
                        /* const note = findNote(notes, noteId) || {};
                          const folder = findFolder(folders, note.folderId);*/
                        return <NotePageNav noteId={routeProps.match.params}
                                            routeProps={routeProps}/*{...routeProps} folder={folder}*/ />;
                      }}
                  />
                  <Route path="/add-folder" component={NotePageNav} />
                  <Route path="/add-note" component={NotePageNav} />
            </>
        );
    }

    renderMainRoutes() {
        const {notes, folders} = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => {
                            return (
                                <NoteListMain
                                    {...routeProps}
                                />
                            );
                        }}
                    />
                ))}
                  <Route
                      path="/note/:noteId"
                      render={routeProps => {
                          const {noteId} = routeProps.match.params;
                          const note = findNote(notes, noteId);
                          return <NotePageMain {...routeProps} note={note} />;
                      }}
                  />
            </>
        );
    }

    render() {
        const {notes, folders} = this.state;
        return (
          <NoteContext.Provider value={{
            notes: [...notes],
            folders: [...folders]
          }}>
            <div className="App">
                <nav className="App__nav">{this.renderNavRoutes()}</nav>
                <header className="App__header">
                    <h1>
                        <Link to="/">Noteful</Link>{' '}
                        <FontAwesomeIcon icon="check-double" />
                    </h1>
                </header>
                <main className="App__main">{this.renderMainRoutes()}</main>
            </div>
        </NoteContext.Provider >
        );
    }
}

export default App;
