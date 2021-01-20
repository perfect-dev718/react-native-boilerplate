import {GET_LYRICS_ERR, GET_LYRICS_REQ, GET_LYRICS_SUC, SET_LYRICS} from '../constants/lyricsContants';

export const getLyricsAction = () => {
  return (dispatch, getState) => {
    dispatch({type: GET_LYRICS_REQ});
    getLyricsService().then((res) => {
      dispatch({type: GET_LYRICS_SUC, data: res});
    }).catch(err => {
      dispatch({type: GET_LYRICS_ERR, err});
    })
  }
};

export const setLyricsAction = (data) => {
  return (dispatch, getState) => {
    dispatch({type: SET_LYRICS, data});
  }
};
