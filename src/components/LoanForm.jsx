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
import { Router ,useRouter } from 'next/router';

const LoanForm = (props) => {
    const LOAN_AMOUNT_DEFAULT_VALUE = 50;
    const MONTHLY_EMI_DEFAULT_VALUE = 50;
    const INTEREST_RATE_DEFAULT_VALUE = 9;
    const MONTHLY_PREPAYMENT_DEFAULT_VALUE = 0;

    const router = useRouter();

    const INITIAL_STATE ={
        loanAmount: LOAN_AMOUNT_DEFAULT_VALUE,
        emi: MONTHLY_EMI_DEFAULT_VALUE,
        interestRate: INTEREST_RATE_DEFAULT_VALUE,
        prePayment:MONTHLY_PREPAYMENT_DEFAULT_VALUE
    };
    const [loanInfo, setLoanInfo] = useState(INITIAL_STATE);
    const [formSubmitted,setFormStatus] = useState(false);
    
    
    const loanAmountMarker = generateMarker('L');
    const emiAmountMarker = generateMarker('K');
    const intRateMarker = generateMarker('%', 20, 2);

    const onReset = () => {
        setLoanInfo(INITIAL_STATE);
    }

    const onChange = (name,newValue)=> {
        //const {name} = event.target;
        setLoanInfo(prevState=>({
            ...prevState,
            [name]: newValue
        }))
    }

    const onSubmit = (event) => {
        router.push({
            pathname:'/result',
            query: `loanAmount=${loanInfo.loanAmount}&emi=${loanInfo.emi}&interestRate=${loanInfo.interestRate}&prePayment=${loanInfo.prePayment}`
        });
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
                {JSON.stringify(loanInfo)}
                {console.log(loanInfo)}
                <Container component="main">
                    <form  noValidate>
                        <InputSlider 
                            label="Loan Amount" 
                            min={0} 
                            max={100} 
                            step={1}
                            defaultValue={LOAN_AMOUNT_DEFAULT_VALUE}
                            onChange={onChange}
                            suffix="L"
                            name="loanAmount"
                            marks={loanAmountMarker} 
                        />
                         <InputSlider 
                            label="Monthly EMI" 
                            min={0} 
                            max={100} 
                            step={1}
                            defaultValue={MONTHLY_EMI_DEFAULT_VALUE}
                            suffix="K"
                            name="emi"
                            marks={emiAmountMarker} 
                        />
                        <InputSlider 
                            label="Interest Rate" 
                            min={0} 
                            max={20} 
                            step={.1}
                            defaultValue={INTEREST_RATE_DEFAULT_VALUE}
                            name="interestRate"
                            suffix="%"
                            marks={intRateMarker} 
                        />
                        <InputSlider 
                            label="Monthly Prepayment" 
                            min={0} 
                            max={100} 
                            step={1}
                            defaultValue={MONTHLY_PREPAYMENT_DEFAULT_VALUE}
                            suffix="K"
                            name="prePayment"
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