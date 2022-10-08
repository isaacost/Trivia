import { ADD_EMAIL } from '../Action';

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
  default:
    return state;
  }
}

export default player;
