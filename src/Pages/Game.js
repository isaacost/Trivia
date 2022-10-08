import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Game extends React.Component {
  state = {
    responseAPI: {},
    correctAnswer: '',
    answers: [],
  };

  componentDidMount() {
    this.fetchAPI();
  }

  respostasAPI = () => {
    const number = 0.7;
    const { responseAPI } = this.state;
    const correctAnswer = responseAPI[0].correct_answer;
    const incorrectAnswers = responseAPI[0].incorrect_answers;
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

  render() {
    const { responseAPI, correctAnswer, answers } = this.state;
    return (
      <div>
        <Header />
        {
          responseAPI.length > 0
          && (
            <div>
              <h3 data-testid="question-category">{responseAPI[0].category}</h3>
              <p data-testid="question-text">{responseAPI[0].question}</p>
              {
                answers
                  .map((element, i) => (
                    <div key={ i } data-testid="answer-options">
                      <button
                        data-testid={ correctAnswer === element
                          ? 'correct-answer' : `wrong-answer-${i}` }
                        type="button"
                      >
                        {element}
                      </button>
                    </div>
                  ))
              }
            </div>
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
