import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { playAgain } from '../redux/Action';
import '../Ranking.css';

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
      <div className="ranking-div">

        <span
          className="ranking-title-div"
          data-testid="ranking-title"
        />

        <div className="tags-ranking">
          {rankingEmOrdem.map((e, i) => (
            <div key={ i } className="ranking-pessoas">
              <img src={ e.picture } alt={ e.name } />
              <div>
                <p
                  className="nome-ranking"
                  data-testid={ `player-name-${i}` }
                >
                  {e.name}

                </p>
                <p
                  className="score-ranking"
                  data-testid={ `player-score-${i}` }
                >
                  {e.score}

                </p>
              </div>
            </div>
          ))}

          <button
            className="ranking-botao"
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
