import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


class AddTrackSuccess extends Component {

    state = {
        clickedHome: false,
        passedFromAddTracks: this.props.location.state
    }

    onClickHome = () => {
        this.setState({clickedHome: true})
    }

    render() {

        if (this.state.clickedHome) {
            return <Redirect to={{ pathname: "/" }}/>
        }

        let inject = ""
        if (this.state.passedFromAddTracks) {
            inject = this.props.location.state.map((item, itemKeys) => {
                return (
                    <div key={itemKeys}>
                        {item.trackNumber} {item.trackTitle} {item.trackArtist}
                    </div>
                    );
            })
        }
        
        return (
            <div>
                {inject}
                Track were successfully added!
                <button onClick={this.onClickHome}>Home</button>
            </div>
        )
    }
}

export default AddTrackSuccess;