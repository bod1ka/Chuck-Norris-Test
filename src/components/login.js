import {React, Fragment, Component}from 'react';
import ReactDOM from 'react-dom';
import { validatePassword } from '../util';

const modalRoot = document.querySelector('#modal-root');

export class LoginForm extends Component{

    constructor(props){
        super(props);

        this.state = {
            login: '',
            password: ''
        };

        this.el = document.createElement('div');

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
    }

    componentDidMount() {
        modalRoot.appendChild(this.el);

    }

    componentWillUnmount() {
        modalRoot.removeChild(this.el);
    }


    onChangeInput(event){

    }

    onSubmit(){
        validatePassword(this.state.password);
        this.props.onSubmit();
    }

    render() {
        return ReactDOM.createPortal(
            <Fragment>
                <div className='container'>
                    <div className="row justify-content-center">
                        <div className="col-6">
                            <form onSubmit={this.onSubmit}>
                                <label htmlFor="">Login</label>
                                <input className="form__input" type="text" onChange={this.onChangeInput}/>
                                <label htmlFor="">Password</label>
                                <input className="form__input" type="password" onChange={this.onChangeInput}/>

                                <button className="button" type="submit">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </Fragment>,
            this.el
        );
    }
}