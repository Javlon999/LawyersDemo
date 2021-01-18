import React,{useState} from 'react'
import { makeStyles, Paper } from '@material-ui/core';
import {userService} from '../../services/user.service'
import { useHistory } from "react-router-dom";
import { Form } from '../../components/useForm';
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

const EditFileTypes = (props) => {
    const classes = useStyles();
    const EditFileType = props.match.params.id;
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
            name: EditName
        }
        userService.updateFileType(EditFileType,data)
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
        <div>
         <Form onSubmit={UpdateSubmit}>
              <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                <Controls.Input
                    label="Файл номи"
                    name="fileName"
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
               
        </div>
    )
}


export default withRouter(EditFileTypes)
