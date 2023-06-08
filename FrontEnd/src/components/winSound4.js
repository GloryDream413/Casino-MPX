import React, { Component } from "react";
import soundfile from "../assets/Win_sound_4.mp3";
import Sound from "react-sound";

export default class WinSound4 extends Component {
  render() {
    return (
      <Sound
        url={soundfile}
        playStatus={Sound.status.PLAYING}
        onLoading={this.handleSongLoading}
        onPlaying={this.handleSongPlaying}
        onFinishedPlaying={this.handleSongFinishedPlaying}
      />
    );
  }
}
