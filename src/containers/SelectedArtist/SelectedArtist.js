import React, { Component } from 'react';
import SelectedAlbums from '../SelectedAlbums/SelectedAlbums';
import classes from './SelectedArtist.module.css';
import axios from '../../axios';
import { Link } from 'react-router-dom';

class SelectedArtist extends Component {

    state = {
        loadedArtist: null,
        loadedArtistName: null
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            if (!this.state.loadedArtist || (this.state.loadedArtist && this.state.loadedArtist.id !== this.props.match.params.id)) {
                const insert = this.props.match.params.id.toString()
                axios.get('/artist/' + insert + '/albums.json')
                    .then(response => {

                        const fetchedArtistData = []
                        for(let key in response.data) {
                            fetchedArtistData.push({...response.data[key], id: key})
                        }
                        function compare(a, b) {
                            return a.albumYear - b.albumYear
                        }
                        fetchedArtistData.sort(compare);
                        this.setState({ loadedArtist: fetchedArtistData })
                    })

                axios.get('/artist/' + insert + '/artist.json')
                    .then(response => {
                        this.setState({ loadedArtistName: response.data})
                    })
            }
        }
    }


    render() {
        let selectedArtist = ""
        if (this.state.loadedArtist) {
            let artistAlbum = this.state.loadedArtist.map(album => {
                return (
                    <Link
                        key={album.id}
                        to={{
                            pathname: "/tracks/" + album.id,
                            state: { 
                                artistId: this.props.match.params.id, 
                                passedAlbumUrl: album.url,
                                passedAlbumName: album.album,
                                passedAlbumYear: album.albumYear,
                                passedArtistName: this.state.loadedArtistName
                            }
                        }}
                    >
                        <SelectedAlbums
                            album={album.album}
                            url={album.url}
                            albumYear={album.albumYear}
                        />
                    </Link>
                )
            })

            selectedArtist = (
                <div>
                    {
                        !this.state.loadedArtistName ? 
                        <div>
                            <br></br>
                            <div className={classes.Loader}></div>
                        </div>
                        : 
                        <div>
                            <div className={classes.ArtistHeading}>
                                <h1 className={classes.ArtistFont}>{this.state.loadedArtistName}</h1>
                            </div>
                            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", padding: "10px" }}>
                                {artistAlbum}
                            </div>
                        </div>
                    }
                    
                </div>
            );
        }

        return (
            <div style={{ textAlign: "center" }}>
                {selectedArtist}
            </div>
        )
    }
}

export default SelectedArtist;