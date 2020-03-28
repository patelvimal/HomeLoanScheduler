import React, { Component } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import './LoanReport.scss';
export default class LoanResult extends Component {

    constructor(){
        super();
        this.state= {
            rows : this.props   
        }
    }
    render() {
        const {dataSource} = this.props;
        return (
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Dessert (100g serving)</TableCell>
                            <TableCell align="right">principal</TableCell>
                            <TableCell align="right">interest</TableCell>
                            <TableCell align="right">balance</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataSource && dataSource.map(row => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
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