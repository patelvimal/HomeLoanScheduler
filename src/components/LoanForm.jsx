import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles({
    submit: {
        margin:'25px 0'
    },
    form :{
        '& > div' : {
            margin: '5px 0px'
        }
    },
    gridContainer: {
		marginTop: 25
	},
	formContainer: {
		background: '#f7f7eb',
		margin: '25px auto',
		borderRadius: 4,
		border: 'solid 1px #e0e0e0',
		padding: 12,
		boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
	}
    // heading:{
    //     fontFamily: 'Roboto-Regular'
    // }
});


const LoanForm = (props) => {
    const INITIAL_STATE ={
        loanAmount:null,
        emi:null,
        interestRate:null,
        prePayment:null
    };
    const [loanInfo, setLoanInfo] = useState(INITIAL_STATE);
    const [formSubmitted,setFormStatus] = useState(false);
    const classes = useStyles();
    
    const onReset = () => {
        setLoanInfo(INITIAL_STATE);
    }

    const onChange = (event)=> {
        const {name,value} = event.target;
        setLoanInfo(prevState=>({
            ...prevState,
            [name]: value
        }))
    }

    const onSubmit = (event) => {
        setFormStatus(true);
        if (isFormValid()){
            props.history.push({
                pathname:'./result',
                search: `?loanAmount=${loanInfo.loanAmount}&emi=${loanInfo.emi}&interestRate=${loanInfo.interestRate}&prePayment=${loanInfo.prePayment}`
            });
        }
        event.preventDefault();
        event.stopPropagation();
    }

    
    const isFormValid = () => {
        const { loanAmount,emi,interestRate } = loanInfo;
        return !!(loanAmount && emi && interestRate);
    }

    return (
        <Grid container spacing={0} className={classes.gridContainer}>
            <Grid item xs={12} md={4} className={classes.formContainer}>
                <Container component="main" maxWidth="xs" className={classes.root}>
                    {/* <Avatar className={classes.avatar}>
            <AccountBalanceIcon />   
            </Avatar> */}
                    <Typography component="h1" variant="h5" className={classes.heading}>
                        Loan Information
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            required
                            fullWidth
                            error={formSubmitted && !loanInfo.loanAmount}
                            id="loanAmount"
                            label="Outstanding Loan Amount"
                            name="loanAmount"
                            onChange={onChange}
                            //variant={inputFieldStyle}
                            helperText={(formSubmitted && !loanInfo.loanAmount) ? "Amount is Required!" : null}
                        />
                        <TextField
                            required
                            fullWidth
                            error={formSubmitted && !loanInfo.emi}
                            id="filled-required"
                            label="EMI"
                            name="emi"
                            onChange={onChange}
                            //variant={inputFieldStyle}
                            helperText={(formSubmitted && !loanInfo.emi) ? "EMI is Required!" : null}
                        />
                        <TextField
                            required
                            fullWidth
                            error={formSubmitted && !loanInfo.interestRate}
                            id="filled-required"
                            label="Interest Rate"
                            name="interestRate"
                            onChange={onChange}
                            //variant={inputFieldStyle}
                            InputProps={{
                                endAdornment: <InputAdornment>%</InputAdornment>,
                            }}
                            helperText={(formSubmitted && !loanInfo.interestRate) ? "Interest Rate is Required!" : null}
                        />
                        <TextField
                            required
                            id="filled-required"
                            label="PrePayment/Month"
                            name="prePayment"
                            onChange={onChange}
                            // variant={inputFieldStyle}
                            fullWidth
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={onSubmit}
                            className={classes.submit}
                        >
                            Submit
                </Button>
                        {/* <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    //color="primary"
                    onClick={onReset}
                >
                Reset
                </Button> */}
                    </form>
                </Container>
            </Grid>
        </Grid>
    )
}

export default LoanForm;

// export default class LoanForm extends Component {
//     constructor() {
//         super();

//         this.state = {
//             interestRate: null,
//             emi: null,
//             loanAmount: null,
//             prePayment:null,
//             formSubmitted:false
//         };
//         this.initialState = this.state;
//     }

//     onChange = (event) => {
//         const re = /^[0-9\b]+$/;
//         if (event.target.value === '' || re.test(event.target.value)) {
//             console.log(re.test(event.target.value));
//             this.setState({
//                 [event.target.name]: event.target.value
//             })
//         }
//     }
//     onSubmit = () => {
//         this.setState({
//             formSubmitted: true
//         });
//         if (this.isFormValid()) {
//             this.props.onSubmit(this.state);
//         }
//     }

//     isFormValid =()=> {
//         const { loanAmount,emi,interestRate } = this.state;
//         return !!(loanAmount && emi && interestRate);
//     }

//     onReset = () => {
//         this.setState(this.initialState);
//     }

//     render() {
//         const { formSubmitted,loanAmount,emi,interestRate,prePayment } = this.state;

//         return (
//             <React.Fragment>
//                 <Typography variant="h6"  color="inherit" noWrap>
//                     Loan Information
//                 </Typography>
//                 <Grid container spacing={2}>
//                     <Grid item xs={12} >
//                         <TextField
//                             required
//                             error={formSubmitted && !loanAmount}
// 							id="filled-required"
// 							label="Outstanding Loan Amount"
//                             name="loanAmount"
//                             onChange={this.onChange}
//                             fullWidth
//                             variant="outlined"
//                             InputProps={{
//                                 // startAdornment: <InputAdornment>(In Lakh)</InputAdornment>,
//                             }}
//                             helperText={(formSubmitted && !loanAmount)? "Amount is Required!" : null}
// 						/>
//                     </Grid>
//                     <Grid item xs={12}>
//                         <TextField
//                             required
//                             error={formSubmitted && !emi}
// 							id="filled-required"
// 							label="EMI"
//                             variant="outlined"
//                             name="emi"
//                             onChange={this.onChange}
//                             fullWidth
//                             helperText={(formSubmitted && !emi)? "EMI is Required!" : null}
// 						/>
//                     </Grid>
//                     <Grid item xs={12}>
//                         <TextField
//                             required
//                             error={formSubmitted && !interestRate}
// 							id="filled-required"
// 							label="Interest Rate"
//                             variant="outlined"
//                             name="interestRate"
//                             onChange={this.onChange}
//                             fullWidth
//                             InputProps={{
//                                 endAdornment: <InputAdornment>%</InputAdornment>,
//                             }}
//                             helperText={(formSubmitted && !interestRate)? "Interest Rate is Required!" : null}
// 						/>
//                     </Grid>
//                     <Grid item xs={12}>
//                         <TextField
// 							required
// 							id="filled-required"
// 							label="PrePayment/Month"
//                             variant="outlined"
//                             name="prePayment"
//                             fullWidth
// 						/>
//                     </Grid>
//                     <Grid item xs={12} className="action-buttons">
//                         <Button  onClick={this.onReset}>Reset</Button>
//                         <Button variant="contained" color="primary" onClick={this.onSubmit}>Calculate</Button>
//                     </Grid>
//                 </Grid>
//             </React.Fragment>
//         )
//     }
// }
