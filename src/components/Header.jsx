import { IconButton } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useState } from 'react';
import Sidebar from './Sidebar';

const useStyles = makeStyles((theme) => ({
	root: {
		//background: '#f7f7eb',
		background: '#606c88', /* Old browsers */
		background: '-moz-linear-gradient(top,  #606c88 0%, #3f4c6b 100%)',
		background: '-webkit-linear-gradient(top,  #606c88 0%,#3f4c6b 100%)',
		background: 'linear-gradient(to bottom,  #606c88 0%,#3f4c6b 100%)',
		filter: 'progid:DXImageTransform.Microsoft.gradient( startColorstr=#606c88, endColorstr=#3f4c6b,GradientType=0 )',
		color: 'rgba(0, 0, 0, 0.87)',
		boxShadow: '0px 1px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
		height: 80,
		[theme.breakpoints.down('sm')]: {
			height: 55,
		},
	},
	logo: {
		margin: '10px auto 0px auto',
		textAlign: 'center',
		[theme.breakpoints.down('sm')]: {
			margin: '0px auto 0px auto',
		},
	},

	headerIcon: {
		margin: '0 10px',
		float: 'left'
	},
	link: {
		marginLeft: '5px',
		textDeclaration: 'initial',
		textDecoration: 'initial',
		color: '#fff'
	}
}));

const Header = () => {
	const classes = useStyles();
	const [showSidebar, setToggleSidebar] = useState(true)

	const hamburgerClick = () => {
		setToggleSidebar(true);
	}

	const toggleSidebar = (value) => {
		setToggleSidebar(value);
	}

	return (
		<AppBar position="static" color="primary" elevation={0} className={classes.root}>
			<Toolbar>
				<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={hamburgerClick}>
					<MenuIcon />
				</IconButton>
				<Sidebar open={showSidebar} toggleDrawer={toggleSidebar}></Sidebar>
				<div className={classes.logo} id="appHeader">
					<img src='./appIcon.png' className={classes.headerIcon} alt="Home Loan Calculator"></img>
					<Typography variant="h6" color="inherit" noWrap>
						<a className={classes.link} href="/">Home Loan Calculator</a>
					</Typography>
				</div>
			</Toolbar>
		</AppBar>
	)
}

export default Header;