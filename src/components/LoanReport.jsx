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
    const total = getTotal(loanSummary);
    console.log(total);
	return (
        <Grid
            container
            spacing={4}
            xs={12}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            className="loanResult"
        >
            <Grid item xs={12} md={6}>
                <Card>
                    <CardHeader subheader="Summary" className="cardHeader">
                    </CardHeader>
                    <CardContent>
                        <div>
                            <Typography variant="h6" color="textPrimary" display="inline">
                                Total Amount:
                        </Typography>
                            <Typography variant="h6" color="textPrimary" display="inline">
                            {total.total}
                        </Typography>
                        </div>
                        <div>
                            <Typography variant="h6" color="textPrimary" display="inline">
                                Total Principal:
                        </Typography>
                            <Typography variant="h6" color="textPrimary" display="inline">
                                {total.principal}
                        </Typography>
                        </div>
                        <div>
                            <Typography variant="h6" color="textPrimary" display="inline">
                                Total Interest:
                        </Typography>
                            <Typography variant="h6" color="textPrimary" display="inline">
                                {total.interest}
                        </Typography>
                        </div>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
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