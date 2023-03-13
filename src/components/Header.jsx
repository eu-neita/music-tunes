import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends Component {
  state = {
    dataUser: {},
  };

  componentDidMount() {
    this.loadingVerify();
  }

  loadingVerify = async () => {
    const user = await getUser();
    if (user !== '') {
      this.setState({
        dataUser: user,
      });
    }
  };

  render() {
    const { dataUser } = this.state;
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">{ dataUser.name }</p>
        <Link data-testid="link-to-search" to="/search">Search</Link>
        <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
        <Link data-testid="link-to-profile" to="/profile">Profile</Link>
      </header>
    );
  }
}

export default Header;
