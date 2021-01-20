import {Platform} from 'react-native';

export const theme = {
  primary_color_1: "#7DD9FF",
  primary_color_2: "#00A1E5",
  secondary_color_1: "#d24449",
  secondary_color_2: "#e4aa34",
  secondary_color_3: "#e4602e",
  gray_tone_1: '#666666',
  gray_tone_2: '#999999',
  gray_tone_3: '#CCCCCC',
  black: '#000000',
  white: '#FFFFFF',
  common_header_color: '#F2F2F2',

  miniBarMargin: Platform.OS === 'android' ? 50 : 80,
  miniBarHeight: 60,
};
