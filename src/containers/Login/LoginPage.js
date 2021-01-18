import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../../redux/actions';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Logo from '../../assets/img/mainLogo.svg';
import loginBg from '../../assets/img/loginBg.jpg';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import SideBarBg from '../../assets/img/SideBarLogin.svg'

import blue from '@material-ui/core/colors/blue';



function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            Все права защищены © «Туронбанк» АТБ {' '}
            {new Date().getFullYear()}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: `url(${loginBg})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(15, 10),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        
    },
    avatar: {
        margin: theme.spacing(1),
       
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function LoginPage() {
    const classes = useStyles();
    const theme = useTheme();
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { username, password } = inputs;
    const loggingIn = useSelector(state => state.authentication.loggingIn);
    const dispatch = useDispatch();
    const location = useLocation();

    // reset login status
    useEffect(() => {
        dispatch(userActions.logout());
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (username && password) {
            // get return url from location state or default to home page
            const { from } = location.state || { from: { pathname: "/home/registeredtable" } };
            dispatch(userActions.login(username, password, from));
        }
    }
    return (

        <ThemeProvider theme={theme}>

            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={false} sm={5} md={6} lg={8} className={classes.image} />
                <Grid item xs={12} sm={7} md={6} lg={4} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        
                        <img className={classes.avatar} src={Logo} alt="Logo" />
                        <Typography component="h1" variant="h5">
                           
        </Typography>
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Логин"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                value={username}
                                onChange={handleChange}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Пароль"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password} onChange={handleChange}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Войти
          </Button>

                        </form>
                        <Box mt={2}>
                            <Copyright />
                        </Box>
                    </div>
                </Grid>
            </Grid>
        </ThemeProvider>


    )
 
}

export { LoginPage };
