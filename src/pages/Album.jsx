import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      albums: [],
      infos: [],
      print: false,
      value: false,
      response: [],
    };
  }

  componentDidMount() {
    this.favSongsVerify();
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

  favSongsVerify = async () => {
    const response = await getFavoriteSongs();
    if (response !== []) {
      this.setState({
        value: true,
        response,
      });
    }
  };

  render() {
    const { albums, infos, print, value, response } = this.state;
    const musicCard = albums.filter((track) => track.trackId)
      .map((trackss) => (
        <MusicCard
          key={ trackss.trackId }
          trackName={ trackss.trackName }
          previewUrl={ trackss.previewUrl }
          trackId={ trackss.trackId }
          track={ trackss }
          arrResponse={ response }
        />
      ));
    return (
      <div data-testid="page-album">
        <Header />
        {value ? (
          <div>
            <img src={ infos.artworkUrl60 } alt={ infos.nameAlbum } />
            {print ? <p data-testid="album-name">{infos.collectionName}</p> : []}
            {print ? <p data-testid="artist-name">{infos.artistName}</p> : []}
            {print ? musicCard : <Loading />}
          </div>
        ) : <Loading />}
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
