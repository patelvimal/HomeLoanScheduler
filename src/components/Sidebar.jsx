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
import AppTitle from './AppTitle';
import FeedbackIcon from '@material-ui/icons/Feedback';
import ShareIcon from '@material-ui/icons/Share';
import BugReportIcon from '@material-ui/icons/BugReport';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const useStyles = makeStyles((theme) => ({
    root: {

    },
    paper: {
        width: '30%',
        [theme.breakpoints.down('sm')]: {
            width: '80%',
        },
    },
    title: {
        textTransform: 'capitalize'
    },
    listRoot: {
        padding: '5px 0'
    },
    appTitle: {
        background: '#406a8e',
        '& > div': {
            margin: '0px'
        }
    },
    appVersion: {
        // background:'#406a8e9e',
        '& > div': {
            margin: '2px 0px'
        }
    },
    itemIcon: {
        minWidth:40
    },
    itemText:{
        color:'#525151',
        '& > span': {
            fontWeight:'bold !important'
        }
        
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
                <List className={classes.listRoot}>
                    <ListItem className={classes.appTitle}>
                        <AppTitle />
                    </ListItem>
                    <ListItem className={classes.appVersion}>
                        <ListItemText primary={`Version: ${process.env.REACT_APP_VERSION}`} />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    {/* <ListItem button>
                        <ListItemIcon>
                            <FeedbackIcon />
                        </ListItemIcon>
                        <ListItemText primary="Feedback/Suggestions"/>
                    </ListItem> */}
                    {/* <ListItem button>
                        <ListItemIcon>
                            <BugReportIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Report A Bug"/>
                    </ListItem> */}
                    <ListItem button component="a" href="https://api.whatsapp.com/send?text=https://home-loan-calculator.netlify.app/">
                        <ListItemIcon className={classes.itemIcon}>
                            <ShareIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Share" className={classes.itemText}/>
                    </ListItem>
                    {/* <ListItem button>
                        <ListItemIcon>
                            <StarBorderIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Rate The App"/>
                    </ListItem> */}
                </List>
                <Divider />
                {/* <List>
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
                </List> */}
            </SwipeableDrawer>
        </React.Fragment>
    )
}

export default Sidebar
