import React, { Component } from "react";
import soundfile from "../assets/Mystery_sound.mp3";
import Sound from "react-sound";

export default class BgSound extends Component {
  render() {
    return (
      <Sound
        url={soundfile}
        loop={true}
        playStatus={Sound.status.PLAYING}
        onLoading={this.handleSongLoading}
        onPlaying={this.handleSongPlaying}
        onFinishedPlaying={this.handleSongFinishedPlaying}
      />
    );
  }
}
