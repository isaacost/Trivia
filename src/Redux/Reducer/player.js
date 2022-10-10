import { ADD_EMAIL, ADD_SCORE } from '../Action';

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
      score: action.payload,
    };
  default:
    return state;
  }
}

export default player;
