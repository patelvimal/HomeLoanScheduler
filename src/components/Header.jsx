import { IconButton } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import AppTitle from './AppTitle';

const useStyles = makeStyles((theme) => ({
	root: {
		background: '#606c88', /* Old browsers */
		background: '-moz-linear-gradient(top,  #606c88 0%, #3f4c6b 100%)',
		background: '-webkit-linear-gradient(top,  #606c88 0%,#3f4c6b 100%)',
		background: 'linear-gradient(to bottom,  #606c88 0%,#3f4c6b 100%)',
		filter: 'progid:DXImageTransform.Microsoft.gradient( startColorstr=#606c88, endColorstr=#3f4c6b,GradientType=0 )',
		color: 'rgba(0, 0, 0, 0.87)',
		boxShadow: '0px 1px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
		height: 65,
		[theme.breakpoints.down('sm')]: {
			height: 55,
		},
		'& > div': {
            minHeight: 55
        }
	},
	menuButton :{
		color:'#fff',
		position:'absolute'
	}
}));

const Header = () => {
	const classes = useStyles();
	const [showSidebar, setToggleSidebar] = useState(false);

	const hamburgerClick = () => {
		setToggleSidebar(true);
	}

	const toggleSidebar = (value) => {
		setToggleSidebar(value);
	}

	return (
		<AppBar position="static" color="primary" elevation={0} className={classes.root}>
			<Toolbar>
				<IconButton edge="start" className={classes.menuButton} onClick={hamburgerClick}>
					<MenuIcon />
				</IconButton>
				<Sidebar open={showSidebar} toggleDrawer={toggleSidebar}></Sidebar>
				<AppTitle/>
			</Toolbar>
		</AppBar>
	)
}

export default Header;