import React, { Component } from 'react';
import Loading from './Loading';
import { getUser } from '../services/userAPI';
import Header from '../components/Header';

class Search extends Component {
  state = {
    loading: true,
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

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-search">
        {loading && <Loading /> }
        <Header />
      </div>
    );
  }
}

export default Search;
