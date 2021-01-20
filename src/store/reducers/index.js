import {combineReducers} from 'redux';
import {lyricsReducer} from './lyricsReducer';

const rootReducer = combineReducers({
  lyricsData: lyricsReducer,
});

export default rootReducer;
