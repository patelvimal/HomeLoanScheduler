import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';


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
					<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>
			<Container maxWidth="lg">
				<TextField
					required
					id="filled-required"
					label="Loan Amount"
					variant="filled"
				/>
				<TextField
					required
					id="filled-required"
					label="Interest Rate"
					variant="filled"
				/>
				<TextField
					required
					id="filled-required"
					label="Loan Tenure"
					variant="filled"
				/>
				<Button variant="contained" color="primary">Calculate</Button>
			</Container>
		</React.Fragment>
	);
}

export default App;
