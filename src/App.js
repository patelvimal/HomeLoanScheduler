import React,{Component} from 'react';
import LoanForm from './components/form/LoanForm';
import LoanReport from './components/report/LoanReport';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {calcHomeLoan} from './shared/calculate-service';

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
				<AppBar position="static" color="primary" elevation={0} >
					<Toolbar>
						<Typography variant="h6" color="inherit" noWrap>
							Home Loan Calculator
						</Typography>
					</Toolbar>
				</AppBar>
				<div className="container">
					<LoanForm onSubmit={this.onFormSubmit} />
				</div>
				<div className="">
					{this.state.showResult ? <LoanReport result={this.state.loanScheduleResult}/> : null}
				</div>
			</React.Fragment >
		)
	}

}
