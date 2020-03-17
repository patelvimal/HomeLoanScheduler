import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import LoanResult from './LoanResult';
import './LoanForm.scss';
import {calcHomeLoan} from './calculate-service';

export default class LoanForm extends Component {

    constructor(){
        super();
        this.state= {
            rows : [{name:'Demo',calories:'45',fat:54,protein:45}]  ,
            interestRate:null,
            emi:null,
            loanAmount:null 
        }
    }

    onChange=(event)=>{
        //console.log(event);
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    onSubmit=()=> {
        var result = calcHomeLoan(this.state.loanAmount,this.state.emi,this.state.interestRate);
        alert(JSON.stringify(result));
    }

    render() {
        const {rows} = this.state;
        console.log(JSON.stringify(this.state));
        return (
            <Container maxWidth="lg" className="calc-form">
				<Grid container spacing={3}>
					<Grid item xs={3}>
						<TextField
							required
							id="filled-required"
							label="Loan Amount"
							variant="outlined"
                            size="small"
                            name="loanAmount"
                            onChange={this.onChange}
						/>
					</Grid>
					<Grid item xs={3}>
						<TextField
							required
							id="filled-required"
							label="Interest Rate"
							variant="outlined"
                            size="small"
                            name="interestRate"
                            onChange={this.onChange}
						/>
					</Grid>
					<Grid item xs={3}>
						<TextField
							required
							id="filled-required"
							label="Loan Tenure"
							variant="outlined"
							size="small"
						/>
					</Grid>
					<Grid item xs={3}>
					<TextField
							required
							id="filled-required"
							label="EMI"
							variant="outlined"
                            size="small"
                            name="emi"
                            onChange={this.onChange}
						/>
					</Grid>
                    <Grid item xs={3}>
					<TextField
							required
							id="filled-required"
							label="PrePayment/Month"
							variant="outlined"
							size="small"
						/>
					</Grid>
					<Grid item xs={12}>
						<Button variant="contained" color="primary" onClick={this.onSubmit}>Calculate</Button>
					</Grid>
					<Grid item xs={12}>
						<LoanResult/>
					</Grid>
				</Grid>
			</Container>
        )
    }
}
