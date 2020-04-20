import React, { Component } from 'react';
import ArtistCard from '../../containers/ArtistCard/ArtistCard';
import Pagination from '../Pagination/Pagination';
import axios from '../../axios';

import { Link } from 'react-router-dom';
//import JSON from '../../db.json';
import classes from './VinylDisplay.module.css';

const alphabet = ["A", "B", "C", "D", "E", "F",
                "G", "H", "I", "J", "K", "L",
                "M", "N", "O", "P", "Q", "R", 
                "S", "T", "U", "V", "W", "X", 
                "Y", "Z"]

class VinylDisplay extends Component {

    state = {
        // Displaying Artist
        artistInformation: [],
        filteredArtistInformation: [],
        loading: true,
        searchText: "",
        genreFilter: null,
        artistGenreSelection: null,
        letterSelection: null,
        // Pagination
        postsPerPage: 10,
        indexOfFirstPost: 0,
        indexOfLastPost: 0,
        currentPageNumber: 1
    }

    componentDidMount() {
        axios.get('/artist.json')
            .then(response => {

                const fetchedArtist = [];
                for (let key in response.data) {
                     // Displays a random album cover
                    const hasAlbums = Object.keys(response.data[key]).indexOf("albums") > -1;
                    if (hasAlbums) {
                        const albumKeys = Object.keys(response.data[key].albums);
                        function randomAlbumKey(albumKeys) {
                            return albumKeys[Math.floor(Math.random() * albumKeys.length)]
                        }
                        const albumKey = randomAlbumKey(albumKeys);
                        const url = response.data[key].albums[albumKey].url

                        fetchedArtist.push({
                            ...response.data[key], 
                            id: key, 
                            randomAlbumUrl: url,
                            numberOfAlbums: albumKeys.length
                        });
                    } else {
                        fetchedArtist.push({...response.data[key], id: key});
                    }     
                }

                // Returns object that only contains Albums within the object
                const filteredFetchedArtist = fetchedArtist.filter(array => {
                    return (Object.keys(array).includes("albums"))
                })

                // Sorts artist by most albums
                function compare(a, b) {
                    return b.numberOfAlbums - a.numberOfAlbums;
                }
                filteredFetchedArtist.sort(compare);

                // Gets the unique genres from the artist information
                const unique = (x, i, a) => a.indexOf(x) === i;
                const fetchedGenreArray = fetchedArtist.map(array => {
                    return array.genre;
                })
                const fetchedGenre = fetchedGenreArray.filter(unique);

                this.setState({
                    artistInformation: filteredFetchedArtist,
                    filteredArtistInformation: filteredFetchedArtist,
                    loading: false,
                    indexOfFirstPost: 0,
                    indexOfLastPost: this.state.postsPerPage,
                    artistGenreSelection: fetchedGenre
                })
            })
    }

    searchArtistHandler = (event) => {

        this.setState({searchText: event.target.value.toString()})
        
        if (this.state.genreFilter === null && this.state.letterSelection === null) {
            const keyword = event.target.value.toLowerCase()
            const filtered = this.state.artistInformation.filter(item => {
                const artistLowerCase = item.artist.toLowerCase()
                return artistLowerCase.indexOf(keyword) > -1
            });
            this.setState({
                filteredArtistInformation: filtered,
                indexOfFirstPost: 0,
                indexOfLastPost: this.state.postsPerPage
            })   
        } else if (this.state.genreFilter !== null && this.state.letterSelection === null) {
            const keyword = event.target.value.toLowerCase()
            const filtered = this.state.artistInformation.filter(item => {
                const artistLowerCase = item.artist.toLowerCase()
                return artistLowerCase.indexOf(keyword) > -1 && item.genre === this.state.genreFilter
            });
            this.setState({
                filteredArtistInformation: filtered,
                indexOfFirstPost: 0,
                indexOfLastPost: this.state.postsPerPage
            })   
        } else if (this.state.genreFilter === null && this.state.letterSelection !== null) {
            const keyword = event.target.value.toLowerCase()
            const filtered = this.state.artistInformation.filter(item => {
                const artistLowerCase = item.artist.toLowerCase()
                const artistFirstLetter = item.artist[0].toUpperCase()
                return artistLowerCase.indexOf(keyword) > -1 && artistFirstLetter === this.state.letterSelection
            });
            this.setState({
                filteredArtistInformation: filtered,
                indexOfFirstPost: 0,
                indexOfLastPost: this.state.postsPerPage
            })   

        } else {
            const keyword = event.target.value.toLowerCase()
            const filtered = this.state.artistInformation.filter(item => {
                const artistLowerCase = item.artist.toLowerCase()
                const artistFirstLetter = item.artist[0].toUpperCase()
                return (
                    artistLowerCase.indexOf(keyword) > -1 && 
                    item.genre === this.state.genreFilter &&
                    artistFirstLetter === this.state.letterSelection
                )
            });
            this.setState({
                filteredArtistInformation: filtered,
                indexOfFirstPost: 0,
                indexOfLastPost: this.state.postsPerPage
            })
        }
    }

