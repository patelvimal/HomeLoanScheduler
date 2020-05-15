import React, { useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {calcHomeLoan,getSummary,getTotal} from '../shared/calculate-service';
import Grid from '@material-ui/core/Grid';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
    Line, LineChart, Legend, ResponsiveContainer, PieChart, Pie, Bar,
    BarChart, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ComposedChart,
    RadialBarChart, RadialBar, Treemap } from 'recharts';
import { useRouter } from 'next/router' ;
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';

const LoanReport =(props)=>{
    const router = useRouter();
	const { loanAmount,emi,interestRate,prePayment } = parseQueryStringToObject(router.asPath);
    const loanDetail = calcHomeLoan(loanAmount, emi, interestRate, prePayment);
    const loanSummary = getSummary(loanDetail,"year");
    var total = getTotal(loanSummary);
    total.completionDate = getCompletionDate(loanDetail);

	return (
        <Grid item
            container
            spacing={4}
            xs={12}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            className="loanResult"
        >
            <Grid item xs={12} md={8}>
                <Card>
                    <CardHeader subheader="Summary" className="card-header">
                    </CardHeader>
                    <CardContent class="card-content">
                        <Summary data={total}></Summary>
                    </CardContent>
                </Card>
            </Grid>
           
            <Grid item xs={12} md={8}>
                <div className='chart'>
                    <ResponsiveContainer>
                        <BarChart
                            width={500}
                            height={300}
                            data={loanSummary}
                            margin={{
                                top: 15, right: 0, left: 20, bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="2 3" />
                            <XAxis dataKey="year" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="principal" fill="#82ca9d" name="Principal" legendType="square"/>
                            <Bar dataKey="interest" fill="#8884d8" name="Interest" legendType="circle"/>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Grid>
            <Grid item xs={12} md={8}>
                <div className='chart'>
                    <ResponsiveContainer>
                        <LineChart
                            width={500}
                            height={1000}
                            data={loanSummary}
                            margin={{
                                top: 5, right: 30, left: 20, bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis dataKey="principal"/>
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" legendType="square" dataKey="principal" stroke="#8884d8" name="Principal" strokeWidth={2} activeDot={{ r: 8 }} />
                            <Line type="monotone" legendType="circle" dataKey="interest" stroke="#82ca9d" name="Interest" strokeWidth={2}/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Grid>
            <Grid item xs={12} md={8}>
                <Card>
                    <TableContainer className=''>
                        <Table stickyHeader aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Year</TableCell>
                                    <TableCell>Principal</TableCell>
                                    <TableCell>Interest</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loanSummary && loanSummary.map(row => (
                                    <TableRow key={row.year}>
                                        <TableCell>{row.year}</TableCell>
                                        <TableCell>{row.principal}</TableCell>
                                        <TableCell>{row.interest}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>
            </Grid>
        </Grid>

    //   <Grid container spacing={0} className="loanResult">
	// 	  <h2>{JSON.stringify(loanSummary)}</h2>
    //   </Grid>
    );
}

export default LoanReport;


const parseQueryStringToObject = (queryString)=>{
    var obj = {};
    if (queryString) {
        var keys = queryString.substring(queryString.indexOf('?') +1,queryString.length).split('&');
        if (keys && keys.length > 0) {
            keys.map(a => {
                var keyVal = a.split('=');
                if (keyVal && keyVal.length > 0 && !isNaN(keyVal[1])) {
                    obj[keyVal[0]] = keyVal[1];
                }
            })
        }
	}
	return convertToLongNumber(obj);
}

const convertToLongNumber = (obj)=> {
    obj.loanAmount = obj.loanAmount * 100000;
    obj.emi = obj.emi * 1000;
	obj.prePayment = obj.prePayment * 1000;
	obj.interestRate = obj.interestRate * 1;
    return obj;
}

const getCompletionDate = (loanDetails) => {
    var result = null;
    if (loanDetails && loanDetails.length > 0) {
        const { month, year } = loanDetails[loanDetails.length - 1];
        result = `${month}, ${year}`;
    }
    return result;
}

const Summary = (props) => {
    const {total,completionDate,principal,interest} = props.data;
    return (
        <React.Fragment>
            <div class="label-value">
                <Typography variant="subtitle1"  display="inline">
                    Total Amount:
                </Typography>
                <Typography variant="subtitle1" display="inline" >
                    { total}
                </Typography>
            </div>
            <div class="label-value completion-date">
                <Typography variant="subtitle1" display="inline">
                    Completion Date:
                        </Typography>
                <Typography variant="subtitle1" display="inline">
                    {completionDate}
                </Typography>
            </div>
            <div class="label-value">
                <Typography variant="subtitle1" display="inline">
                    Total Principal:
                </Typography>
                <Typography variant="subtitle1" display="inline">
                    {principal}
                </Typography>
            </div>
            <div class="label-value">
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
