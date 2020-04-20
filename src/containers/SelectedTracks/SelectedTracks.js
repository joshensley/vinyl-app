import React, { Component } from 'react';
import axios from '../../axios';

import classes from './SelectedTracks.module.css';

class SelectedTracks extends Component {

    state = {
        loadedTracks: null,
        albumUrl: this.props.location.state.passedAlbumUrl,
        albumName: this.props.location.state.passedAlbumName,
        artistName: this.props.location.state.passedArtistName,
        albumYear: this.props.location.state.passedAlbumYear
    }

    componentDidMount () {
        
        const artistId = this.props.location.state.artistId.toString()
        const albumId = this.props.match.params.id.toString()
        axios.get('/artist/' + artistId + '/albums/' + albumId + '/tracks.json').then(response => {

            const fetchedTracks = []
            for (let key in response.data) {
                fetchedTracks.push({...response.data[key], id: key})
            }

            function compare(a, b) {
                return a.trackNumber - b.trackNumber
            }
            fetchedTracks.sort(compare);

            this.setState({
                loadedTracks: fetchedTracks
            })
        })
    }

    render () {
        let trackList = ""
        if (this.state.loadedTracks) {
            trackList = this.state.loadedTracks.map(item => {
                return (
                    <tr key={item.id}>
                        <td>{item.trackNumber}</td>
                        <td>{item.trackTitle}</td>
                        <td>{item.trackArtist}</td>
                    </tr>     
                )
            })
        }
        return (
                <div>
                    <div>
                        
                        <div className={classes.AlbumImageBorder}>
                            <span>
                                <img 
                                    src={this.state.albumUrl}
                                    alt="Uploaded Images"
                                    height="200"
                                    width="200"
                                    style={{borderRadius: "10px"}}
                                />
                            </span>
                            <span style={{padding: "10px"}}>
                                <div>
                                    <h1 className={classes.Artist}>{this.state.artistName}</h1>
                                    <h1 className={classes.Album}>{this.state.albumName} ({this.state.albumYear})</h1>
                                </div>
                            </span>
                        </div>
                        
                    </div>
                    <br></br>
                    {
                        !this.state.loadedTracks ? 
                        <div className={classes.Loader}></div> 
                        :    
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Artist</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trackList}
                            </tbody>
                        </table>
                    }
                </div>
            
        )
    }
}

export default SelectedTracks;