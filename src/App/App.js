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
        Promise.all([
            fetch('http://localhost:9090/notes/'),
            fetch('http://localhost:9090/folders/')
        ])
        .then(([notesRes,foldersRes])  => {
            if(!notesRes.ok){
                console.log('notes not okay');
            }
            if(!foldersRes.ok){
                console.log('folders not okay');
            }return Promise.all([notesRes.json(),foldersRes.json()])
        } )
        .then(([notes,folders]) => {
            this.setState({
                notes,
                folders
            })
        })
        console.log(this.state)
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
                        return <NotePageNav noteId={routeProps.match.params}
                                            history={routeProps.history} />;
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
                          return <NotePageMain {...routeProps}/>;
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
