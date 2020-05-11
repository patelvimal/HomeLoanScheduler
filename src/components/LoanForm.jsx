import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import Avatar from '@material-ui/core/Avatar';
import InputSlider from './InputSlider';

const LoanForm = (props) => {
    const INITIAL_STATE ={
        loanAmount:null,
        emi:null,
        interestRate:null,
        prePayment:null
    };
    const [loanInfo, setLoanInfo] = useState(INITIAL_STATE);
    const [formSubmitted,setFormStatus] = useState(false);
    
    
    const loanAmountMarker = generateMarker('L');
    const emiAmountMarker = generateMarker('K');
    const intRateMarker = generateMarker('%', 20, 2);

    const onReset = () => {
        setLoanInfo(INITIAL_STATE);
    }

    const onChange = (event)=> {
        const {name,value} = event.target;
        setLoanInfo(prevState=>({
            ...prevState,
            [name]: value
        }))
    }

    const onSubmit = (event) => {
        setFormStatus(true);
        if (isFormValid()){
            props.history.push({
                pathname:'./result',
                search: `?loanAmount=${loanInfo.loanAmount}&emi=${loanInfo.emi}&interestRate=${loanInfo.interestRate}&prePayment=${loanInfo.prePayment}`
            });
        }
        event.preventDefault();
        event.stopPropagation();
    }

    
    const isFormValid = () => {
        const { loanAmount,emi,interestRate } = loanInfo;
        return !!(loanAmount && emi && interestRate);
    }

    return (
        <Grid container spacing={0} className='loanDetailsForm'>
            <Grid item xs={12} md={6} className='formContainer'>
                <Container component="main">
                    <form  noValidate>
                        <InputSlider 
                            label="Loan Amount" 
                            min={0} 
                            max={100} 
                            step={1}
                            defaultValue={50}
                            marks={loanAmountMarker} 
                        />
                         <InputSlider 
                            label="Monthly EMI" 
                            min={0} 
                            max={100} 
                            step={1}
                            defaultValue={50}
                            marks={emiAmountMarker} 
                        />
                        <InputSlider 
                            label="Interest Rate" 
                            min={0} 
                            max={20} 
                            step={.1}
                            defaultValue={9}
                            marks={intRateMarker} 
                        />
                        <InputSlider 
                            label="Monthly Prepayment" 
                            min={0} 
                            max={100} 
                            step={1}
                            defaultValue={0}
                            marks={emiAmountMarker} 
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={onSubmit}
                            className='submit'>
                        Submit
                        </Button>
                        <Button
                            type="button"
                            variant="contained"
                            //color="primary"
                            className='submit'
                            onClick={onReset}>
                        Reset
                        </Button>
                    </form>
                </Container>
            </Grid>
        </Grid>
    )
}

export default LoanForm;

const generateMarker = (suffix, maxValue,stepSize)=>{
    var list = [];
    maxValue = maxValue || 100;
    stepSize = stepSize || 10;
    for (var i = 0; i <= maxValue; i += stepSize) {
        list.push({
                value: i,
                label: i !== 0 ? `${i}${suffix}` : 0
            })
    }
    return list;
}