import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { addEmail } from '../redux/Action';
import '../Login.css';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    isBtnDisabled: true,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => this.verifyBtn());
  };

  fetchAPI = async () => {
    const endPoint = 'https://opentdb.com/api_token.php?command=request';
    const data = await fetch(endPoint);
    const response = await data.json();
    return response.token;
  };

  handleClick = async () => {
    const { history, dispatch } = this.props;
    const token = await this.fetchAPI();
    dispatch(addEmail(this.state));
    history.push('/game');
    localStorage.setItem('token', token);
  };

  clickManager = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  verifyBtn = () => {
    const { email, name } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const verifyEmail = regex.test(email);
    const numeroMinimo = 0;
    const verifyName = name.length > numeroMinimo;
    const btnState = verifyEmail && verifyName;
    this.setState({ isBtnDisabled: !(btnState) });
  };

  render() {
    const { name, email, isBtnDisabled } = this.state;
    return (
      <div className="div-tela-login">
        <div className="div-login">
          <form>

            <input
              placeholder=" Qual é o seu nome ?"
              className="input-name"
              type="text"
              data-testid="input-player-name"
              value={ name }
              name="name"
              id="name"
              onChange={ this.handleChange }
            />

            <input
              placeholder=" Qual é o seu e-mail do gravatar?"
              className="input-email"
              type="text"
              data-testid="input-gravatar-email"
              value={ email }
              name="email"
              id="email"
              onChange={ this.handleChange }
            />

            <button
              className="button-play"
              type="button"
              data-testid="btn-play"
              onClick={ this.handleClick }
              disabled={ isBtnDisabled }
            >
              Play
            </button>
            <button
              className="button-setting"
              type="button"
              data-testid="btn-settings"
              onClick={ this.clickManager }
            >
              Configurações

            </button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Login);
