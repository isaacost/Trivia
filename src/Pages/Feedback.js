import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

import { playAgain } from '../Redux/Action';

class Feedback extends React.Component {
  handleClick = () => {
    const { history, dispatch } = this.props;
    dispatch(playAgain());
    history.push('/');
  };

  handleClickRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { contador, score } = this.props;
    const numeroAnalise = 3;
    return (
      <>
        <Header />
        <h1>Feedback</h1>
        {(contador >= numeroAnalise)
          ? (<p data-testid="feedback-text">Well Done!</p>)
          : (<p data-testid="feedback-text">Could be better...</p>)}
        <p>
          Número de acertos:
          <span data-testid="feedback-total-question">
            { contador }
          </span>
        </p>
        <p>
          Pontuação:
          <span data-testid="feedback-total-score">
            { score }
          </span>
        </p>
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

const mapStateToProps = (state) => ({
  contador: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
