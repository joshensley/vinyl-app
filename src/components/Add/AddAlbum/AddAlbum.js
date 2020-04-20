import React, { Component } from 'react';
import axios from '../../../axios';
import storage from '../../../Firebase/index';
import classes from './AddAlbum.module.css';

import { Redirect } from 'react-router-dom';

class AddAlbum extends Component {

    state = {
        loading: true,
        // Artist Information
        artistInformation: [],
        selectedArtistId: "",
        inputAlbum: "",
        inputAlbumYear: "",
        // Artist Image
        image: null,
        url: "",
        progress: 0,
        // Album Created
        albumCreated: false,
        passedData: null

    };

    componentDidMount() {
        axios.get('/artist.json')
            .then(response => {
                const fetchedArtistObject = [];
                for (let key in response.data) {
                    fetchedArtistObject.push({
                        ...response.data[key], 
                        id: key
                    });
                }

                function compare(a, b) {
                    if (a.artist < b.artist) { return -1; }
                    if (a.artist > b.artist) { return 1; }
                    return 0;
                }
                fetchedArtistObject.sort(compare)

                this.setState({
                    artistInformation: fetchedArtistObject,
                    loading: false
                })
            })
    };

    onChangeArtistSelectHandler = (event) => {
        this.setState({selectedArtistId: event.target.value});  
    };

    onChangeAlbumInputHandler = (event) => {
        this.setState({inputAlbum: event.target.value});
    };

    onChangeAlbumYearInputHandler = (event) => {
        this.setState({inputAlbumYear: event.target.value})
    }

    onChangeImageHandler = (event) => {
        if (event.target.files[0]) {
            const image = event.target.files[0];
            this.setState(() => ({ image }));
        }
    };

    onClickSubmitAlbumHandler = () => {
        const { image } = this.state;
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {
                // progress function ...
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                this.setState({ progress });
            },
            error => {
                // Error function ...
                console.log(error);
            },
            () => {
                //complete function ...
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        this.setState({ url });
                        // Posting album information to firebase
                        const insert = this.state.selectedArtistId.toString() 
                        const addNewAlbum = {
                            "album": this.state.inputAlbum,
                            "albumYear": this.state.inputAlbumYear,
                            "url": this.state.url
                        }
                        axios.post('/artist/' + insert + '/albums.json', addNewAlbum)
                            .then(response => {
                                if (response.status === 200) {
                                    this.setState({ 
                                        albumCreated: true, 
                                        passedData: {
                                            albumId: response.data.name, 
                                            artistId: this.state.selectedArtistId
                                        }
                                    })
                                }
                            });
                    })
                }
        );     
         
    }
    render() {

        if (this.state.albumCreated) {
            return <Redirect to={{pathname: "/add-album-success", state: this.state.passedData}}/>
        }

        return (
            <div>
                <div>
                    <progress 
                        value={this.state.progress} 
                        max="100"
                    />
                </div>

                {/* Selecting the Artist */}
                <div className={classes.AddAlbum}>
                    <select 
                        onChange={this.onChangeArtistSelectHandler} 
                        className={classes.InputBox}
                    >
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
                <br></br>

                {/* Entering the title to the album */}
                <div className={classes.AddAlbum}>
                    <input 
                        type="text"
                        onChange={this.onChangeAlbumInputHandler}
                        value={this.state.inputAlbum}
                        placeholder="Enter Album Title"
                        className={classes.InputBox}

                    />
                </div> 
                <br></br>

                {/* Entering the album year */}
                <div className={classes.AddAlbum}>
                    <input
                        type="text"
                        onChange={this.onChangeAlbumYearInputHandler}
                        value={this.state.inputAlbumYear}
                        placeholder="Enter Album Year"
                        className={classes.InputBox}
                    />
                </div>
                {/* Uploading the album cover */}
                <div className={classes.AddAlbum}>
                    <input
                        type="file"
                        size="60"
                        onChange={this.onChangeImageHandler}
                        // className={classes.InputFile}
                    />
                    {/* <label for="file">Choose File</label> */}
                </div>
                <br></br>

                {/* Submiting the information */}
                <div className={classes.AddAlbum}>
                    <input 

                        className={classes.SubmitButton}
                        type="submit"
                        onClick={this.onClickSubmitAlbumHandler} 
                    />   
                </div>  
            </div>
        )
    }
}

export default AddAlbum;