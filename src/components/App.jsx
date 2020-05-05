import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { StylesProvider } from '@material-ui/core/styles';
import { calcHomeLoan } from '../shared/calculate-service';
import Grid from '@material-ui/core/Grid';
import '../assets/App.scss';
import appIcon from '../assets/appIcon.png';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter, Route, Redirect, Switch, useHistory } from "react-router-dom";
import LoanForm from './LoanForm';
import LoanResult from './LoanReport';
import Header from './Header';

const theme = createMuiTheme({
	typography: {
		fontFamily: "Roboto-Regular"
	}
});

const App = () => {
	return (
		<React.Fragment>
			<StylesProvider injectFirst>
				<ThemeProvider theme={theme}>
					<Header />
					<BrowserRouter>
						<Switch>
							<Route path="/result" render={() => { return <LoanResult /> }} />
							<Route path="/" component={LoanForm} />
						</Switch>
					</BrowserRouter>
				</ThemeProvider>
			</StylesProvider>
		</React.Fragment >
	)
}

export default App;