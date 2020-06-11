import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Header from './components/Header';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { StylesProvider } from '@material-ui/core/styles';


const theme = createMuiTheme({
	typography: {
    // fontFamily: "Roboto-Regular"
	}
});

ReactDOM.render(
  <React.StrictMode>
    <StylesProvider injectFirst>
          <ThemeProvider theme={theme}>
            <Header/>
            <App />
          </ThemeProvider>
        </StylesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
