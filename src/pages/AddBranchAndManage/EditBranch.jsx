import React,{useState} from 'react'
import { makeStyles, Paper } from '@material-ui/core';
import {userService} from '../../services/user.service'
import { useHistory } from "react-router-dom";
import { Form } from '../../components/useForm';
import CardStyle from "../../components/CardStyle";
import MainRoot from "../../components/MainRoot";
import { Grid, } from '@material-ui/core';

import Controls from "../../components/controls/Controls";
import { withRouter } from 'react-router-dom';

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

const EditBranch = (props) => {
    const classes = useStyles();
    const EditBranchId = props.match.params.id;
    const [EditMfo,setEditMfo]=useState('');
    
    const [EditName,setEditName]=useState('');
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

let history = useHistory();

const UpdateSubmit = e => {
    e.preventDefault()
        let data = {
            name: EditName,
            MFO: EditMfo,
            DebtsCountTotal: 0,
        }
        userService.updateBranch(EditBranchId,data)
            .then(res => {
                console.log(res)
                history.push('/home');
            },
                error => {
                    console.log(error)
                }
            )      
}
    return (
        <MainRoot>
     <CardStyle>
              <Form onSubmit={UpdateSubmit}>
              <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                <Controls.Input
                    label="MFO"
                    name="branchId"
                    value={EditMfo}
                    onChange={e => setEditMfo(e.target.value)}
                  
                />
                        </Grid>
                    <Grid item xs={6}>
                <Controls.Input
                    label="Филиал номи"
                    name="branchName"
                    value={EditName}
                    onChange={e=>setEditName(e.target.value)}
                />
                </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}> <Controls.Button
                            type="submit"
                            text="Жунатиш" /></Paper>
                    </Grid>

                </Grid>
            </div>   
    </Form>
    </CardStyle>
    </MainRoot>
    )
}


export default withRouter(EditBranch)
