import React, { Component } from 'react';
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
      </header>
    );
  }
}

export default Header;
