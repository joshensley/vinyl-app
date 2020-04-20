import React, { useState } from 'react';
import VinylDisplay from './components/VinylDisplay/VinylDisplay';
import AddGenre from './components/Add/AddGenre/AddGenre';
import AddGenreSuccess from './components/Add/AddGenre/AddGenreSuccess';
import AddArtist from './components/Add/AddArtist/AddArtist';
import AddArtistSuccess from './components/Add/AddArtist/AddArtistSuccess';
import AddAlbum from './components/Add/AddAlbum/AddAlbum';
import AddAlbumSuccess from './components/Add/AddAlbum/AddAlbumSuccess';
import AddTrack from './components/Add/AddTrack/AddTrack';
import AddTrackSuccess from './components/Add/AddTrack/AddTrackSuccess';
import SelectedArtist from './containers/SelectedArtist/SelectedArtist';
import SelectedTracks from './containers/SelectedTracks/SelectedTracks';
import DeleteGenre from './components/Delete/DeleteGenre/DeleteGenre';
import DeleteGenreSuccess from './components/Delete/DeleteGenre/DeleteGenreSuccess'
import DeleteArtist from './components/Delete/DeleteArtist/DeleteArtist';
import DeleteArtistSuccess from './components/Delete/DeleteArtist/DeleteArtistSuccess'
import DeleteAlbum from './components/Delete/DeleteAlbum/DeleteAlbum';
import DeleteAlbumSuccess from './components/Delete/DeleteAlbum/DeleteAlbumSuccess';

import Admin from './components/Admin/Admin';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import  { AuthContext } from './context/auth';

import classes from './App.module.css'
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
// import ImageUpload from './Firebase/UploadImage';

function App(props) {

    // ****************** NOTE **********************
    // Uncomment authTokens and setAuthTokens when deploying website
    const [authTokens, setAuthTokens] = useState(localStorage.getItem('authTokens') || '');
    //const [authTokens, setAuthTokens] = useState("12345" || '');
    // // ****************** NOTE **********************

    const setTokens = (data) => {
      localStorage.setItem("tokens", JSON.stringify(data));
      setAuthTokens(data);
    }

    return (
      <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <BrowserRouter>
        <div>
            <header>
              <nav className={classes.Nav}>
                <ul style={{listStyle: "none"}}>
                  <li className={classes.VinylRecordsItem}>
                    <NavLink className={classes.NavLink} to="/" exact>
                      Home
                    </NavLink>
                  </li>

                  { authTokens ?
                    <span>
                      <div className={classes.Dropdown}>
                        <button className={classes.Dropbtn}>
                          Add Content
                        </button>
                        <div className={classes.DropdownContent}>
                          <li className={classes.ListItem}>
                            <NavLink className={classes.NavLink} to="/add-genre">
                              Add Genre
                            </NavLink>
                          </li>
                          <li className={classes.ListItem}>
                            <NavLink className={classes.NavLink} to="/add-artist">
                              Add Artist
                            </NavLink>
                          </li>
                          <li className={classes.ListItem}> 
                            <NavLink className={classes.NavLink} to="/add-album">
                              Add Album
                            </NavLink>
                          </li>
                          <li className={classes.ListItem}>
                            <NavLink className={classes.NavLink} to="/add-track">
                              Add Track
                            </NavLink>
                          </li>
                        </div>
                      </div>

                      <div className={classes.Dropdown}>
                        <button className={classes.Dropbtn}>
                          Delete Content
                        </button>
                        <div className={classes.DropdownContent}>
                          <li className={classes.ListItem}>
                            <NavLink className={classes.NavLink} to="/delete-genre">
                              Delete Genre
                            </NavLink>
                          </li>
                          <li className={classes.ListItem}>
                            <NavLink className={classes.NavLink} to="/delete-artist">
                              Delete Artist
                            </NavLink>
                          </li>
                          <li className={classes.ListItem}>
                            <NavLink className={classes.NavLink} to="/delete-album">
                              Delete Album
                            </NavLink>
                          </li>
                        </div>
                      </div>
                    </span>
                    :
                    ""
                  }
                  <li className={classes.ListItem}>
                    <NavLink className={classes.NavLink} to="/admin">
                      Admin
                    </NavLink>
                  </li>
                  
                </ul>
              </nav>
            </header>
            <Switch>
              <Route path="/" exact component={VinylDisplay}/>
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <PrivateRoute path="/admin" component={Admin}/>
              <PrivateRoute path="/add-genre" component={AddGenre}/>
              <PrivateRoute path="/add-genre-success" component={AddGenreSuccess}/>
              <PrivateRoute path="/add-artist" component={AddArtist}/>
              <PrivateRoute path="/add-artist-success" component={AddArtistSuccess}/>
              <PrivateRoute path="/add-album" component={AddAlbum}/>
              <PrivateRoute path="/add-album-success" component={AddAlbumSuccess}/>
              <PrivateRoute path="/add-track" component={AddTrack} />
              <PrivateRoute path="/add-track-success" component={AddTrackSuccess}/>
              <PrivateRoute path="/delete-genre" component={DeleteGenre}/>
              <PrivateRoute path="/delete-genre-success" component={DeleteGenreSuccess}/>
              <PrivateRoute path="/delete-artist" component={DeleteArtist}/>
              <PrivateRoute path="/delete-artist-success" component={DeleteArtistSuccess}/>
              <PrivateRoute path="/delete-album" component={DeleteAlbum}/>
              <PrivateRoute path="/delete-album-success" component={DeleteAlbumSuccess}/>
              <Route path="/albums/:id" exact component={SelectedArtist}/>
              <Route path="/tracks/:id" exact component={SelectedTracks}/>
              {/* <Route path="/upload" exact component={UploadImage}/> */}
            </Switch>          
        </div>
      </BrowserRouter>
      </AuthContext.Provider>
    );
}

export default App;