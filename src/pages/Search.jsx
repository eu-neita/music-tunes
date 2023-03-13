import React, { Component } from 'react';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

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
        {loading && <Loading />}
      </div>
    );
  }
}

export default Search;
