import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';


const useTableStyles = makeStyles({

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
        <TableContainer className='table'>
            <Table stickyHeader>
                <TableHead className={tableClasses.tableHeader}>
                    <TableRow>
                        <TableCell>Year</TableCell>
                        <TableCell>Principal</TableCell>
                        <TableCell>Interest</TableCell>
                        <TableCell>Pre-Payment</TableCell>
                        <TableCell>Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className={tableClasses.tableBody}>
                    {props.loanInfo && props.loanInfo.map(row => (
                        <TableRow key={row.year}>
                            <TableCell>{row.year}</TableCell>
                            <TableCell>{row.principal.addThousandSeperator()}</TableCell>
                            <TableCell>{row.interest.addThousandSeperator()}</TableCell>
                            <TableCell>{row.prepayment.addThousandSeperator()}</TableCell>
                            <TableCell>{row.totalAmount.addThousandSeperator()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default DetailReport;