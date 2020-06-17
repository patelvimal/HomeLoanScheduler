import React from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles, capitalize, Button, ListItemIcon, IconButton } from '@material-ui/core';
import TwitterIcon from '@material-ui/icons/Twitter';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import EmailIcon from '@material-ui/icons/Email';

const useStyles = makeStyles((theme) => ({
    paper: {
        width: '30%',
        [theme.breakpoints.down('sm')]: {
            width: '80%',
        },
    },
    title: {
        textTransform: 'capitalize'
    }
}));

const Sidebar = (props) => {
    const classes = useStyles();
    const appName = process.env.REACT_APP_NAME.replace(/-/g, ' ');
    return (
        <React.Fragment>
            <SwipeableDrawer
                anchor='left'
                open={props.open}
                classes={{
                    paper: classes.paper,
                }}
                onClose={() => { props.toggleDrawer(false) }}
                onOpen={() => { props.toggleDrawer(true) }}
            >
                <List>
                    <ListItem className={classes.title}>
                        <ListItemText primary={`App Name : ${appName}`} />
                    </ListItem>
                    <ListItem >
                        <ListItemText primary={`Version: ${process.env.REACT_APP_VERSION}`} />
                    </ListItem>
                </List>
                <Divider />
                {/* <List>
                    <ListItem className={classes.title} button>
                        <ListItemText primary="Report a Bug" />
                    </ListItem>
                </List> */}
                <Divider />
                <List>
                    <ListItem className={classes.title}>
                        <ListItemText primary="Developed By:- Vimal Patel" />
                    </ListItem>
                    <ListItem className={classes.title}>
                        <ListItemIcon>
                            <IconButton>
                                <TwitterIcon />
                            </IconButton>
                            <IconButton>
                                <FacebookIcon />
                            </IconButton>
                            <IconButton>
                                <GitHubIcon />
                            </IconButton>
                            <IconButton>
                                <EmailIcon />
                            </IconButton>
                        </ListItemIcon>
                    </ListItem>
                </List>
            </SwipeableDrawer>
        </React.Fragment>
    )
}

export default Sidebar