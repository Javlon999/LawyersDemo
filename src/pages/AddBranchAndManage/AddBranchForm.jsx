import React, { useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import { userService } from '../../services/user.service'
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));
const initialFValues = {
    branchId: '',
    branchName: '',
    isPermanent: false,
}

export default function AddBranchForm(props) {
    let history = useHistory();
    const classes = useStyles();
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('branchId' in fieldValues)
            temp.branchId = fieldValues.branchId !== 0 ? "" : "Филиал ид номери киритилмади"
        if ('branchName' in fieldValues)
            temp.branchName = fieldValues.branchName.length !== 0 ? "" : "Филиал номи киритилмади"
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);
  
    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            let data = {
                name: values.branchName,
                MFO: parseInt(values.branchId),
                DebtsCountTotal: 0,
            }
            userService.createBranch(data)
                .then(res => {
                    console.log(res)
                    history.push('/home');
            
                },
                    error => {
                        console.log(error)
                    }
                )
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12}>
                
                    <Controls.Input
                        label="MFO"
                        name="branchId"
                        value={values.branchId}
                        onChange={handleInputChange}
                        error={errors.branchId}
                    />
                    <Controls.Input
                        label="Филиал номи"
                        name="branchName"
                        value={values.branchName}
                        onChange={handleInputChange}
                        error={errors.branchName}
                    />

              
                        <Controls.Button
                            type="submit"
                            text="Жунатиш" />
               
                </Grid>
            </Grid>
        </Form>
    )
}