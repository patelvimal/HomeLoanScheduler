import React, { useState } from 'react';
import { StylesProvider } from '@material-ui/core/styles';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import LoanForm from './LoanForm';
import LoanResult from './LoanReport';
import Header from './Header';
import Link from 'next/link'


const App = () => {
	return (
		<LoanForm/>
	)
}

export default App;