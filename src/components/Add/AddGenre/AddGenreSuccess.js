import React, { Component } from 'react';
import { Redirect } from 'react-router';
//import { Redirect } from 'react-router-dom';

class AddGenreSuccess extends Component {

    state= {
        clickedHome: false,
        clickedAddGenre: false,
        clickedAddArtist: false,
        passedFromAddGenre: this.props.location.state
    }

    onClickedAddGenre = () => {
        this.setState({clickedAddGenre: true})
    }

    onClickedAddArtist = () => {
        this.setState({clickedAddArtist: true})
    }

    onClickedHome = () => {
        this.setState({clickedHome: true})
    }

    render() {

        if (this.state.clickedAddGenre) {
            return <Redirect to={{ pathname: "/add-genre"}}/>
        }

        if (this.state.clickedAddArtist) {
            return <Redirect to={{ pathname: "/add-artist"}}/>
        }

        if (this.state.clickedHome) {
            return <Redirect to={{ pathname: "/"}}/>
        }

        
        return (
            <div>
                <p><strong>{this.state.passedFromAddGenre.genre}</strong> was successfully created!</p>
                <button onClick={this.onClickedAddGenre}>Add Genre</button>
                <button onClick={this.onClickedAddArtist}>Add Artist</button>
                <button onClick={this.onClickedHome}>Home</button>
            </div>
        )
    }
}

export default AddGenreSuccess;