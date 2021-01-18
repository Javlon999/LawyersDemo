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
    fileTypeName: '',
    isPermanent: false,
}

export default function FileTypeForm(props) {
    let history = useHistory();
    const classes = useStyles();
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
   
        if ('fileTypeName' in fieldValues)
            temp.fileTypeName = fieldValues.fileTypeName.length !== 0 ? "" : "Файл номи киритилмади"
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
                name: values.fileTypeName,
            }
            userService.createFileType(data)
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
                        label="Файл номи"
                        name="fileTypeName"
                        value={values.fileTypeName}
                        onChange={handleInputChange}
                        error={errors.fileTypeName}
                    />

                    <div>
                        <Controls.Button
                            type="submit"
                            text="Жунатиш" />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}