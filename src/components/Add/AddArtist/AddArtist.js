import React, { Component } from 'react';
import classes from './AddArtist.module.css';
import axios from '../../../axios';
import { Redirect } from 'react-router-dom';

class AddArtist extends Component {

    state = {
       artistInput: null,
       genreInput: null,
       artistGenreSelection: null,
       artistCreated: false
    }

    componentDidMount() {
        axios.get('/artistGenre.json')
            .then(response => {
                const fetchedGenre =[];
                for (let key in response.data) {
                    fetchedGenre.push({...response.data[key], id: key})
                    
                }
                this.setState({
                    artistGenreSelection: fetchedGenre
                })
            })
    }

    onChangeArtistInputHandler = (event) => {
        const input = event.target.value
        this.setState({artistInput: input})
    }

    onChangeGenreInputHandler = (event) => {
        const input = event.target.value
        this.setState({genreInput: input})
        
    }

    onClickArtistInputButtonHandler = () => {
        const addNewArtist = {
            "artist": this.state.artistInput,
            "genre": this.state.genreInput
        }

        axios.post('/artist.json', addNewArtist)
            .then(response => {
                if (response.status === 200) {
                    this.setState({ artistCreated: true });
                }
            })
        
    }

    render () {

        if (this.state.artistCreated) {
            return (
                <Redirect to={{
                    pathname: "/add-artist-success", 
                    state: {
                        "artist": this.state.artistInput, 
                        "genre": this.state.genreInput}
                }} />);
        }

        return (
            <div className={classes.AddArtist}>
                
                <input
                    placeholder="Add Artist"
                    className={classes.InputBox}
                    onChange={this.onChangeArtistInputHandler}
                />
                <br></br>
                <select 
                    className={classes.InputBox}
                    onChange={this.onChangeGenreInputHandler}
                >
                    <option>Select Genre</option>
                    {
                        this.state.artistGenreSelection ?
                        this.state.artistGenreSelection.map(item => {
                            return (
                            <option key={item.id} value={item.genre}>
                                {item.genre}
                            </option>)
                        })
                        :
                        "" 
                    }
                </select>
                <br></br>
                <input
                    className={classes.SubmitButton}
                    type="submit"
                    onClick={this.onClickArtistInputButtonHandler}
                />
                
            </div>
        );
    }
}

export default AddArtist;