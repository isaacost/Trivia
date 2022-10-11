import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { playAgain } from '../Redux/Action';

class Ranking extends React.Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    this.setState({
      ranking: JSON.parse(localStorage.getItem('ranking')),
    });
  }

  handleClickGoHome = () => {
    const { history, dispatch } = this.props;
    dispatch(playAgain());
    history.push('/');
  };

  render() {
    const { ranking } = this.state;
    const rankingEmOrdem = ranking.sort((a, b) => b.score - a.score);
    return (
      <div>
        <h1
          data-testid="ranking-title"
        >
          Ranking
        </h1>
        {rankingEmOrdem.map((e, i) => (
          <div key={ i }>
            <img src={ e.picture } alt={ e.name } />
            <p data-testid={ `player-name-${i}` }>{e.name}</p>
            <p data-testid={ `player-score-${i}` }>{e.score}</p>
          </div>
        ))}
        <div>
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ this.handleClickGoHome }
          >
            Voltar para Login
          </button>
        </div>
      </div>
    );
  }
}
Ranking.propTypes = {
  history: PropTypes.shape({}),
  push: PropTypes.func,
}.isRequired;
export default connect()(Ranking);
