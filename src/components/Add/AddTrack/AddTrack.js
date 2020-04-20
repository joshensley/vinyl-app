import React, { Component } from 'react';
import axios from '../../../axios';
import classes from './AddTrack.module.css';
import { Redirect } from 'react-router-dom';

class AddTrack extends Component {

    state = {
        rawData: [],
        artistInformation: [],
        loading: true,
        selectedArtistId: null,
        selectedAlbumId: null,
        tracks: [{trackNumber:"", trackTitle:"", trackArtist:""}],
        tracksCreated: false,
        passedData: null
    };

    componentDidMount() {
        axios.get('artist.json').then(response => {
            const fetchedArtistObject = [];
                for (let key in response.data) {
                    fetchedArtistObject.push({
                        ...response.data[key], 
                        id: key
                    });
                }

            function compare(a, b) {
                if(a.artist < b.artist) { return -1; }
                if(a.artist > b.artist) { return 1; }
                return 0;
            }
            fetchedArtistObject.sort(compare);

            const withAlbums = fetchedArtistObject.filter(item => {
                return Object.keys(item).indexOf("albums") > -1
            })
            
            this.setState({
                rawData: response.data,
                artistInformation: withAlbums,
                loading: false
            })
        })
    }

    onChangeArtistSelectHandler = (event) => {
        this.setState({
            selectedArtistId: event.target.value, 
            selectedAlbumId: null
        });  
    }

    onChangeAlbumSelectHandler = (event) => {
        this.setState({selectedAlbumId: event.target.value})
    }

    onClickAddTrackHandler = () => {
        this.setState((prevState) => ({
            tracks: [...prevState.tracks, {trackNumber:"", trackTitle: "", trackArtist: ""}]
        }));
    }

    onClickRemoveTrackHandler = () => {
        const array = [...this.state.tracks]
        if ( array.length > 1) {
            array.pop()
            this.setState({
                tracks: array
            })
        }
        
    }

    handleSubmit = (event) => {
        event.preventDefault()
    }

    handleChange = (event) => {
        if (["trackNumber", "trackTitle", "trackArtist"].includes(event.target.className)) {
            let tracks = [...this.state.tracks]
            tracks[event.target.dataset.id][event.target.className] = event.target.value
            this.setState({tracks})
        }
    }

    onClickSubmitTracksHandler = () => {
        const insertArtistId = this.state.selectedArtistId.toString()
        const insertAlbumId = this.state.selectedAlbumId.toString()

        for (let i = 0; i < this.state.tracks.length; i++) {
            axios.post('/artist/' + insertArtistId + '/albums/' + insertAlbumId + '/tracks.json', this.state.tracks[i])
                .then(response => {
                        if (response.status === 200) {
                            this.setState({
                                passedData: this.state.tracks,
                                tracksCreated: true
                                
                            })
                        }
                    }
                );
        } 
    }

    render () {

        if (this.state.tracksCreated) {
            return <Redirect to={{pathname: "/add-track-success", state: this.state.passedData}} />
        }
   
        let displayAlbum = ""
        if (this.state.selectedArtistId) {
            let album = this.state.artistInformation
                .filter(item => {
                    return item.id === this.state.selectedArtistId
                }).map(item => item.albums)[0]

            displayAlbum = Object.keys(album).map(albumKey => {
                let albumTitle = album[albumKey].album
                return (
                    <option key={albumKey} value={albumKey}>
                        {albumTitle}
                    </option>
                    )
                })
        }

        let {tracks} = this.state

        return (
            <div>
                <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                    <div className={classes.CenterButtons}>
                    <select className={classes.SearchBox} onChange={this.onChangeArtistSelectHandler}>
                        <option key="blank" value="blank">Select Artist</option>
                        {
                            !this.state.loading ? 
                            this.state.artistInformation.map(item => ( 
                                <option key={item.id} value={item.id}>
                                    {item.artist}
                                </option>
                            )) 
                            : 
                            null
                        }
                    </select>
                    </div>
                        {
                            this.state.selectedArtistId ?
                            <div className={classes.CenterButtons}>
                                <select className={classes.SearchBox} onChange={this.onChangeAlbumSelectHandler}>
                                    <option key="blank" value="blank">Select Album</option>
                                    {displayAlbum}
                                </select>
                            </div>
                            :
                            null
                        }
                    
                    { 
                        this.state.selectedAlbumId ?
                        
                        <div>
                            <div className={classes.CenterButtons}>
                                <div>
                                    <button 
                                        onClick={this.onClickAddTrackHandler} 
                                        className={classes.SearchBox}
                                        >
                                            Add New Track
                                    </button>
                                </div>
                                <div>
                                    <button 
                                        onClick={this.onClickRemoveTrackHandler} 
                                        className={classes.SearchBox}
                                        >
                                            Remove Track
                                    </button>
                                </div>
                            </div>

                            {    
                                tracks.map((val, index) => { 
                                    let trackNumberId = `trackNumberId-${index}`
                                    let trackTitleId = `trackTitleId-${index}`
                                    let trackArtistId = `trackArtistId-${index}`
                                    return (
                                        <div key={index} className={classes.AddTrackDisplay}>
                                            <label style={{padding: "10px"}} >{index + 1}</label>
                                            {/* <label style={{padding: "10px"}}>Track</label> */}
                                            <input
                                                placeholder="Track #"
                                                type="text"
                                                name={trackNumberId}
                                                data-id={index}
                                                id={trackNumberId}
                                                className="trackNumber"
                                                style={{borderRadius: "10px", width: "200px", height: "25px", fontSize: "25px"}}
                                            />
                                            {/* <label style={{padding: "10px"}}>Title</label> */}
                                            <input
                                                placeholder="Song Title"
                                                type="text"
                                                name={trackTitleId}
                                                data-id={index}
                                                id={trackTitleId}
                                                className="trackTitle"
                                                style={{borderRadius: "10px", width: "200px", height: "25px", fontSize: "25px"}}
                                            />
                                            {/* <label style={{padding: "10px"}}>Artist</label> */}
                                            <input
                                                placeholder="Artist Name"
                                                type="text"
                                                name={trackArtistId}
                                                data-id={index}
                                                id={trackArtistId}
                                                className="trackArtist"
                                                style={{borderRadius: "10px", width: "200px", height: "25px", fontSize: "25px"}}
                                            />  
                                        </div> 
                                    )
                                }) 
                            }
                            <div className={classes.CenterButtons}>
                                <input 
                                    className={classes.SearchBox}
                                    type="submit" 
                                    value="Submit" 
                                    onClick={this.onClickSubmitTracksHandler}
                                />
                            </div>
                        </div>
                        :
                        null
                    }
                    
                </form>
            </div>
        )
    } 
}

export default AddTrack;