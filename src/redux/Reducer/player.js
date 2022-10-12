import { ADD_EMAIL, ADD_SCORE, PLAY_AGAIN } from '../Action';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};
function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EMAIL:
    return {
      ...state,
      gravatarEmail: action.payload.email,
      name: action.payload.name,
    };
  case ADD_SCORE:
    return {
      ...state,
      score: state.score + action.score,
      assertions: state.assertions + action.contador,
    };
  case PLAY_AGAIN:
    return {
      ...state,
      score: 0,
      assertions: 0,
    };
  default:
    return state;
  }
}
export default player;
