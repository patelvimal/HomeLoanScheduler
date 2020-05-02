import React, { Component } from 'react';
import LoanForm from './components/form/LoanForm';
import LoanReport from './components/report/LoanReport';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { StylesProvider } from '@material-ui/core/styles';
import { calcHomeLoan } from './shared/calculate-service';
import Grid from '@material-ui/core/Grid';
import './assets/App.scss';
import appIcon from './assets/appIcon.png';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		background: '#3d4977'
	},
	headerIcon: {
		margin: '0 10px'
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

const App = () => {

	const onFormSubmit = (loanDetails) => {
		const { loanAmount, emi, interestRate, prePayment } = loanDetails;
		var result = calcHomeLoan(loanAmount, emi, interestRate, prePayment);

		this.setState({
			showResult: true,
			loanScheduleResult: result
		});
	}

	return (
		<React.Fragment>
			<StylesProvider injectFirst>
				<Header/>
				{/* <Grid container spacing={0} className="grid-container">
                    <Grid item xs={12} md={4} className="form">
						<LoanForm onSubmit={this.onFormSubmit} />
					</Grid>
					<Grid item xs={12} md={8}>
						{this.state.showResult ? <LoanReport result={this.state.loanScheduleResult}/> : null}
					</Grid>
				</Grid> */}
			</StylesProvider>
		</React.Fragment >
	)

}

export default App;