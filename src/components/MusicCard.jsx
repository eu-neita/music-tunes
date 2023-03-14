import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends Component {
  state = {
    okValidate: false,
    value: false,
  };

  componentDidMount() {
    this.favSongs();
  }

  songAdd = async (target) => {
    const { value } = this.state;
    this.setState({
      okValidate: true,
      value: true,
    });
    const response = await addSong(target);
    if (response !== '') this.setState({ okValidate: false });
    if (value) this.setState({ value: false });
  };

  favSongs = async () => {
    const { trackId, arrResponse } = this.props;
    arrResponse.forEach((res) => {
      if (res.trackId === trackId) {
        this.setState({
          value: true,
        });
      }
    });
  };

  render() {
    const { trackName, previewUrl, trackId, track } = this.props;
    const { okValidate, value } = this.state;
    const bool = true;
    return (
      <div>
        {okValidate && bool
          ? <Loading /> : (
            <div>
              <p>{trackName}</p>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
                .
              </audio>
              <label
                data-testid={ `checkbox-music-${trackId}` }
                htmlFor={ `checkbox-music-${trackId}` }
              >
                Favorita
              </label>
              <input
                type="checkbox"
                name="checkbox-music"
                id={ `checkbox-music-${trackId}` }
                checked={ value }
                onChange={ () => this.songAdd(track) }
              />
            </div>)}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  track: PropTypes.shape().isRequired,
  arrResponse: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default MusicCard;
