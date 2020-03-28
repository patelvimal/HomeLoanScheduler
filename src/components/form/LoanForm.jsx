import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import './LoanForm.scss';

export default class LoanForm extends Component {
    constructor() {
        super();
       
        this.state = {
            interestRate: null,
            emi: null,
            loanAmount: null,
            prePayment:null,
            formSubmitted:false
        };
        this.initialState = this.state;
    }

    onChange = (event) => {
        //console.log(event);
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    onSubmit = () => {
        this.setState({
            formSubmitted: true
        });
        if (this.isFormValid()) {
            this.props.onSubmit(this.state);
        }
    }

    isFormValid =()=> {
        const { loanAmount,emi,interestRate } = this.state;
        return !!(loanAmount && emi && interestRate);
    }

    onReset = () => {
        this.setState(this.initialState);
    }

    render() {
        const { formSubmitted,loanAmount,emi,interestRate,prePayment } = this.state;
        return (
            <React.Fragment>
                <Typography variant="h6" gutterBottom className="form-title">
                    Loan Details
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            error={formSubmitted && !loanAmount}
							id="filled-required"
							label="Loan Amount"
                            size="small"
                            name="loanAmount"
                            onChange={this.onChange}
                            fullWidth
						/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            error={formSubmitted && !emi}
							id="filled-required"
							label="EMI"
                            size="small"
                            name="emi"
                            onChange={this.onChange}
                            fullWidth
						/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            error={formSubmitted && !interestRate}
							id="filled-required"
							label="Interest Rate"
                            size="small"
                            name="interestRate"
                            onChange={this.onChange}
                            fullWidth
						/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
							required
							id="filled-required"
							label="PrePayment/Month"
                            size="small"
                            name="prePayment"
                            fullWidth
						/>
                    </Grid>
                    <Grid item xs={12} className="action-buttons">
                        <Button  onClick={this.onReset}>Reset</Button>
                        <Button variant="contained" color="primary" onClick={this.onSubmit}>Calculate</Button>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}
