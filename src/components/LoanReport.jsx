import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { calcHomeLoan, calculateEMI, getSummary, getTotal } from '../shared/calculate-service';
import { convertToLongNumber, getCompletionDate } from '../shared/utilities';
import SummaryReport from './SummaryReport';
import { BarChartInfo, AreaChartInfo } from './ChartReport';
import DetailReport from './DetailReport';

const useCardStyles = makeStyles((theme) =>({
    root : {
        [theme.breakpoints.down('sm')]: {
            margin: '0 auto',
            '& > .MuiGrid-item': {
                padding: 0,
            },
        },
    },
    header: {
        padding: '8px 16px',
        textAlign: 'center',
        background: '#cdeb8b',
        background: '-moz-linear-gradient(top,  #cdeb8b 0%, #cdeb8b 100%)',
        background: '-webkit-linear-gradient(top,  #cdeb8b 0%,#cdeb8b 100%)',
        background: 'linear-gradient(to bottom,  #cdeb8b 0%,#cdeb8b 100%)',
        filter: 'progid:DXImageTransform.Microsoft.gradient( startColorstr="#cdeb8b", endColorstr="#cdeb8b",GradientType=0 )',
        border: 'solid 1px #b4e645'
    },
    subHeader: {
        fontWeight: 'Bold'
    },
    content: {
        margin: '10px 0px'
    },
    label: {
        textAlign:'center',
        padding:'4px 0',
        background: '#e6e6e6',
        fontWeight: 'bold',
        color:'#777474'
    }
}));

const LoanReport = (props) => {
    var loanInfo = convertToLongNumber(props.loanInfo);
    if (props.loanInfo.calculateEMI) {
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
    
    var total = getTotal(loanSummary);
    if (total) {
        total.completionDate = getCompletionDate(loanDetail);
    }
    

    const cardClasses = useCardStyles();
    
    return (
        <>
            <Card>
                <CardHeader subheader="Summary" classes={{
                    root: cardClasses.header,
                    subheader: cardClasses.subHeader
                }}>
                </CardHeader>
                <CardContent className={cardClasses.content}>
                    <Grid container spacing={4} item xs={12} className={cardClasses.root}>
                        <Grid item xs={12} md={6} >
                            {totalWithoutPrepayment?<Typography className={cardClasses.label} >With Prepayment</Typography>: null }
                            {total && <SummaryReport data={total} /> }
                        </Grid>
                        {
                            totalWithoutPrepayment?
                                <Grid item xs={12} md={6} >
                                    <Typography className={cardClasses.label} >Without Prepayment</Typography>
                                    <SummaryReport data={totalWithoutPrepayment} />
                                </Grid>
                            : null
                        }
                    </Grid>
                </CardContent>
            </Card>
            <Card>
                <CardHeader subheader="Principal/Interest Distribution Each Year" classes={{
                    root: cardClasses.header,
                    subheader: cardClasses.subHeader
                }}>
                </CardHeader>
                <CardContent className={cardClasses.content}>
                    <BarChartInfo loanInfo={loanSummary} />
                    <AreaChartInfo loanInfo={loanSummary} />
                </CardContent>
            </Card>
            <Card>
                <CardContent className={cardClasses.content}>
                    <DetailReport loanInfo={loanSummary}/>
                </CardContent>
            </Card>
        </>
    );
}

export default LoanReport;

