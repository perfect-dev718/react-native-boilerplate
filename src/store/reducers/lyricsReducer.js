import {GET_LYRICS_ERR, GET_LYRICS_REQ, GET_LYRICS_SUC} from '../constants/lyricsContants';

const initialState = {
  data: {},
  loading: false,
  error: false,
};

export const lyricsReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case GET_LYRICS_REQ:
      return {
        ...prevState,
        loading: true,
      };
    case GET_LYRICS_SUC:
      return {
        ...prevState,
        data: {...action.data},
        loading: false
      };
    case GET_LYRICS_ERR:
      return {
        ...prevState,
        loading: false,
        error: action.err
      };
    default:
      return prevState;
  }
};
