import React, { Component } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
//import {calcHomeLoan} from '../../shared/calculate-service';

// import './LoanReport.scss';

export default class LoanResult extends Component {

    constructor(props){
        super(props);
        this.state= {
            result : null
        }
    }

    componentDidMount=()=>{
        
    }

    render() {
        const {result} = this.props;
        return (
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Month - Year</TableCell>
                            <TableCell align="right">principal</TableCell>
                            <TableCell align="right">interest</TableCell>
                            <TableCell align="right">balance</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {result && result.map(row => (
                            <TableRow key={row.monthYear}>
                                <TableCell component="th" scope="row">
                                    {row.monthYear}
                                </TableCell>
                                <TableCell align="right">{row.principal}</TableCell>
                                <TableCell align="right">{row.interest}</TableCell>
                                <TableCell align="right">{row.balance}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}