import React from 'react'
// import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
// import DateFnsUtils from "@date-io/date-fns";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));
export default function DatePicker(props) {
    const classes = useStyles();
    const { name, label, value, error, type, onChange, ...other } = props


    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <TextField
            label={label}
            format="dd/MM/yyyy"
            type={type}
            name={name}
            className={classes.textField}
            value={value}
            onChange={e => onChange(convertToDefEventPara(name, e.target.value))}
            {...other}
            {...(error && { error: true, helperText: error })}
            InputLabelProps={{
                shrink: true,
            }}
        />

    )
}