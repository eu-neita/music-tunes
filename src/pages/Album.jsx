// import { wait } from '@testing-library/user-event/dist/utils';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  state = {
    albums: [],
    infos: [],
  };

  componentDidMount() {
    this.grabAlbum();
  }

  grabAlbum = async () => {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    this.setState({
      albums: response,
      infos: response[0],
    });
  };

  render() {
    const { albums, infos } = this.state;
    const tracks = albums.filter((track) => track.wrapperType
    === 'track').map((track, i) => (
      <MusicCard
        key={ track.trackId }
        trackName={ track.trackName }
        previewUrl={ track.previewUrl }
      />
    ));
    return (
      <div data-testid="page-album">
        <Header />
        <img src={ `${infos.artworkUrl60}` } alt={ `${infos.nameAlbum}` } />
        <p data-testid="album-name">{infos.collectionName}</p>
        <p data-testid="artist-name">{infos.artistName}</p>
        {tracks}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
