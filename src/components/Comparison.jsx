import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import { isMobileOnly } from 'react-device-detect';


const useTableStyles = makeStyles((theme)=>({
    root: {
        width:'100%',
        display:'block'
    },

    tableHeader: {
        border: 'solid 2px black',
        '& th': {
            padding: '8px 16px',
            textAlign: 'center',
            borderBottom: 'solid 1px rgb(185, 184, 184)',
            background: 'rgb(255,255,255)',
            background: '-moz-linear-gradient(top,  rgba(255,255,255,1) 0%, rgba(229,229,229,1) 100%)',
            background: '-webkit-linear-gradient(top,  rgba(255,255,255,1) 0%,rgba(229,229,229,1) 100%)',
            background: 'linear-gradient(to bottom,  rgba(255,255,255,1) 0%,rgba(229,229,229,1) 100%)',
            filter: 'progid:DXImageTransform.Microsoft.gradient( startColorstr=#ffffff, endColorstr=#e5e5e5,GradientType=0 )',
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
            [theme.breakpoints.down('sm')]: {
                padding: 10
            },
        },
        '& tr': {
            '&:nth-of-type(odd)': {
                background: '#f7fbf3'
            }
        }
    }
}));


const ComparisonTable = (props) => {
    const tableClasses = useTableStyles();
    
    return (
        <TableContainer className={tableClasses.root}>
            <Table stickyHeader>
                <TableHead className={tableClasses.tableHeader}>
                    <TableRow>
                        <TableCell width="5%">Monthly PrePayment </TableCell>
                        <TableCell width="5%">Total Interest</TableCell>
                        <TableCell width="5%">Total Amount</TableCell>
                        <TableCell width="5%">Completion Date</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody className={tableClasses.tableBody}>
                    {props.loanInfo && props.loanInfo.map((row,index) => (
                        <TableRow key={index}>
                            <TableCell width="5%">{row.prePayment}</TableCell>
                            <TableCell width="5%">{row.totalInterest.addThousandSeperator()}</TableCell>
                            <TableCell width="5%">{row.totalAmount.addThousandSeperator()}</TableCell>
                            <TableCell width="2%">{row.completionDate}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ComparisonTable;