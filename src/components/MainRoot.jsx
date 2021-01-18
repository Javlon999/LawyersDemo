import React from 'react'
import { Paper, makeStyles } from '@material-ui/core'
import SideBarBg from '../assets/img/sideBarBg.svg'
import corpLogo from '../assets/img/corp__logo.svg'
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2),
        backgroundColor: '#F4F5F7',
       
  
    },
}))

export default function MainRoot(props) {
    const { children } = props;
    const classes = useStyles();
  
    return (
        <Paper  className={classes.root}>
      {children}
        </Paper>
    )
}