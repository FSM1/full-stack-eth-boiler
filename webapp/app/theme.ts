import createMuiTheme from '@material-ui/core/styles/createMuiTheme';


const theme = (createMuiTheme)({
  palette: {
      primary: {
          main: '#005466',
      },
      secondary: {
          main: '#7ad4de'
      }
  },
  typography: {
    fontFamily: [
      'Advent Pro',
    ].join(','),
  },
  overrides: {
  MuiTypography: {
  },
  MuiButton: {
    root: {
      color: 'white',
      marginTop: '24px',
      marginLeft: '8px',
      marginBottom: '24px',
      border: '#005466 2px solid',
    },
    text: {
      paddingLeft: '16px',
      paddingRight: '16px',
      paddingTop: '8px',
      color: 'white',
    }
  }

}
});

export default theme;
