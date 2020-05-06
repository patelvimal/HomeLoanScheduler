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

const useStyles = makeStyles({
    gridContainer: {
		marginTop: 25
	},
	formContainer: {
//		background: '#f7f7eb',
//		margin: '25px auto',
		borderRadius: 4,
		border: 'solid 1px #e0e0e0',
		padding: 12,
		boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
    },
    detail: {
        maxHeight: '80vh',
    },
    summery: {
        maxHeight: '40vh',
        marginBottom:25
    },
});

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#2280a0',
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor:  theme.palette.action.hover,
        },
    },
}))(TableRow);

const LoanResult =(props)=>{
    const classes = useStyles();
    const { loanAmount,emi,interestRate,prePayment } = parseQueryStringToObject(window.location.search)
    const loanDetail = calcHomeLoan(loanAmount, emi, interestRate, prePayment);
    const loanSummary = generateSummary(loanDetail,"year");

    return (
        <Grid container spacing={0} className={classes.gridContainer}>
            <Grid item xs={12} md={6} className={classes.formContainer}>
                <TableContainer className={classes.summery}>
                    <Table stickyHeader  aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Month - Year</StyledTableCell>
                                <StyledTableCell align="right">principal</StyledTableCell>
                                <StyledTableCell align="right">interest</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loanSummary && loanSummary.map(row => (
                                <StyledTableRow  key={row.monthYear}>
                                    <StyledTableCell  component="th" scope="row">
                                    {row.year}
                                    </StyledTableCell >
                                    <StyledTableCell  align="right">{row.principal.toFixed(2)}</StyledTableCell >
                                    <StyledTableCell  align="right">{row.interest.toFixed(2)}</StyledTableCell >
                                </StyledTableRow >
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TableContainer className={classes.detail}>
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
                </TableContainer>
            </Grid>
        </Grid>
    )
}

export default LoanResult;


const parseQueryStringToObject = (queryString)=>{
    var obj = {};
    if (queryString) {
        var keys = queryString.replace('?', '').split('&');
        if (keys && keys.length > 0) {
            keys.map(a => {
                var keyVal = a.split('=');
                if (keyVal && keyVal.length > 0) {
                    obj[keyVal[0]] = keyVal[1];
                }
            })
        }
    }
    return obj;
}

// export default class LoanResult extends Component {

//     constructor(props){
//         super(props);
//         this.state= {
//             result : null
//         }
//     }

//     componentDidMount=()=>{
        
//     }

//     render() {
//         const {result} = this.props;
//         return (
//             <TableContainer component={Paper}>
//                 <Table size="small" aria-label="a dense table">
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Month - Year</TableCell>
//                             <TableCell align="right">principal</TableCell>
//                             <TableCell align="right">interest</TableCell>
//                             <TableCell align="right">balance</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {result && result.map(row => (
//                             <TableRow key={row.monthYear}>
//                                 <TableCell component="th" scope="row">
//                                     {row.monthYear}
//                                 </TableCell>
//                                 <TableCell align="right">{row.principal}</TableCell>
//                                 <TableCell align="right">{row.interest}</TableCell>
//                                 <TableCell align="right">{row.balance}</TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         )
//     }
// }