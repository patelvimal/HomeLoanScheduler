import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';

const Header = () => {
	return (
		<AppBar position="static" color="primary" elevation={0} className='header'>
			<Toolbar>
					<img src='./appIcon.png' className='headerIcon'></img>
					<Typography variant="h6" color="inherit" noWrap>
						<Link href="/" >
          					<a className='link'>Home Loan Calculator</a>
        				</Link>
					</Typography>
			</Toolbar>
		</AppBar>
	)
}

export default Header;