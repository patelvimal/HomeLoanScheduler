import React,{Component} from 'react';
import LoanForm from './components/form/LoanForm';
import LoanReport from './components/report/LoanReport';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { StylesProvider } from '@material-ui/core/styles';
import {calcHomeLoan} from './shared/calculate-service';
import Grid from '@material-ui/core/Grid';
import './assets/App.scss';

export default class App extends Component {

	constructor() {
		super();
		this.state = {
			showResult:false
		};
	}

	onFormSubmit = (loanDetails) => {
		const {loanAmount,emi,interestRate,prePayment }= loanDetails;
        var result = calcHomeLoan(loanAmount,emi,interestRate,prePayment);
     
		this.setState({
			showResult: true,
			loanScheduleResult : result
		});
	}

	render() {
		return (
			<React.Fragment>
				<StylesProvider injectFirst>
				<AppBar position="static" color="primary" elevation={0} >
					<Toolbar>
						<Typography variant="h6" color="inherit" noWrap>
							Home Loan Calculator
						</Typography>
					</Toolbar>
				</AppBar>
				<Grid container spacing={0} className="grid-container">
                    <Grid item xs={12} md={4} className="form">
						<LoanForm onSubmit={this.onFormSubmit} />
					</Grid>
					<Grid item xs={12} md={8}>
						{this.state.showResult ? <LoanReport result={this.state.loanScheduleResult}/> : null}
					</Grid>
				</Grid>
				</StylesProvider>
			</React.Fragment >
		)
	}

}
