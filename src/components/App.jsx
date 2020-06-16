import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useRef, useEffect } from 'react';
import LoanForm from './LoanForm';
import LoanResult from './LoanReport';
import { isMobileOnly } from 'react-device-detect';
import { calcHomeLoan, calculateEMI, getSummary, getTotal } from '../shared/calculate-service';
import { convertToLongNumber, getCompletionDate } from '../shared/utilities';

const useStyles = makeStyles((theme) =>({
    root : {
        [theme.breakpoints.down('sm')]: {
            margin: 0,
            '& > .MuiGrid-item': {
                padding: 0,
            },
        },
    },
    formContainer: {
        margin: '10px auto'
    }
}));

const App = () => {
    const [loanInfo, setLoanInfo] = useState(null);
    const formClasses = useStyles();

    const resultView = useRef(null);

    const onFormSubmit = (loanDetails) => {
        
        calculateHomeLoan(loanDetails);
    }

    useEffect(() => {
        console.log(loanInfo);
        if (loanInfo && isMobileOnly) {
            resultView.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
        
      }, [loanInfo]);
    
    const calculateHomeLoan = (loanInfo)=> {
        var loanInfo = convertToLongNumber(loanInfo);
        if (loanInfo.calculateEMI) {
            loanInfo.emi = calculateEMI(loanInfo.loanAmount, loanInfo.interestRate, loanInfo.loanTenure * 12);
        }
    
        const { loanAmount, emi, interestRate, prePayment } = loanInfo;
        const loanDetail = calcHomeLoan(loanAmount, emi, interestRate, prePayment);
        const loanSummary = getSummary(loanDetail, "year");
        
        var loanSummaryWithoutPrepayment = null;
        var totalWithoutPrepayment = null;
        if(prePayment > 0) {
            const loanDetailWithoutPrepayment = calcHomeLoan(loanAmount, emi, interestRate, 0);
            loanSummaryWithoutPrepayment = getSummary(loanDetailWithoutPrepayment, "year");
            totalWithoutPrepayment = getTotal(loanSummaryWithoutPrepayment);
            totalWithoutPrepayment.completionDate = getCompletionDate(loanDetailWithoutPrepayment);
        }
    
        var total = getTotal([...loanSummary]);
        if (total) {
            total.completionDate = getCompletionDate(loanDetail);
        }

        setLoanInfo({
            total: total,
            loanSummary: loanSummary,
            totalWithoutPrepayment: totalWithoutPrepayment
        });
    }

    return (
        <Grid container spacing={4} item xs={12} className={formClasses.root}>
            <Grid item xs={12} md={4} className={formClasses.formContainer}>
                <LoanForm onFormSubmit={onFormSubmit} />
            </Grid>
            {
                loanInfo ?
                    <Grid item xs={12} md={8} className={formClasses.formContainer} >
                        {/* we cannot attached ref to functional component for that we need to forwardRefs
                        thats why added below div to attch ref*/}
                        <div ref={resultView}>
                            <LoanResult loanInfo ={loanInfo}/>
                        </div>
                    </Grid> : null
            }
            
        </Grid>
    )
}

export default App;
