import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class AddArtistSuccess extends Component {

    state = {
        clickedHome: false,
        clickedAddArtist: false,
        clickedAddAlbum: false,
        passedFromAddArtist: this.props.location.state
    }

    onClickAddArtist = () => {
        this.setState({clickedAddArtist: true})
    }

    onClickAddAlbum = () => {
        this.setState({clickedAddAlbum: true})
    }

    onClickHome = () => {
        this.setState({clickedHome: true})
    }

    render() {
        
        if (this.state.clickedAddArtist) {
            return <Redirect to={{pathname: "/add-artist"}}/>
        }
        if (this.state.clickedAddAlbum) {
            return <Redirect to={{pathname: "/add-album"}}/>
        }
        if (this.state.clickedHome) {
            return <Redirect to={{pathname: "/"}}/>
        }

        return (
            <div>
                <div><strong>{this.state.passedFromAddArtist.artist}</strong> was successfully added to the <strong>{this.state.passedFromAddArtist.genre}</strong> genre!</div>
                <button onClick={this.onClickAddArtist}>Add Artist</button>
                <button onClick={this.onClickAddAlbum}>Add Album</button>
                <button onClick={this.onClickHome}>Home</button>
            </div>
        );
    }
} 

export default AddArtistSuccess;