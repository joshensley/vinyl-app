import React, { Component } from 'react';
import axios from '../../../axios';

import { Redirect } from 'react-router-dom';

class DeleteAlbum extends Component {

    state = {
        artistInformation: [],
        selectedArtistId: "",
        albumInformation: [],
        selectedAlbumId: "",
        loading: true,
        deleted: false
    }

    componentDidMount() {
        axios.get('/artist.json')
            .then(response => {
                const fetchedArtistObject = [];
                for (let key in response.data) {
                    fetchedArtistObject.push({
                        ...response.data[key],
                        id: key
                    })
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
            
    }

    onChangeArtistSelectHandler = (event) => {
        this.setState({selectedArtistId: event.target.value});
    };

    onChangeAlbumSelectHandler = (event) => {
        this.setState({selectedAlbumId: event.target.value, });
    }

    onClickDeleteAlbumHandler = () => {
        const artistId = this.state.selectedArtistId.toString()
        const albumId = this.state.selectedAlbumId.toString()

        axios.delete('artist/' + artistId + '/albums/' + albumId + '.json')
            .then(this.setState({deleted: true})
        )
    }

    render() {

        if (this.state.deleted) {
            return <Redirect to={{ pathname: "/delete-album-success"}}/>
        }

        const fetchedAlbumObject = [];
        if (this.state.selectedArtistId) {

            const filteredArtist = this.state.artistInformation.filter(item => 
                item.id === this.state.selectedArtistId)
        
            for (let key in filteredArtist[0].albums) {
                fetchedAlbumObject.push({
                    ...filteredArtist[0].albums[key],
                    id: key
                })
            }
        }

        
        
        return (
            <div>
                <select onChange={this.onChangeArtistSelectHandler}>
                    <option key="blank" value="blank">Select Artist</option>
                {
                    this.state.loading ? 
                    null
                    : 
                    this.state.artistInformation.map(item => (
                        <option key={item.id} value={item.id}>
                            {item.artist}
                        </option>
                    ))
                }
                </select>
                <br></br>

                <select onChange={this.onChangeAlbumSelectHandler}>
                    <option key="blank" value="blank">Select Album</option>
                    {
                        this.state.selectedArtistId ?
                        fetchedAlbumObject.map(item => (
                            <option key={item.id} value={item.id}>
                                {item.album}
                            </option>
                        ))
                        :
                        ""
                        
                    }
                </select>

                <div>
                    {
                        this.state.selectedAlbumId ?
                        <input
                            type="submit"
                            onClick={this.onClickDeleteAlbumHandler}
                        />
                        :
                        ""
                    }
                    
                </div>
            </div>
        )
    }
}

export default DeleteAlbum;