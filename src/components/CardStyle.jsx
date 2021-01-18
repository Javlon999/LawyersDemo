import React from 'react'
import { Paper, Card, makeStyles } from '@material-ui/core'
import SideBarBg from '../assets/img/sideBarBg.svg'
import corpLogo from '../assets/img/corp__logo.svg'
const useStyles = makeStyles(theme => ({
    cardDemo:{
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        borderRadius: '15px',
        padding: theme.spacing(2),
        margin:theme.spacing(2),
       
    },
}))

export default function CardStyle(props) {
    const { children } = props;
    const classes = useStyles();
  
    return (
        <Card  className={classes.cardDemo}>
   {children}
        </Card>
    )
}