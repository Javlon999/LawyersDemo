import React, { useState,useEffect } from 'react'
import { useHistory } from "react-router-dom";

import { Grid, } from '@material-ui/core';
import { userService } from '../../services/user.service'

import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';


export default function ChangeComment({items}) {

    {console.log(items)}
    let history = useHistory();
  

    const [comment, setComment] = useState(items ? items.OngoingCreditStatus:'')
 
    const handleSubmit = e => {
        e.preventDefault()
      
            let data = {
                OngoingCreditStatus: comment,
            }
            
            userService.updateComment(items.id,data)
                .then(res => {
                    //console.log(res)
                    history.push('/home/registeredtable') 
                },
                    error => {
                        console.log(error)
                    }
                )
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12}>
                    <Controls.Input
                        label='Изох'
                        name="comment"
                        value={comment}
                        onChange={e =>setComment(e.target.value)}
                    />
                        <Controls.Button
                            type="submit"
                            text="Жунатиш" />
                </Grid>
            </Grid>
        </Form>
    )
}