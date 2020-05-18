import React, { useState } from 'react';
import { StylesProvider } from '@material-ui/core/styles';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import LoanForm from './LoanForm';
import LoanResult from './LoanReport';
import Header from './Header';
import InputSlider from './InputSlider';

const App = () => {
	//return <MyForm/>
	return (
		<LoanForm/>
	)
}

export default App;


const MyForm = ()=> {
	return (
		<React.Fragment >
			<InputSlider label="Outstanding Loan Amount" />
		</React.Fragment>
	)
}