import React from 'react';
import classes from './SelectedAlbums.module.css';

const SelectedAlbums = (props) => {
    return (
        <div className={classes.SelectedAlbums}>    
            <img 
                src={props.url}
                alt="Uploaded Images"
                height="250"
                width="250"
                style={{borderRadius: "10px"}}
            />
            <p>{props.album} ({props.albumYear})</p>
        </div>
    );
}

export default SelectedAlbums;