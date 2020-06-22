import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import InputSlider from './InputSlider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles({
    submit: {
        margin: '25px 0'
    },
    form: {
        '& > div': {
            margin: '5px 0px'
        }
    },
    centerAlign: {
        textAlign:'center'
    },
    submitButton: {
        float: 'right',
        padding: '6px 50px',
        margin: '15px 0',
    }

});

const useCardStyles = makeStyles({
    root: {
        boxShadow:'none'
    },
    header: {
        padding: '8px 16px',
        textAlign: 'center',
        borderBottom: 'solid 1px rgb(185, 184, 184)',
        background: 'rgb(255,255,255)',
        background: '-moz-linear-gradient(top,  rgba(255,255,255,1) 0%, rgba(229,229,229,1) 100%)',
        background: '-webkit-linear-gradient(top,  rgba(255,255,255,1) 0%,rgba(229,229,229,1) 100%)',
        background: 'linear-gradient(to bottom,  rgba(255,255,255,1) 0%,rgba(229,229,229,1) 100%)',
        filter: 'progid:DXImageTransform.Microsoft.gradient( startColorstr=#ffffff, endColorstr=#e5e5e5,GradientType=0 )'
    },
    subHeader: {
        fontWeight: 'Bold'
    },
    content: {
        margin: '10px 0px'
    }
});

const LoanForm = (props) => {
    const LOAN_AMOUNT_DEFAULT_VALUE = 50;
    const MONTHLY_EMI_DEFAULT_VALUE = 50;
    const INTEREST_RATE_DEFAULT_VALUE = 9;
    const LOAN_TENURE_DEFAULT_VALUE = 20;
    const MONTHLY_PREPAYMENT_DEFAULT_VALUE = 0;


    const INITIAL_STATE = {
        loanAmount: LOAN_AMOUNT_DEFAULT_VALUE,
        emi: MONTHLY_EMI_DEFAULT_VALUE,
        interestRate: INTEREST_RATE_DEFAULT_VALUE,
        prePayment: MONTHLY_PREPAYMENT_DEFAULT_VALUE,
        loanTenure: LOAN_TENURE_DEFAULT_VALUE,
        calculateEMI:true
    };
    const [loanInfo, setLoanInfo] = useState(INITIAL_STATE);
    const loanAmountMarker = generateMarker('L');
    const emiAmountMarker = generateMarker('K');
    const intRateMarker = generateMarker('%', 20, 2);
    const loanTenureMarker = generateMarker('', 30, 2);

    const onChange = (name, newValue) => {
        setLoanInfo(prevState => ({
            ...prevState,
            [name]: newValue
        }))
    }

    const onSubmit = (event) => {
        if (props.onFormSubmit && typeof props.onFormSubmit === 'function') {
            props.onFormSubmit(loanInfo);
        }
        event.preventDefault();
        event.stopPropagation();
    }

    const handleEmiUnknownChange = (event,newValue)=>{
        onChange(event.target.name,newValue);
    }
    const cardClasses = useCardStyles();
    const formClasses = useStyles();
    
    return (
        <Card className={cardClasses.root}>
            <CardHeader subheader="Loan Details" classes={{
                root: cardClasses.header,
                subheader: cardClasses.subHeader
            }}>
            </CardHeader>
            <CardContent className={cardClasses.content}>
                <form noValidate>
                    <InputSlider
                        label="Outstanding Loan Amount"
                        min={0}
                        max={100}
                        step={1}
                        defaultValue={LOAN_AMOUNT_DEFAULT_VALUE}
                        onChange={onChange}
                        suffix="L"
                        name="loanAmount"
                        marks={loanAmountMarker}
                    />
                    {/* <FormControlLabel
                        control={
                        <Checkbox
                            checked={loanInfo.calculateEMI}
                            onChange={handleEmiUnknownChange}
                            name="calculateEMI"
                            color="primary"
                        />
                        }
                        label="Don't know EMI"
                    /> */}
                    <InputSlider
                        label="Monthly EMI"
                        min={0}
                        max={100}
                        step={1}
                        defaultValue={MONTHLY_EMI_DEFAULT_VALUE}
                        onChange={onChange}
                        suffix="K"
                        name="emi"
                        hide = {loanInfo.calculateEMI}
                        marks={emiAmountMarker}
                    />
                    <InputSlider
                        hide = {!loanInfo.calculateEMI}
                        label="Loan Tenure"
                        min={0}
                        max={30}
                        step={1}
                        defaultValue={LOAN_TENURE_DEFAULT_VALUE}
                        onChange={onChange}
                        name="loanTenure"
                        hideIcon={true}
                        suffix=""
                        marks={loanTenureMarker}
                    />
                    <InputSlider
                        label="Interest Rate"
                        min={0}
                        max={20}
                        step={.1}
                        defaultValue={INTEREST_RATE_DEFAULT_VALUE}
                        onChange={onChange}
                        name="interestRate"
                        type="Decimal"
                        suffix="%"
                        marks={intRateMarker}
                    />
                    <InputSlider
                        label="Additional Payment (monthly)"
                        min={0}
                        max={100}
                        step={1}
                        defaultValue={MONTHLY_PREPAYMENT_DEFAULT_VALUE}
                        onChange={onChange}
                        suffix="K"
                        name="prePayment"
                        marks={emiAmountMarker}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={onSubmit}
                        className={formClasses.submitButton}>
                        Calculate
                    </Button>
                </form>
            </CardContent>
        </Card>

    )
}

export default LoanForm;

const generateMarker = (suffix, maxValue, stepSize) => {
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