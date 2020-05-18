import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import React from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { calcHomeLoan, getSummary, getTotal } from '../shared/calculate-service';
import { getCompletionDate,convertToLongNumber } from '../shared/utilities';

import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';


const useCardStyles = makeStyles({
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
    }
});


const LoanReport =(props)=>{
	const { loanAmount,emi,interestRate,prePayment } = convertToLongNumber(props.loanInfo);
    const loanDetail = calcHomeLoan(loanAmount, emi, interestRate, prePayment);
    const loanSummary = getSummary(loanDetail,"year");
    var total = getTotal(loanSummary);
    total.completionDate = getCompletionDate(loanDetail);

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
                        <Summary data={total}/>
                    </CardContent>
                </Card>
        </>
            // <Grid item xs={12} md={8}>
            //     <Card>
            //         <CardHeader subheader="Principal/Interest Distribution Each Year" classes={{
            //             root: cardClasses.header,
            //             subheader: cardClasses.subHeader
            //         }}>
            //         </CardHeader>
            //         <CardContent className={cardClasses.content}>
            //             <BarChartInfo loanInfo={loanSummary}/>
            //             <AreaChartInfo loanInfo={loanSummary}/>
            //         </CardContent>
            //     </Card>
                
            // </Grid>
            // <Grid item xs={12} md={8}>
            //     <Card>
            //         <CardContent className={cardClasses.content}>
            //             <TableContainer className='table'>
            //                 <Table stickyHeader>
            //                     <TableHead className="table-header">
            //                         <TableRow>
            //                             <TableCell>Year</TableCell>
            //                             <TableCell>Principal</TableCell>
            //                             <TableCell>Interest</TableCell>
            //                             <TableCell>Pre-Payment</TableCell>
            //                             <TableCell>Total</TableCell>
            //                         </TableRow>
            //                     </TableHead>
            //                     <TableBody className="table-body">
            //                         {loanSummary && loanSummary.map(row => (
            //                             <TableRow key={row.year}>
            //                                 <TableCell>{row.year}</TableCell>
            //                                 <TableCell>{row.principal.addThousandSeperator()}</TableCell>
            //                                 <TableCell>{row.interest.addThousandSeperator()}</TableCell>
            //                                 <TableCell>{row.prepayment.addThousandSeperator()}</TableCell>
            //                                 <TableCell>{row.totalAmount.addThousandSeperator()}</TableCell>
            //                             </TableRow>
            //                         ))}
            //                     </TableBody>
            //                 </Table>
            //             </TableContainer>
            //         </CardContent>
            //     </Card>
    );
}

export default LoanReport;


const useSummaryStyles = makeStyles({
    labelValue:{
        '> h6': {
			width: 125,
			display: 'inline-block',
			padding: '4px 10px',
			margin: '2px 0px',
			fontWeight: 'bold',

			'&:first-child' : {
				paddingLeft: 50,
				color:'#727272',
				textAlign: 'right'
			},
			'&:last-child' : {
				fontWeight: 'bold'
			}
		},

		'&.completion-date': {
			'h6:last-child' : {
				backgroundColor: '#aee6f2',
				background: '#a1dbff',
				background: '-moz-linear-gradient(left, #a1dbff 0%, #cbebff 53%, #f0f9ff 100%)',
				background: '-webkit-linear-gradient(left, #a1dbff 0%, #cbebff 53%, #f0f9ff 100%)',
				background: 'linear-gradient(to right, #a1dbff 0%, #cbebff 53%, #f0f9ff 100%)',
				filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#a1dbff", endColorstr="#f0f9ff", GradientType=1)',
				borderRadius: 4
			}
		}
    },

});

const Summary = (props) => {
    const { total, completionDate, principal, interest } = props.data;
    const classes = useSummaryStyles();
    return (
        <React.Fragment>
            <div className={classes.labelValue}>
                <Typography variant="subtitle1"  display="inline">
                    Total Amount:
                </Typography>
                <Typography variant="subtitle1" display="inline" >
                    { total}
                </Typography>
            </div>
            <div className={classes.labelValue}>
                <Typography variant="subtitle1" display="inline">
                    Completion Date:
                        </Typography>
                <Typography variant="subtitle1" display="inline">
                    {completionDate}
                </Typography>
            </div>
            <div className={classes.labelValue}>
                <Typography variant="subtitle1" display="inline">
                    Total Principal:
                </Typography>
                <Typography variant="subtitle1" display="inline">
                    {principal}
                </Typography>
            </div>
            <div className={classes.labelValue}>
                <Typography variant="subtitle1" display="inline">
                    Total Interest:
                </Typography>
                <Typography variant="subtitle1" display="inline">
                    {interest}
                </Typography>
            </div>
        </React.Fragment>
    );
}

const BarChartInfo = (props) => {
    return (
        <div className = 'chart' >
            <ResponsiveContainer>
                <BarChart
                    width={500}
                    data={props.loanInfo}
                    margin={{
                        top: 15, right: 0, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="2 3" />
                    <XAxis dataKey="year" />
                    <YAxis hide={true}/>
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="principal" fill="#82ca9d" name="Principal" legendType="square" />
                    <Bar dataKey="interest" fill="#8884d8" name="Interest" legendType="circle" />
                </BarChart>
            </ResponsiveContainer>
        </div >
    )
}

const AreaChartInfo = (props)=> {
    return (
        <div className='chart'>
            <ResponsiveContainer>
                <LineChart
                    width={500}
                    data={props.loanInfo}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis dataKey="interest" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" legendType="square" dataKey="principal" stroke="#8884d8" name="Principal" strokeWidth={2} activeDot={{ r: 8 }} />
                    <Line type="monotone" legendType="circle" dataKey="interest" stroke="#82ca9d" name="Interest" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
