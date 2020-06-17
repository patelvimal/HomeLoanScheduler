import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const useStyles = makeStyles((theme) => ({
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
	},
}));

const AppTitle = () => {
    const classes = useStyles();
    return (
        <div className={classes.logo} id="appHeader">
            <img src='./appIcon.png' className={classes.headerIcon} alt="Home Loan Calculator"></img>
            <Typography variant="h6" color="inherit" noWrap>
                <a className={classes.link} href="/">Home Loan Calculator</a>
            </Typography>
        </div>
    )
}

export default AppTitle;
