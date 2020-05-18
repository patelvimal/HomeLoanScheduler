import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import LoanForm from './LoanForm';
import LoanResult from './LoanReport';

const useStyles = makeStyles({
    formContainer: {
        margin: '10px auto'
    }
});

const App = () => {
    const [loanInfo, setLoanInfo] = useState(null);
    const formClasses = useStyles();

    const onFormSubmit = (loanDetails) => {
        setLoanInfo(loanDetails);
    }

    return (
        <Grid container spacing={4} item xs={12}>
            <Grid item xs={12} md={4} className={formClasses.formContainer}>
                <LoanForm onFormSubmit={onFormSubmit} />
            </Grid>
            {
                loanInfo ?
                    <Grid item xs={12} md={8} className={formClasses.formContainer}>
                        <LoanResult loanInfo={loanInfo} />
                    </Grid> : null
            }
        </Grid>
    )
}

export default App;
