import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import SummaryReport from './SummaryReport';
import { BarChartInfo, AreaChartInfo } from './ChartReport';
import DetailReport from './DetailReport';
import { Button } from '@material-ui/core';
import ComparisonTable from './Comparison';

const useCardStyles = makeStyles((theme) => ({
    root: {
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
    },
    label: {
        textAlign: 'center',
        padding: '4px 0',
        background: '#e6e6e6',
        fontWeight: 'bold',
        color: '#777474'
    },
    submitButton: {
        padding: '6px 50px',
        margin: '15px 0',
    },
    centerAlign: {
        textAlign:'center'
    },
    comparisonContent: {
        margin: 0,
        padding: 0
    },
    message: {
        background: '#fff9c4',
        borderRadius: 10,
        padding: 10
    },
    tableMessage: {
        padding:20,
        textAlign:'center',
        background: '#fff9c4'
    }
}));

const LoanReport = (props) => {
    const cardClasses = useCardStyles();
    const { total, loanSummary, totalWithoutPrepayment } = props.loanInfo;
    const comparisonMessage = 'A comparison for loan payment. Along with monthly EMI if you pay additional payment then it will show how long will it take to completely pay off the loan.';
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
                            {total && <SummaryReport data={total} />}
                        </Grid>
                        <Grid item xs={12} md={6} className={cardClasses.centerAlign}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                onClick={props.onCompareClick}
                                className={cardClasses.submitButton}>
                                Compare
                            </Button>
                            {
                                props.comparison ? null :
                                <Typography className={cardClasses.message}>
                                    {comparisonMessage}
                                </Typography>
                            }
                        </Grid>
                       
                    </Grid>
                </CardContent>
            </Card>
            {
                props.comparison ? 
                    <Card> 
                        <CardHeader subheader="Comparison For Additional Payment on Each Month" classes={{
                            root: cardClasses.header,
                            subheader: cardClasses.subHeader
                        }}>
                        </CardHeader>
                        <Typography className={cardClasses.tableMessage}>
                            {comparisonMessage}
                        </Typography>
                        <CardContent className={cardClasses.comparisonContent}>
                            <ComparisonTable loanInfo={props.comparison} />
                        </CardContent>
                    </Card> : null
            }
            
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
                <CardContent className={cardClasses.comparisonContent}>
                    <DetailReport loanInfo={loanSummary} />
                </CardContent>
            </Card>
        </>
    );
}

export default LoanReport;

