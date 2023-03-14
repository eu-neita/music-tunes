import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    loading: true,
    loadingArtist: false,
    artistName: '',
    buttonDisable: true,
    showAlbums: false,
    albums: [],
    artistNameSaved: '',
  };

  componentDidMount() {
    this.loadingVerify();
  }

  loadingVerify = async () => {
    const user = await getUser();
    if (user !== '') {
      this.setState({
        loading: false,
      });
    }
  };

  buttonVerify = () => {
    const MIN_CHAR = 2;
    const { artistName } = this.state;
    if (artistName.length >= MIN_CHAR) {
      return this.setState({
        buttonDisable: false,
      });
    }
    this.setState({
      buttonDisable: true,
    });
  };

  handleInputChange = ({ target }) => {
    const { name, type, checked, value } = target;
    const input = type === 'checkbox' ? checked : value;
    this.setState({
      [name]: input,
    }, () => {
      this.buttonVerify();
    });
  };

  albunsRes = async () => {
    const { artistName } = this.state;
    const albumResponse = await searchAlbumsAPI(artistName);
    if (albumResponse !== []) {
      this.setState({
        albums: albumResponse,
        showAlbums: true,
        artistName: '',
      });
    }
  };

  clickButton = () => {
    const { artistName } = this.state;
    this.setState({
      loadingArtist: true,
      showAlbums: false,
      artistNameSaved: artistName,
    });
    this.albunsRes();
  };

  render() {
    const { loading, artistName, buttonDisable, showAlbums, albums,
      loadingArtist, artistNameSaved } = this.state;
    const artist = albums.map((data, i) => (
      <div key={ i }>
        <Link
          to={ `/album/${data.collectionId}` }
          data-testid={ `link-to-album-${data.collectionId}` }
        >
          <img src={ data.artworkUrl100 } alt="" />
          <p>{data.collectionName}</p>
          <p>{data.artistName}</p>
        </Link>
      </div>
    ));
    return (
      <div data-testid="page-search">
        {loading && <Loading /> }
        <Header />
        <input
          type="text"
          name="artistName"
          id="artistName"
          data-testid="search-artist-input"
          value={ artistName }
          onChange={ this.handleInputChange }
        />
        <input
          type="button"
          value="Pesquisar"
          disabled={ buttonDisable }
          data-testid="search-artist-button"
          onClick={ this.clickButton }
        />
        {loadingArtist && (
          !showAlbums ? <Loading />
            : (
              <div>
                {albums.length === 0 ? <p>Nenhum álbum foi encontrado</p> : (
                  <div>
                    <p>{`Resultado de álbuns de: ${artistNameSaved}`}</p>
                    {artist}
                  </div>)}
              </div>))}
      </div>
    );
  }
}

export default Search;
