import React, { Component } from 'react';
import axios from '../../../axios';

class DeleteGenre extends Component {

    state = {
        artistGenre: [],
        artistGenreId: ""
    }

    componentDidMount() {
        axios.get('/artistGenre.json')
            .then(response => {
                const fetchedArtistGenreObject = [];
                for (let key in response.data) {
                    fetchedArtistGenreObject.push({
                        ...response.data[key],
                        id: key
                    })
                }

                this.setState({ 
                    artistGenre: fetchedArtistGenreObject
                })
        })

    }

    onChangeGenreHandler = (event) => {
        this.setState({artistGenreId: event.target.value})
    }

    onClickDeleteGenreHandler = () => {
        const artistGenreId = this.state.artistGenreId.toString()
        console.log(artistGenreId)
        axios.delete('/artistGenre/' + artistGenreId + '.json')
    }

    render() {

        const genre = this.state.artistGenre.map(item => {
            return (
                <option key={item.id} value={item.id}>
                    {item.genre}
                </option>
            )
        })

        
        return (
            <div>
                <select onChange={this.onChangeGenreHandler}> 
                    <option key="blank" value="blank">
                        Select Genre
                    </option>
                    {genre}
                </select>
                {
                    this.state.artistGenreId ?
                    <div>
                        <input
                            type="submit"
                            onClick={this.onClickDeleteGenreHandler}
                        />
                    </div>
                    :
                    ""
                }
            </div>
        )
    }
}

export default DeleteGenre;