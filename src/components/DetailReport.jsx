import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';


const useTableStyles = makeStyles({
    root: {
        width:'100%'
    },

    tableHeader: {
        border: 'solid 2px black',
        '& th': {
            padding: '8px 16px',
            textAlign: 'center',
            background: '#cdeb8b',
            background: '-moz-linear-gradient(top,  #cdeb8b 0%, #cdeb8b 100%)',
            background: '-webkit-linear-gradient(top,  #cdeb8b 0%,#cdeb8b 100%)',
            background: 'linear-gradient(to bottom,  #cdeb8b 0%,#cdeb8b 100%)',
            filter: 'progid:DXImageTransform.Microsoft.gradient( startColorstr="#cdeb8b", endColorstr="#cdeb8b",GradientType=0 )',
            border: 'solid 1px #b4e645',
            color: 'rgba(0, 0, 0, 0.74)',
            fontWeight: 'bold'
        },

        '& > th': {
            padding: '10px 30px'
        }
    },

    tableBody: {
        '& td': {
            padding: '10px 30px',
            textAlign: 'center',
        },
        '& tr': {
            '&:nth-of-type(odd)': {
                background: '#f7fbf3'
            }
        }
    }
});


const DetailReport = (props) => {
    const tableClasses = useTableStyles();
    return (
        <TableContainer className={tableClasses.root}>
            <Table stickyHeader>
                <TableHead className={tableClasses.tableHeader}>
                    <TableRow>
                        <TableCell width="5%">Year</TableCell>
                        <TableCell width="5%">Principal</TableCell>
                        <TableCell width="5%">Interest</TableCell>
                        <TableCell width="5%">Pre-Payment</TableCell>
                        <TableCell width="5%">Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className={tableClasses.tableBody}>
                    {props.loanInfo && props.loanInfo.map(row => (
                        <TableRow key={row.year}>
                            <TableCell width="5%">{row.year}</TableCell>
                            <TableCell width="5%">{row.principal.addThousandSeperator()}</TableCell>
                            <TableCell width="5%">{row.interest.addThousandSeperator()}</TableCell>
                            <TableCell width="5%">{row.prepayment.addThousandSeperator()}</TableCell>
                            <TableCell width="2%">{row.totalAmount.addThousandSeperator()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default DetailReport;