    onChangeGenreHandler = (event) => {
        const {value} = event.target
        if (value === "All Genres" && this.state.letterSelection === null) {
            this.setState({
                filteredArtistInformation: this.state.artistInformation,
                genreFilter: null,
                searchText: "",
                indexOfFirstPost: 0,
                indexOfLastPost: this.state.postsPerPage,
                currentPageNumber: 1
            })
        } else if (value === "All Genres" && this.state.letterSelection !== null) {
            const filterLetterSelection = this.state.artistInformation.filter(array => {
                return (array.artist[0].toUpperCase() === this.state.letterSelection)
            })
            this.setState({
                filteredArtistInformation: filterLetterSelection,
                genreFilter: null,
                searchText: "",
                indexOfFirstPost: 0,
                indexOfLastPost: this.state.postsPerPage,
                currentPageNumber: 1
            })

        } else if (this.state.letterSelection !== null) {
            const filterLetterSelection = this.state.artistInformation.filter(array => {
                return (array.genre === value && array.artist[0].toUpperCase() === this.state.letterSelection)
            })
            this.setState({
                filteredArtistInformation: filterLetterSelection,
                genreFilter: value,
                searchText: "",
                indexOfFirstPost: 0,
                indexOfLastPost: this.state.postsPerPage,
                currentPageNumber: 1
            })
        } 
          
        else {
            const filterGenre = this.state.artistInformation.filter(array => {
                return (array.genre === value);
            })
            this.setState({
                filteredArtistInformation: filterGenre,
                genreFilter: value,
                searchText: "",
                indexOfFirstPost: 0,
                indexOfLastPost: this.state.postsPerPage,
                currentPageNumber: 1
            })
        }
    }

    onChangeSortHandler = (event) => {
        const {value} = event.target   
        switch (value) {
            case "Sort Z-A":
                function sortReverseCompare(a, b) {
                    if (a.artist < b.artist) { return 1; }
                    if (a.artist > b.artist) { return -1; }
                    return 0;
                }
                const sortReverse = this.state.filteredArtistInformation
                    .sort(sortReverseCompare);
                this.setState({
                    filteredArtistInformation: sortReverse
                })
                break;

            case "Sort A-Z":
                function sortCompare(a, b) {
                    if (a.artist < b.artist) { return -1; }
                    if (a.artist > b.artist) { return 1; }
                    return 0;
                }
                const sort = this.state.filteredArtistInformation
                    .sort(sortCompare);
                this.setState({
                    filteredArtistInformation: sort
                })
                break;

            case "Most Albums":
                function sortMostAlbumsCompare(a, b,) {
                    return b.numberOfAlbums - a.numberOfAlbums
                }
                const sortMostAlbums = this.state.filteredArtistInformation
                    .sort(sortMostAlbumsCompare);
                this.setState({
                    filteredArtistInformation: sortMostAlbums
                })
                break;

            default:
                function sortDefaultCompare(a, b) {
                    if (a.artist < b.artist) { return -1; }
                    if (a.artist > b.artist) { return 1; }
                    return 0;
                }
                const sortDefault = this.state.filteredArtistInformation
                    .sort(sortDefaultCompare);
                this.setState({
                    filteredArtistInformation: sortDefault
                })

        }

    }

    onChangeAlphaLetterHandler = (event) => {
        let {value} = event.target
        
        if (value === "All" && this.state.genreFilter === null) {
            this.setState({
                filteredArtistInformation: this.state.artistInformation,
                letterSelection: null,
                searchText: "",
                indexOfFirstPost: 0,
                indexOfLastPost: this.state.postsPerPage,
                currentPageNumber: 1
            })

        } else if (value === "All" && this.state.genreFilter !== null) {
            const filterAlphaLetter = this.state.artistInformation.filter(array => {
                const genreName = array.genre
                return (this.state.genreFilter === genreName);
            })
            this.setState({
                filteredArtistInformation: filterAlphaLetter,
                letterSelection: null,
                searchText: "",
                indexOfFirstPost: 0,
                indexOfLastPost: this.state.postsPerPage,
                currentPageNumber: 1
            })

        } else if (this.state.genreFilter !== null) {
            const filterAlphaLetter = this.state.artistInformation.filter(array => {
                const artistName = array.artist[0].toUpperCase()
                const genreName = array.genre
                return (value === artistName && this.state.genreFilter === genreName);
            })
    
            this.setState({
                filteredArtistInformation: filterAlphaLetter,
                letterSelection: value,
                searchText: "",
                indexOfFirstPost: 0,
                indexOfLastPost: this.state.postsPerPage,
                currentPageNumber: 1
            })

        } else {
            const filterAlphaLetter = this.state.artistInformation.filter(array => {
                const artistName = array.artist[0].toUpperCase()
                return (value === artistName);
            })
    
            this.setState({
                filteredArtistInformation: filterAlphaLetter,
                letterSelection: value,
                searchText: "",
                indexOfFirstPost: 0,
                indexOfLastPost: this.state.postsPerPage,
                currentPageNumber: 1
            })
        }
    }

