import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

import '../Game.css';
import './game.css';
import { addScore } from '../Redux/Action';

class Game extends React.Component {
  state = {
    responseAPI: {},
    correctAnswer: '',
    answers: [],
    answered: false,
    btnNext: false,
    index: 0,
    isDisabled: false,
    timer: 30,
    fimTimer: 0,
  };

  componentDidMount() {
    this.fetchAPI();
    this.cronometro();
  }

  respostasAPI = () => {
    const number = 0.5;
    const { responseAPI, index } = this.state;
    const correctAnswer = responseAPI[index].correct_answer;
    const incorrectAnswers = responseAPI[index].incorrect_answers;
    const answers = [correctAnswer, ...incorrectAnswers]
      .sort(() => number - Math.random());
    this.setState({ answers, correctAnswer });
  };

  fetchAPI = async () => {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const endPoint = `https://opentdb.com/api.php?amount=5&token=${token}`;
    const data = await fetch(endPoint);
    const response = await data.json();
    if (response.results.length === 0) {
      localStorage.removeItem('token');
      return history.push('/');
    }
    this.setState({ responseAPI: response.results }, () => {
      this.respostasAPI();
    });
  };

  handleClick = ({ target }) => {
    console.log(target.value);
    this.setState({
      answered: true,
      btnNext: true,
    });
    const { responseAPI, index, timer } = this.state;
    const { dispatch } = this.props;
    const questionDifficulty = responseAPI[index].difficulty;
    const rightAnswer = target.value;
    console.log(questionDifficulty);
    let score = 0;
    let contador = 0;
    const scoreNumber = 10;
    const scoreHard = 3;
    const scoreMedium = 2;
    const scoreEasy = 1;
    if (questionDifficulty === 'hard' && rightAnswer === 'correct') {
      score = scoreNumber + (timer * scoreHard);
      contador += 1;
      dispatch(addScore(score, contador));
      return score;
    } if (questionDifficulty === 'medium' && rightAnswer === 'correct') {
      score = scoreNumber + (timer * scoreMedium);
      contador += 1;
      dispatch(addScore(score, contador));
      return score;
    } if (questionDifficulty === 'easy' && rightAnswer === 'correct') {
      score = scoreNumber + (timer * scoreEasy);
      contador += 1;
      dispatch(addScore(score, contador));
      return score;
    }
  };

  clickNext = () => {
    const { history } = this.props;
    const { index } = this.state;
    const lengthIndex = 4;
    if (index === lengthIndex) {
      history.push('/feedback');
    }
    this.setState((previousSate) => ({ index: previousSate.index + 1 }), () => {
      this.cronometro();
    });
    this.setState({
      answered: false,
      btnNext: false,
    }, () => {
      this.respostasAPI();
    });
  };

  cronometro = () => {
    const { fimTimer } = this.state;
    if (fimTimer) {
      clearInterval(fimTimer);
    }
    this.setState({ timer: 30 }, () => {
      const second = 1000;
      const idInterval = setInterval(() => {
        this.setState((prev) => ({
          timer: prev.timer - 1,
          isDisabled: false,
        }), () => {
          const { timer } = this.state;
          if (timer === 0) {
            clearInterval(idInterval);
            this.setState({
              isDisabled: true,
            });
          }
        });
      }, second);
      this.setState({ fimTimer: idInterval });
    });
  };

  render() {
    const { responseAPI, timer,
      correctAnswer, answers, answered, index, btnNext, isDisabled } = this.state;
    return (
      <div className="game-div">
        <Header />
        <p className="cronometro">{ timer }</p>
        {
          responseAPI.length > 0
          && (
            <div>
              <h3
                className="categoria"
                data-testid="question-category"
              >
                {responseAPI[index].category}

              </h3>
              <p
                className="questoes"
                data-testid="question-text"
              >
                {responseAPI[index].question}

              </p>
              {
                (answered)
                  ? (answers
                    .map((element, i) => (
                      <div
                        key={ i }
                        data-testid="answer-options"
                        className="answer-options"
                      >
                        <button
                          data-testid={ correctAnswer === element
                            ? 'correct-answer' : `wrong-answer-${i}` }
                          type="button"
                          /*  disabled={ isDisabled } */
                          className={ correctAnswer === element
                            ? 'verde' : 'redText' }
                        >
                          {element}
                        </button>
                      </div>
                    )))
                  : (answers
                    .map((element, i) => (
                      <div
                        key={ i }
                        data-testid="answer-options"
                        className="answer-options"
                      >
                        <button
                          className="button-game"
                          data-testid={ correctAnswer === element
                            ? 'correct-answer' : `wrong-answer-${i}` }
                          type="button"
                          disabled={ isDisabled }
                          onClick={ this.handleClick }
                          value={ correctAnswer === element
                            ? 'correct' : `wrong-${i}` }
                        >
                          {element}
                        </button>
                      </div>
                    )))

              }
            </div>
          )
        }
        {
          (btnNext)
          && (
            <button
              className="button-proximo"
              type="button"
              data-testid="btn-next"
              onClick={ this.clickNext }
            >
              Next
            </button>
          )
        }

      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({}),
  push: PropTypes.func,
}.isRequired;

export default connect()(Game);
