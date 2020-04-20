import React, { Component } from 'react';
import classes from './AddGenre.module.css';
import axios from '../../../axios';
import { Redirect } from 'react-router-dom';

class AddGenre extends Component {

    state ={
        genreInput: null,
        genreCreated: false,
        passedData: null
    }

    onChangeGenreHandler = (event) => {
        this.setState({genreInput: event.target.value})
    }

    submitButton = () => {
        const addNewGenre = {
            genre: this.state.genreInput
        }

        axios.post('/artistGenre.json', addNewGenre)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        genreCreated: true,
                        passedData: {"genre": this.state.genreInput}
                    })
                }
            });
    }

    render () {

        if (this.state.genreCreated) {
            return <Redirect to={{pathname: "/add-genre-success", state: this.state.passedData}}/>
        }

        return (
            <div className={classes.AddGenre}>
                <input
                    className={classes.InputBox}
                    placeholder="Add Genre"
                    type="text"
                    onChange={this.onChangeGenreHandler}
                />
                <br></br>
                <input
                    className={classes.SubmitButton}
                    type="submit"
                    onClick={this.submitButton}
                />
            </div>
        );
    }
}

export default AddGenre;