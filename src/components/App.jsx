import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useRef, useEffect } from 'react';
import LoanForm from './LoanForm';
import LoanResult from './LoanReport';
import { isMobileOnly } from 'react-device-detect';
import { calcHomeLoan, calculateEMI, getSummary, getTotal } from '../shared/calculate-service';
import { convertToLongNumber, getCompletionDate } from '../shared/utilities';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';

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

const useScrollStyles = makeStyles((theme) => ({
    root: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      'z-index':999
    },
  }));

const ScrollTop = (props) => {
    const { children, window } = props;
    const classes = useScrollStyles();
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
      disableHysteresis: true,
      threshold: 100,
    });
  
    const handleClick = (event) => {
      const anchor = (event.target.ownerDocument || document).querySelector('#appHeader');
  
      if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };
  
    return (
      <Zoom in={trigger}>
        <div onClick={handleClick} role="presentation" className={classes.root}>
          {children}
        </div>
      </Zoom>
    );
  }

  
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
    
    const calculateHomeLoan = (loanDetails)=> {
        var loanInfo = convertToLongNumber(loanDetails);
        if (loanDetails.calculateEMI) {
            loanInfo.emi = calculateEMI(loanInfo.loanAmount, loanInfo.interestRate, loanInfo.loanTenure * 12);
            console.log(loanInfo.emi);
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
                        <ScrollTop >
                            <Fab color="secondary" size="small" aria-label="scroll back to top">
                                <KeyboardArrowUpIcon />
                            </Fab>
                        </ScrollTop>
                        
                    </Grid>
                    
                    : null
            }
            
        </Grid>
    )
}

export default App;
