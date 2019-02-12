import React from 'react';
import { LoginForm } from './login';


export {
    LoginForm,
    NotFound
};

function NotFound(){
    return (<div className="row justify-content-center">
            <h1>
                404, try find jokes in another place
            </h1>
    </div>)
}
