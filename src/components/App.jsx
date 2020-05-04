import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
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

const useStyles = makeStyles({
	root: {
		background: '#f7f7eb',
		color: 'rgba(0, 0, 0, 0.87)',
		boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
	},
	headerIcon: {
		margin: '0 10px'
	},
	gridContainer: {
		marginTop: 25
	},
	formContainer: {
		background: '#f7f7eb',
		margin: '25px auto',
		borderRadius: 4,
		border: 'solid 1px #e0e0e0',
		padding: 12,
		boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
	},
	formTitle: {
		margin: '15px 0'
	}

});

const Header = () => {
	const classes = useStyles();
	return (
		<AppBar position="static" color="primary" elevation={0} className={classes.root}>
			<Toolbar>
				<img src={appIcon} className={classes.headerIcon}></img>
				<Typography variant="h6" color="inherit" noWrap>
					Home Loan Calculator
				</Typography>
			</Toolbar>
		</AppBar>
	)
}

const theme = createMuiTheme({
	typography: {
		fontFamily: "Roboto-Regular"
	}
});


const App = () => {
	const classes = useStyles();

	return (
		<React.Fragment>
			<StylesProvider injectFirst>
				<ThemeProvider theme={theme}>
					<Header />
					<Grid container spacing={0} className={classes.gridContainer}>
						<Grid item xs={12} md={4} className={classes.formContainer}>
							<BrowserRouter>
								<Switch>
									<Route exact path="/" component={LoanForm} />
									<Route path="/result" component={LoanResult} />
								</Switch>
							</BrowserRouter>
						</Grid>
					</Grid>
				</ThemeProvider>
			</StylesProvider>
		</React.Fragment >
	)

}

export default App;