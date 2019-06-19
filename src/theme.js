import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  typography: {
    htmlFontSize: 12,
    fontFamily: [
      'Comic Sans MS',
      'cursive',
      'san-serif',
    ].join(','),
    fontSize: 10,
  },
  spacing: 2,
});