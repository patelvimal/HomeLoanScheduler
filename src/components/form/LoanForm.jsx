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
import './LoanForm.scss';
import { makeStyles } from '@material-ui/core/styles';


const LoanForm = () => {
    const [loanAmount,setLoanAmount] = useState(null);

    const useStyles = makeStyles({
        root: {
            background: '#f7f7eb',
            color: 'rgba(0, 0, 0, 0.87)',
            boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
        },
        headerIcon: {
            margin: '0 10px'
        },
        gridContainer: {
            marginTop: 25
        },
        formContainer: {
            margin: '0 auto'
        },
        formTitle: {
            margin: '15px 0'
        }

    });

    const onReset = () => {

    }

    const onSubmit = () => {

    }
    
    return (
        <React.Fragment>
            <Typography variant="h6" color="inherit" noWrap>
                Loan Information
                </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} >
                    <TextField
                        required
                        //error={formSubmitted && !loanAmount}
                        id="filled-required"
                        label="Outstanding Loan Amount"
                        name="loanAmount"
                       // onChange={this.onChange}
                        fullWidth
                        variant="outlined"
                        InputProps={{
                            // startAdornment: <InputAdornment>(In Lakh)</InputAdornment>,
                        }}
                        //helperText={(formSubmitted && !loanAmount) ? "Amount is Required!" : null}
                    />
                </Grid>
                {/* <Grid item xs={12}>
                    <TextField
                        required
                        error={formSubmitted && !emi}
                        id="filled-required"
                        label="EMI"
                        variant="outlined"
                        name="emi"
                        onChange={this.onChange}
                        fullWidth
                        helperText={(formSubmitted && !emi) ? "EMI is Required!" : null}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        error={formSubmitted && !interestRate}
                        id="filled-required"
                        label="Interest Rate"
                        variant="outlined"
                        name="interestRate"
                        onChange={this.onChange}
                        fullWidth
                        InputProps={{
                            endAdornment: <InputAdornment>%</InputAdornment>,
                        }}
                        helperText={(formSubmitted && !interestRate) ? "Interest Rate is Required!" : null}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="filled-required"
                        label="PrePayment/Month"
                        variant="outlined"
                        name="prePayment"
                        fullWidth
                    />
                </Grid> */}
                <Grid item xs={12} className="action-buttons">
                    <Button onClick={onReset}>Reset</Button>
                    <Button variant="contained" color="primary" onClick={onSubmit}>Calculate</Button>
                </Grid>
            </Grid>
        </React.Fragment>
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