    currentPageHandler = (number) => {
        const indexOfLastPostCurrentPage = number * this.state.postsPerPage;
        const indexOfFirstPostCurrentPage = indexOfLastPostCurrentPage - this.state.postsPerPage;

        this.setState({
            indexOfFirstPost: indexOfFirstPostCurrentPage,
            indexOfLastPost: indexOfLastPostCurrentPage,
            currentPageNumber: number
        })
        
    }

    artistsDisplayedHandler = (event) => {
        this.setState({
            indexOfFirstPost: 0,
            indexOfLastPost: event.target.value,
            postsPerPage: event.target.value,
            currentPageNumber: 1
        })

    }

    render () {

        return (
            
            <div className={classes.DetermineWidth}>
                {
                    this.state.loading ?
                    <div>
                        <br></br>
                        <div className={classes.Loader}></div> 
                    </div>
                    : 
                    <div>
                        <br></br>
                        <section className={classes.VinylDisplay}>
                        <input
                            placeholder="Search Vinyl Records by Artist"
                            className={classes.InputSearchBox}
                            type="text"
                            value={this.state.searchText}
                            onChange={this.searchArtistHandler}
                        />
                    </section>

                    <div className={classes.VinylDisplay}>
                        <span>
                            <select 
                                onChange={this.onChangeGenreHandler}
                                className={classes.Dropdown}
                                > 
                                <option value="All Genres">All Genres</option>
                                {
                                    this.state.artistGenreSelection ? 
                                    this.state.artistGenreSelection.map((genre, genreKey) => {
                                        return (
                                            <option key={genreKey} value={genre}>
                                                {genre}
                                            </option>
                                        )
                                    })
                                    :
                                    ""
                                }
                            </select>
                        </span>

                        <span>
                            <select 
                                onChange={this.onChangeSortHandler}
                                className={classes.Dropdown}
                                >
                                <option key="Most Albums" value="Most Albums">Most Albums</option>
                                <option key="Sort A-Z" value="Sort A-Z">Sort A-Z</option>
                                <option key="Sort Z-A" value="Sort Z-A">Sort Z-A</option>
                            </select>
                        </span>

                        <span>
                            <select 
                                onChange={this.onChangeAlphaLetterHandler}
                                className={classes.Dropdown}
                                >
                                <option key="All" value="All">All Letters</option>
                                {
                                    alphabet.map(item => {
                                        return <option key={item} value={item}>{item}</option>
                                    })
                                }
                            </select>
                        </span>

                        <span>
                            <select
                                onChange={this.artistsDisplayedHandler}
                                className={classes.Dropdown}
                                >
                                <option key="10" value="10">10 Displayed</option>
                                <option key="15" value="15">15 Displayed</option>
                                <option key="20" value="20">20 Displayed</option>
                                <option key="25" value="25">25 Displayed</option>
                                
                            </select>
                        </span>

                    </div>

                    <section className={classes.VinylDisplay}>
                        <Pagination 
                            postsPerPage={this.state.postsPerPage}
                            totalPosts={this.state.filteredArtistInformation.length}
                            currentPageHandler={this.currentPageHandler}
                            currentPageNumber={this.state.currentPageNumber}
                        />
                    </section>

                    <section className={classes.VinylDisplay}>
                        {
                            !this.state.loading ?
                            this.state.filteredArtistInformation
                                .slice(this.state.indexOfFirstPost, this.state.indexOfLastPost)
                                .map((item) => (
                                    <Link key={item.id} to={'/albums/' + item.id}>
                                        <ArtistCard 
                                            artist={item.artist}
                                            genre={item.genre}
                                            url={item.randomAlbumUrl}
                                            numberOfAlbums={item.numberOfAlbums}
                                        />
                                    </Link>
                                )
                            )
                            :
                            ""
                        }
                    </section>
                    
                    <section className={classes.VinylDisplay}>
                        <Pagination 
                            postsPerPage={this.state.postsPerPage}
                            totalPosts={this.state.filteredArtistInformation.length}
                            currentPageHandler={this.currentPageHandler}
                            currentPageNumber={this.state.currentPageNumber}
                        />
                    </section>
                        
                    </div>
                }
            </div>
        );
    }
    
}

export default VinylDisplay;