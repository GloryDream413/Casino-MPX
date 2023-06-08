import React, { Component } from "react";
import soundfile from "../assets/Lose_sound_1.mp3";
import Sound from "react-sound";

export default class LoseSound extends Component {
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
