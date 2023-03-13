import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
// import PropTypes from 'prop-types';

class Login extends Component {
  state = {
    name: '',
    buttonDisable: true,
    buttonClick: false,
  };

  buttonVerify = () => {
    const MIN_CHAR = 3;
    const { name } = this.state;
    if (name.length >= MIN_CHAR) {
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
    // const { value } = this.name
    const input = type === 'checkbox' ? checked : value;
    this.setState({
      [name]: input,
    }, () => {
      this.buttonVerify();
    });
  };

  clickVerify = () => {
    const { buttonClick, name } = this.state;
    if (buttonClick === false) {
      createUser({ name });
      this.setState({
        buttonClick: true,
      });
    }
    // this.setState({
    //   buttonClick: true,
    // });
  };

  render() {
    const { name, buttonDisable, buttonClick } = this.state;
    return (
      <div data-testid="page-login">
        <form action="">
          <input
            type="text"
            name="name"
            id="name"
            data-testid="login-name-input"
            value={ name }
            onChange={ this.handleInputChange }
          />
          <input
            type="button"
            value="Entrar"
            disabled={ buttonDisable }
            data-testid="login-submit-button"
            onClick={ this.clickVerify }
          />
        </form>
        {buttonClick && <Redirect to="/search" />}
      </div>
    );
  }
}

// Login.propTypes = {
//   name: PropTypes.string.isRequired,
//   onInputChange: PropTypes.string.isRequired,
//   buttonDisable: PropTypes.bool,
// }.isRequired;

export default Login;
