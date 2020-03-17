import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LoanForm from './LoanForm';
import './App.scss';

function App() {
	return (
		<React.Fragment>
			<AppBar position="static">
				<Toolbar>
					<IconButton edge="start" color="inherit" aria-label="menu">
						<MenuIcon />
					</IconButton>
					<Typography variant="h6">
						Home Loan Calculator
	    			</Typography>		
				</Toolbar>
			</AppBar>
			<LoanForm/>
		</React.Fragment>
	);
}

export default App;
