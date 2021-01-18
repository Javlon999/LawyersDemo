
import React,{useState,useEffect} from 'react'
import { useHistory } from "react-router-dom";

import { makeStyles, Paper } from '@material-ui/core';
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { Form } from '../../components/useForm';
import { Validation } from './Validation';
import {userService} from '../../services/user.service';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        textAlign: 'center',
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));
export default function EditAllUserForm({item}) {

    console.log(item)

    let history = useHistory(); 
    const classes = useStyles();
    const { validate, handleInputChange, values, errors } = Validation({item});
    const [getBranch,setGetBranch]=useState([])
    const [roles,setRoles]=useState([])
    function GetBranches()
    {
        userService.getBranches()
        .then(res=>{
            console.log(res)
            setGetBranch(res.data.data)
        },error=>{
            console.log(error)
        }
          )
    }
    function GetMainRoles()
    {
        userService.getRoles()
        .then(res=>{
            console.log(res)
            setRoles(res.data.data)
        
        },
        error=>{
            console.log(error)
        })
    }
  
      useEffect(() => {
        GetBranches()
        GetMainRoles()
      }, [])

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            console.log(values.name)
           let data={
                lastname:  values.surname,
                firstname: values.name,
                middlename:values.middlename,
                username: values.login,
                password: values.passport,
                branchId: parseInt(values.branch),
                roleId: parseInt(values.role),
                isActive: 1
           }  
           userService.editUser(item.id,data)
           .then(
            res=>{
                console.log(res)
             console.log(res.data)
             history.push('/home');
           },
           error=>{
               console.log(error);
           })
        }
    }
    
    return (
        <div>
        <Form onSubmit={handleSubmit}>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                   
                            <Controls.Input
                                label="Исм"
                                name="name"
                                value={values.name}
                                onChange={handleInputChange}
                                error={errors.name}
                            />
                            <Controls.Input
                                label="Фамилия"
                                name="surname"
                                value={values.surname}
                                onChange={handleInputChange}
                                error={errors.surname}
                            />
                            <Controls.Input
                                label="Шариф"
                                name="middlename"
                                value={values.middlename}
                                onChange={handleInputChange}
                                error={errors.middlename}
                            />
                                <Controls.Select
                                label="Филиал"
                                name="branch"
                                value={values.branch}
                                onChange={handleInputChange}
                                options={getBranch}
                                error={errors.branch}
                            />
              
                    </Grid>
                    <Grid item xs={6}>
             
                        <Controls.Input
                                label="Логин"
                                name="login"
                                value={values.login}
                                onChange={handleInputChange}
                                error={errors.login}
                            />
                            <Controls.Input
                                label="Пароль"
                                name="passport"
                                value={values.passport}
                                onChange={handleInputChange}
                                error={errors.passport}
                            />
                            <Controls.Select
                                label="Роль"
                                name="role"
                                value={values.role}
                                onChange={handleInputChange}
                                options={roles}
                                error={errors.role}
                            />
                        
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}> <Controls.Button
                            type="submit"
                            text="Жунатиш" /></Paper>
                    </Grid>

                </Grid>
            </div>
        </Form >
      
        </div>
    )
}
