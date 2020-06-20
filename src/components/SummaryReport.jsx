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
                [theme.breakpoints.down('sm')]: {
                    width: '44%',
                    paddingLeft: 0
                }
            },
            '&:last-child': {
                fontWeight: 'bold',
            }
        }
    },
    emiInfo : {
        background: '#ffeb3b8f',
        borderRadius: 10
    }
}));

const SummaryReport = (props) => {
    const { total, completionDate, principal, interest, emi } = props.data;
    const classes = useSummaryStyles();
    return (
        <React.Fragment>
            <div className={ `${classes.labelValue} ${classes.emiInfo}`}>
                <Typography variant="subtitle1" display="inline">
                    Monthly EMI:
                </Typography>
                <Typography variant="subtitle1" display="inline">
                    {emi.addThousandSeperator()}
                </Typography>
            </div>
            <div className={classes.labelValue}>
                <Typography variant="subtitle1" display="inline">
                    Total Interest:
                </Typography>
                <Typography variant="subtitle1" display="inline">
                    {interest.addThousandSeperator()}
                </Typography>
            </div>
            <div className={classes.labelValue}>
                <Typography variant="subtitle1" display="inline">
                    Total Amount:
                </Typography>
                <Typography variant="subtitle1" display="inline" >
                    {total.addThousandSeperator()}
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
            
        </React.Fragment>
    );
}

export default SummaryReport;