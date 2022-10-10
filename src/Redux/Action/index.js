export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_SCORE = 'ADD_SCORE';
export const PLAY_AGAIN = 'PLAY_AGAIN';

export const addEmail = (payload) => ({
  type: ADD_EMAIL,
  payload,
});

export const addScore = (score, contador) => ({
  type: ADD_SCORE,
  score,
  contador,
});

export const playAgain = () => ({
  type: PLAY_AGAIN,
});
