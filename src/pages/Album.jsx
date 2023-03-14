import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      albums: [],
      infos: [],
      print: false,
    };
  }

  componentDidMount() {
    this.grabAlbum();
  }

  grabAlbum = async () => {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    this.setState({
      albums: response,
      infos: response[0],
      print: true,
    });
  };

  render() {
    const { albums, infos, print } = this.state;
    const musicCard = albums.filter((track) => track.trackId)
      .map((trackss) => (
        <MusicCard
          key={ trackss.trackId }
          trackName={ trackss.trackName }
          previewUrl={ trackss.previewUrl }
        />
      ));
    return (
      <div data-testid="page-album">
        <Header />
        <img src={ infos.artworkUrl60 } alt={ infos.nameAlbum } />
        {print ? <p data-testid="album-name">{infos.collectionName}</p> : []}
        {print ? <p data-testid="artist-name">{infos.artistName}</p> : []}
        {print ? musicCard : <Loading />}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
