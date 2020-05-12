import React, { useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {calcHomeLoan,generateSummary,groupBy} from '../shared/calculate-service';
import Grid from '@material-ui/core/Grid';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
    Line, LineChart, Legend, ResponsiveContainer, PieChart, Pie, Bar,
    BarChart, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ComposedChart,
    RadialBarChart, RadialBar, Treemap } from 'recharts';
import { useRouter } from 'next/router' ;

const LoanReport =(props)=>{
    const classes = useStyles();
    const router = useRouter()
    const { loanAmount,emi,interestRate,prePayment } = convertToLongNumber(router.query);
    const loanDetail = calcHomeLoan(loanAmount, emi, interestRate, prePayment);
    const loanSummary = generateSummary(loanDetail,"year");
    
    return (
        <Grid container spacing={0} className={classes.gridContainer}>
            <Grid item xs={12} md={6} className={classes.formContainer}>
                <TableContainer className={classes.summery}>
                    <Table stickyHeader  aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Year</StyledTableCell>
                                <StyledTableCell align="right">Principal</StyledTableCell>
                                <StyledTableCell align="right">Interest</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        {/* <TableBody>
                            {loanSummary && loanSummary.map(row => (
                                <StyledTableRow  key={row.year}>
                                    <StyledTableCell  component="th" scope="row">
                                    {row.year}
                                    </StyledTableCell >
                                    <StyledTableCell  align="right">{row.principal}</StyledTableCell >
                                    <StyledTableCell  align="right">{row.interest}</StyledTableCell >
                                </StyledTableRow >
                            ))}
                        </TableBody> */}
                    </Table>
                </TableContainer>
                {/* <TableContainer className={classes.detail}>
                    <Table stickyHeader  aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Month - Year</StyledTableCell>
                                <StyledTableCell align="right">Principal</StyledTableCell>
                                <StyledTableCell align="right">Interest</StyledTableCell>
                                <StyledTableCell align="right">Balance</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loanDetail && loanDetail.map(row => (
                                <StyledTableRow  key={row.monthYear}>
                                    <StyledTableCell  component="th" scope="row">
                                        {row.month} - {row.year}
                                    </StyledTableCell >
                                    <StyledTableCell  align="right">{row.principal.toFixed(2)}</StyledTableCell >
                                    <StyledTableCell  align="right">{row.interest.toFixed(2)}</StyledTableCell >
                                    <StyledTableCell  align="right">{row.balance.toFixed(2)}</StyledTableCell >
                                </StyledTableRow >
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer> */}
            </Grid>
            <Grid xs={12} md={6}>
                <div className={classes.chart}>
                    <ResponsiveContainer>
                        {/* <BarChart width={730} height={250} data={loanSummary}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="principal" fill="#8884d8" />
                            <Bar dataKey="interest" fill="#82ca9d" />
                        </BarChart> */}
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
        </Grid>
    )
}

export default LoanReport;

const convertToLongNumber = (obj)=> {
    obj.loanAmount = obj.loanAmount * 100000;
    obj.emi = obj.emi * 1000;
    obj.prePayment = obj.prePayment * 1000;
    return obj;
}