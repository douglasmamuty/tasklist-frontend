import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Tasklist from './tasklist/Tasklist';
import Task from './task/Task';

function Routes(){
    return(
        <BrowserRouter>
            <Route path="/" exact component={Tasklist}/>
            <Route path="/task/:action/:id" component={Task}/>
        </BrowserRouter>
    );
}

export default Routes;