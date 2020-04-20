import React from 'react';
import classes from './ArtistCard.module.css';

const artistCard = (props) => {

    let albumNumberAndGenre = ""
    if (props.numberOfAlbums === 1) {
        albumNumberAndGenre = <div>{props.numberOfAlbums} Album | {props.genre}</div>
    } else {
        albumNumberAndGenre = <div>{props.numberOfAlbums} Albums | {props.genre}</div>
    }

    return (
        <div className={classes.ArtistCard}>
            <div>
                {props.artist} 
            </div>
            {/* <hr></hr> */}
            <img
                src={props.url}
                alt="Uploaded Images"
                height="200"
                width="200"
                style={{borderRadius: "15px", padding: "10px"}}
            />
            {/* <hr></hr> */}
            <div style={{fontSize: "13px"}}>
                {albumNumberAndGenre}
            </div>
        </div>
        
    );
}

export default artistCard;