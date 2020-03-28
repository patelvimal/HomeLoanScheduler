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
            rows: null,
            interestRate: null,
            emi: null,
            loanAmount: null
        }
    }

    onChange = (event) => {
        //console.log(event);
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    onSubmit = () => {
        this.props.onSubmit(this.state);
        // var result = calcHomeLoan(this.state.loanAmount, this.state.emi, this.state.interestRate);
        // this.setState({
        //     rows: result
        // })
    }

    render() {
        const { rows } = this.state;
        return (
            <React.Fragment>
                <Typography variant="h6" gutterBottom className="form-title">
                    Loan Details
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
							required
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
                            fullWidth
						/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={this.onSubmit}>Calculate</Button>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}
