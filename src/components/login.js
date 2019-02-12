import React, { Fragment, Component } from 'react';
import ReactDOM from 'react-dom';
import { validatePassword } from '../util';
import './login.css'

const modalRoot = document.querySelector('#modal-root');

export class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            login: '',
            password: '',
            errors: []
        };

        const el = document.createElement('div');
        el.classList.add('container-fluid');

        this.el = el;

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
    }

    componentDidMount() {
        modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        modalRoot.removeChild(this.el);
    }

    onChangeInput(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    onSubmit(event) {
        event.preventDefault();

        let {
            login,
            password
        } = this.state;

        login = login.trim();
        password = password.trim();

        if (!login || !password) {
            this.setState({
                errors: [
                    'Please enter password and login'
                ]
            });
            return;
        }

        const {isValid, errors} = validatePassword(password);

        if (!isValid) {
            this.setState({
                errors
            });
            return;
        }

        this.setState({
            errors: []
        });

        this.props.onSubmit({login, password});
    }

    render() {

        const {
            errors
        } = this.state;

        return ReactDOM.createPortal(
            <Fragment>
                <div className="row justify-content-center mt-5">
                    <div className="login-form-container">
                        <div className="row justify-content-center">
                            <form className="login-form" onSubmit={this.onSubmit}>
                                <h2>Please log in</h2>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form__input-group">
                                            <label htmlFor="">Login</label><br/>
                                            <input className="login-form__input "
                                                   name="login"
                                                   type="text"
                                                   required
                                                   onChange={this.onChangeInput}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form__input-group">
                                            <label htmlFor="">Password</label>
                                            <input className="login-form__input"
                                                   name="password"
                                                   type="password"
                                                   required
                                                   onChange={this.onChangeInput}/>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mt-3 justify-content-center">
                                    <button className="button" type="submit">Login</button>
                                </div>
                            </form>
                        </div>
                        {errors && <div className="row justify-content-center">
                            <div className="login-form__errors">
                                {
                                    errors.map((error, key) => {
                                        return <p key={key}>{error}</p>
                                    })
                                }
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </Fragment>,
            this.el
        );
    }
}