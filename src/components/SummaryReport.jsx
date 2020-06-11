import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';


const useSummaryStyles = makeStyles((theme) => ({
    labelValue: {
        '& > h6': {
            
            display: 'inline-block',
            padding: '4px 10px',
            margin: '2px 0px',
            color: '#545454',
            width: '40%',
            '&:first-child': {
                paddingLeft: 50,
                textAlign: 'right',
            },
            '&:last-child': {
                fontWeight: 'bold',
            }
        },
        [theme.breakpoints.down('sm')]: {
            '& > h6': {
                width: 'unset',
            },
            '&:last-child': {
                marginBottom:10
            }
        }
    },
}));

const SummaryReport = (props) => {
    const { total, completionDate, principal, interest } = props.data;
    const classes = useSummaryStyles();
    return (
        <React.Fragment>
            <div className={classes.labelValue}>
                <Typography variant="subtitle1" display="inline">
                    Total Amount:
                </Typography>
                <Typography variant="subtitle1" display="inline" >
                    {total}
                </Typography>
            </div>
            <div className={`${classes.labelValue} ${classes.completionDate}`}>
                <Typography variant="subtitle1" display="inline">
                    Completion Date:
                        </Typography>
                <Typography variant="subtitle1" display="inline">
                    {completionDate}
                </Typography>
            </div>
            <div className={classes.labelValue}>
                <Typography variant="subtitle1" display="inline">
                    Total Principal:
                </Typography>
                <Typography variant="subtitle1" display="inline">
                    {principal}
                </Typography>
            </div>
            <div className={classes.labelValue}>
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

export default SummaryReport;