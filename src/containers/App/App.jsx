import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { history } from '../../redux/helpers';
import { alertActions } from '../../redux/actions';
import { PrivateRoute } from '../PrivateRoute';
import { HomePage } from '../Home';
import { LoginPage } from '../Login';

function App() {
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, [dispatch]);


    return (
        <div>
            {alert.message &&
                <div className={`alert ${alert.type}`}>{alert.message}</div>
            }

            <Router history={history}>
                <Switch>
                    <PrivateRoute path="/home" component={HomePage} />
                    <Route path="/login" component={LoginPage} />
                    <Redirect from="*" to="/login" />
                </Switch>
            </Router>
        </div>

    );
}

export { App };
