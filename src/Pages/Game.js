import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import './game.css';

class Game extends React.Component {
  state = {
    responseAPI: {},
    correctAnswer: '',
    answers: [],
    answered: false,
    btnNext: false,
    index: 0,
  };

  componentDidMount() {
    this.fetchAPI();
  }

  respostasAPI = () => {
    const number = 0.5;
    const { responseAPI, index } = this.state;
    console.log(responseAPI);
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

  handleClick = () => {
    this.setState({
      answered: true,
      btnNext: true,
    });
  };

  clickNext = () => {
    const { history } = this.props;
    const { index } = this.state;
    const lengthIndex = 4;
    if (index === lengthIndex) {
      history.push('/feedback');
    }
    this.setState((previousSate) => ({
      index: previousSate.index + 1,
    }));
    this.setState({
      answered: false,
      btnNext: false,
    }, () => {
      this.respostasAPI();
    });
  };

  render() {
    const { responseAPI, correctAnswer, answers, answered, index, btnNext } = this.state;
    return (
      <div>
        <Header />
        {
          responseAPI.length > 0
          && (
            <div>
              <h3 data-testid="question-category">{responseAPI[index].category}</h3>
              <p data-testid="question-text">{responseAPI[index].question}</p>
              {
                (answered)
                  ? (answers
                    .map((element, i) => (
                      <div key={ i } data-testid="answer-options">
                        <button
                          data-testid={ correctAnswer === element
                            ? 'correct-answer' : `wrong-answer-${i}` }
                          type="button"
                          className={ correctAnswer === element
                            ? 'verde' : 'redText' }
                        >
                          {element}
                        </button>
                      </div>
                    )))
                  : (answers
                    .map((element, i) => (
                      <div key={ i } data-testid="answer-options">
                        <button
                          data-testid={ correctAnswer === element
                            ? 'correct-answer' : `wrong-answer-${i}` }
                          type="button"
                          onClick={ this.handleClick }
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
