import React from 'react';
import './Track.css';
import '../TrackList/TrackList';

class Track extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      trackPlaying: false,
      audio: new Audio(this.props.track.previewURL),
      trackAvailable: true
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.playPreview = this.playPreview.bind(this);
  }
  
  renderAction() {
    if (this.props.isRemoval) {
      return <button className="Track-action"
                      onClick={this.removeTrack}>-</button>;
    } else {
      return <button className="Track-action"
                      onClick={this.addTrack}
                      >+</button>;
    }
  }

  addTrack() {
    this.props.onAdd(this.props.track);
  }

  removeTrack() {
    this.props.onRemove(this.props.track);
}

  playPreview() {
    if (!this.props.track.previewURL) {
      this.setState({ trackAvailable: false });
      return;
    }

    if (this.state.trackPlaying) {
      this.state.audio.pause();
      this.setState({ trackPlaying: false });
    } else {
        this.state.audio.play();
        this.setState({ trackPlaying: true });
        this.state.audio.addEventListener("ended", (event) => {
          this.setState({ trackPlaying: false});
        })
    }
  }
  
  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {!this.state.trackAvailable && <p className="Track-no-preview">Preview is not available for this track</p>}
        {!this.state.trackPlaying && <button className="Track-preview" onClick={this.playPreview}>&gt;</button>}
        {this.state.trackPlaying && <button className="Track-preview" onClick={this.playPreview}>||</button>}
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;