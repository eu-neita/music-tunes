import React, { Component } from 'react';
import Loading from './Loading';
import { getUser } from '../services/userAPI';
import Header from '../components/Header';

class Search extends Component {
  state = {
    loading: true,
    artistName: '',
    buttonDisable: true,
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

  render() {
    const { loading, artistName, buttonDisable } = this.state;
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
          // onClick={ this.clickVerify }
        />
      </div>
    );
  }
}

export default Search;
