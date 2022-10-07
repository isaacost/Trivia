import React from 'react';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    isBtnDisabled: true,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => this.verifyBtn());
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
      <div>
        <form>
          <label htmlFor="name">
            Usuário:
            <input
              type="text"
              data-testid="input-player-name"
              value={ name }
              name="name"
              id="name"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="email">
            Email:
            <input
              type="text"
              data-testid="input-gravatar-email"
              value={ email }
              name="email"
              id="email"
              onChange={ this.handleChange }
            />
          </label>

          <button
            type="button"
            data-testid="btn-play"
            /* onClick={} */
            disabled={ isBtnDisabled }
          >
            Play
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
