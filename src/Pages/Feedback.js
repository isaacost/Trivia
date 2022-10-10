import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

import { playAgain } from '../Redux/Action';

class Feedback extends React.Component {
  handleClick = () => {
    const { history, dispatch } = this.props;
    // const score = 0;
    dispatch(playAgain());
    history.push('/');
  };

  handleClickRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    return (
      <>
        <Header />
        <h1 data-testid="feedback-text">Feedback</h1>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handleClick }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.handleClickRanking }
        >
          Ranking
        </button>
      </>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({}),
  push: PropTypes.func,
}.isRequired;

export default connect()(Feedback);
