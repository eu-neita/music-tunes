import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  // constructor(props) {
  //   super(props);
  // }
  // state = {  }
  render() {
    const { trackName, previewUrl } = this.props;
    return (
      <div>
        <div>{ trackName }</div>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
};

export default MusicCard;
