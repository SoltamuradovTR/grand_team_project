import React, { useState } from 'react';
import Header from './components/Header/Header';
import { Button, createTheme, MuiThemeProvider } from '@material-ui/core';
import Routes from './components/Routes';

const theme = {
  light: createTheme({
    palette: {
      primary: {
        main: '#00ff00',
        dark: '#000000'
      }
    }
  }),

  // dark: createTheme({
  //   palette: {
  //     primary: {
  //       main: '#ff829e',
  //       dark: '#ffffff'
  //     }
  //   }
  // })
}

function App(props) {
  const [currentTheme, setCurrentTheme] = useState('light')

  return (
    <MuiThemeProvider theme={theme[currentTheme]}>
      {/*<Button color="primary" variant="contained">button</Button>*/}
      <Header />
      <Routes/>
    </MuiThemeProvider>
  );
}

export default App;