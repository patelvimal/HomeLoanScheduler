import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		//background: '#f7f7eb',
		background: '#606c88', /* Old browsers */
		background: '-moz-linear-gradient(top,  #606c88 0%, #3f4c6b 100%)',
		background: '-webkit-linear-gradient(top,  #606c88 0%,#3f4c6b 100%)',
		background: 'linear-gradient(to bottom,  #606c88 0%,#3f4c6b 100%)',
		filter: 'progid:DXImageTransform.Microsoft.gradient( startColorstr=#606c88, endColorstr=#3f4c6b,GradientType=0 )',
		color: 'rgba(0, 0, 0, 0.87)',
		boxShadow: '0px 1px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
		height: 80
	},
	logo: {
		margin: '10px auto 0px auto',
		textAlign: 'center'
	},

	headerIcon: {
		margin: '0 10px',
		float: 'left'
	},
	link: {
		marginLeft: '5px',
		textDeclaration:'initial',
		textDecoration:'initial',
		color: '#fff'
	}
});
const Header = () => {
	const classes = useStyles();
	return (
		<AppBar position="static" color="primary" elevation={0} className={classes.root}>
			<Toolbar>
				<div className={classes.logo}>
					<img src='./appIcon.png' className={classes.headerIcon}></img>
					<Typography variant="h6" color="inherit" noWrap>
						<Link href="/" >
							<a className={classes.link}>Home Loan Calculator</a>
						</Link>
					</Typography>
				</div>
			</Toolbar>
		</AppBar>
	)
}

export default Header;