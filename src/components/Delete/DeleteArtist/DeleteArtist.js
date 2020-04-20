import React, { Component } from "react";
import axios from "../../../axios";
import { Redirect } from "react-router-dom";

class DeleteArtist extends Component {

    state = {
        artistInformation: [],
        selectArtistId: "",
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

                    const noAlbums = fetchedArtistObject.filter(item => {
                        return Object.keys(item).indexOf("albums") === -1
                    })
                    
                    this.setState({
                        artistInformation: noAlbums
                    })
                })
        }

    onChangeArtistSelectHandler = (event) => {
        this.setState({selectArtistId: event.target.value})
    }

    onClickDeleteArtistHandler = () => {
        const artistId = this.state.selectArtistId.toString()
        axios.delete('artist/' + artistId + '.json')
            .then(this.setState({deleted: true}))
    }

    render() {
        
        if (this.state.deleted) {
            return <Redirect to={{ pathname: "/delete-artist-success"}}/>
        }

        return (
            <div>
                {
                    Object.keys(this.state.artistInformation).length === 0 ?
                    <div>All Artists currently have albums. You can't delete an artist without removing all their albums first.</div>
                    :
                    <div>
                        <select onChange={this.onChangeArtistSelectHandler}>
                            <option key="blank" value="blank">Select Artist</option>
                            {
                                this.state.artistInformation ?
                                this.state.artistInformation.map(item => (
                                    <option key={item.id} value={item.id}>
                                        {item.artist}
                                    </option>
                                ))
                                :
                                ""
                            }
                        </select>
                        <div>
                            {
                                this.state.selectArtistId ?
                                <input
                                    type="submit"
                                    onClick={this.onClickDeleteArtistHandler}
                                />
                                :
                                ""
                            }   
                        </div>
                    </div>
                }

            </div>
        )
    }
}

export default DeleteArtist;