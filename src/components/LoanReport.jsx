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
    const router = useRouter()
    //const { loanAmount,emi,interestRate,prePayment } = convertToLongNumber(router.query);
    //const loanDetail = calcHomeLoan(loanAmount, emi, interestRate, prePayment);
    //const loanSummary = generateSummary(loanDetail,"year");
    
    React.useEffect(() => {
        // window is accessible here.
        console.log(window.location.search);
      }, []);

    return (
        <Grid container spacing={0} className='loanResult'>
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