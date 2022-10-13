import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';
import '../Feedback.css';

import { playAgain } from '../redux/Action';

class Feedback extends React.Component {
  handleClick = () => {
    const { history, dispatch } = this.props;
    dispatch(playAgain());
    history.push('/');
  };

  handleClickRanking = () => {
    const { history, name, gravatar, score } = this.props;
    const rankingAnterior = JSON.parse(localStorage.getItem('ranking')) || [];
    console.log(rankingAnterior);
    const resultado = {
      name,
      score,
      picture: `https://www.gravatar.com/avatar/${md5(gravatar).toString()}`,
    };
    const rankingAtual = [...rankingAnterior, resultado];
    localStorage.setItem('ranking', JSON.stringify(rankingAtual));
    history.push('/ranking');
  };

  render() {
    const { contador, score } = this.props;
    const numeroAnalise = 3;
    return (
      <div className="feedback-div">
        <Header />
        <div className="frases-div">
          {(contador >= numeroAnalise)
            ? (<p data-testid="feedback-text">Well Done!</p>)
            : (<p data-testid="feedback-text">Could be better...</p>)}
        </div>
        <div className="score-div">
          <p className="frase-questoes-feedback">
            Número de acertos:
            <span
              className="total-questoes-feedback"
              data-testid="feedback-total-question"
            >
              { contador }
            </span>
          </p>
          <p className="frase-score-feedback">
            Pontuação:
            <span
              className="score-total-feedback"
              data-testid="feedback-total-score"
            >
              { score }
            </span>
          </p>
        </div>

        <button
          className="button-play-feedback"
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handleClick }
        >
          Play Again
        </button>
        <button
          className="button-ranking"
          type="button"
          data-testid="btn-ranking"
          onClick={ this.handleClickRanking }
        >
          Ranking
        </button>

      </div>
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
  name: state.player.name,
  gravatar: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Feedback);
