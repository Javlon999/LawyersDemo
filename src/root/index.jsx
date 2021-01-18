
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/helpers';
import { App } from '../containers/App';

const Root = () => (
    <Provider store={store}>
        {/* <Router> */}
            <App/>
        {/* </Router> */}
    </Provider>
);
export default  Root;
//user
