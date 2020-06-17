import React from 'react'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    paper : {
        width: '30%',
        [theme.breakpoints.down('sm')]: {
            width: '80%',
        },
    }
}));


const Sidebar = (props) => {
    const classes = useStyles();

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
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </SwipeableDrawer>
        </React.Fragment>
    )
}

export default Sidebar
