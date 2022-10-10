import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Header extends React.Component {
  state = {
    image: '',
  };

  componentDidMount() {
    this.handleEmail();
  }

  handleEmail = () => {
    const { email } = this.props;
    const emailG = `https://www.gravatar.com/avatar/${md5(email).toString()}`;
    this.setState({
      image: emailG,
    });
  };

  render() {
    const { name, score } = this.props;
    const { image } = this.state;
    return (
      <div>
        <img
          data-testid="header-profile-picture"
          src={ image }
          alt="imagem usuário"
        />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
export default connect(mapStateToProps)(Header);
