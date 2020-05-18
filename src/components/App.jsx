import React, { useState } from 'react';
import { StylesProvider } from '@material-ui/core/styles';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import LoanForm from './LoanForm';
import LoanResult from './LoanReport';
import Header from './Header';
import InputSlider from './InputSlider';
import Grid from '@material-ui/core/Grid';
const App = () => {
	return (
        <Grid container spacing={4} xs={12} className='loanDetailsForm'>
            <Grid item xs={12} md={4} className={formClasses.formContainer}>
                <Card>
                    <CardHeader subheader="Loan Details" classes={{
                        root:cardClasses.header,
                        subheader:cardClasses.subHeader
                    }}>
                    </CardHeader>
                    <CardContent className={cardClasses.content}>
                        <form  noValidate>
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
                            <InputSlider 
                                label="Monthly EMI" 
                                min={0} 
                                max={100} 
                                step={1}
                                defaultValue={MONTHLY_EMI_DEFAULT_VALUE}
                                onChange={onChange}
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
                                onChange={onChange}
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
            </Grid>
            {
                showResult ?
                <Grid item xs={12} md={8} className={formClasses.formContainer}>
                    <LoanResult/>
                </Grid> : null
            }
        </Grid>
}

export default App;
