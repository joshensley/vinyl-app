import React, { Component } from 'react';
import axios from '../../../axios';
import { Redirect } from 'react-router-dom';

class AddAlbumSuccess extends Component {

    state = {
        clickedHome: false,
        clickedAddAlbum:false,
        clickedAddTracks:false,
        passedFromAddAlbum: this.props.location.state,
        data: null
    }

    componentDidMount() {
        const artistId = this.state.passedFromAddAlbum.artistId.toString()
        const albumId = this.state.passedFromAddAlbum.albumId.toString()

        axios.get('/artist/' + artistId + '/albums/' + albumId + '.json').then(response => {
            this.setState({data: response.data})
        })
    }

    onClickAddAlbum = () => {
        this.setState({clickedAddAlbum: true})
    }

    onClickAddTracks = () => {
        this.setState({clickedAddTracks: true})
    }

    onClickHome = () => {
        this.setState({clickedHome: true})
    }

    render() {

        if (this.state.clickedAddAlbum) {
            return <Redirect to={{ pathname: "/add-album" }}/>
        }

        if (this.state.clickedAddTracks) {
            return <Redirect to={{ pathname: "/add-track"}}/> 
        }
        if (this.state.clickedHome) {
            return <Redirect to={{ pathname: "/" }}/>
        }

        let artistDisplay = ""
        if (this.state.data !== null) {
            artistDisplay = (
                <div>
                    <p>{this.state.data.album}</p>
                    <p>{this.state.data.albumYear}</p>
                    <img
                        src={this.state.data.url}
                        alt="Uploaded Images"
                        height="250"
                        width="250"
                        style={{borderRadius: "10px"}}
                    />
                    <button onClick={this.onClickAddAlbum}>Add Album</button>
                    <button onClick={this.onClickAddTracks}>Add Tracks</button>
                    <button onClick={this.onClickHome}>Home</button>
                </div>
            )
        }
        
        return (
            <div>
                {artistDisplay}
            </div>
        )
    }
}

export default AddAlbumSuccess;