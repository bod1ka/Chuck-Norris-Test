import React from 'react';
import './App.css';
import logo from './images/logo.jpg'
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {authenticate, logout} from "./actions/auth";


class App extends React.Component{

  constructor(props){
    super(props);

    this.onLogout = this.onLogout.bind(this);
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
  }

  onLogout(){
    this.props.dispatch(logout());
  }

  onLoginSubmit(){
    this.props.dispatch(authenticate({}));
  }

  onChangeInput(){

  }

  render(){


    const {
      children,
      isAuthenticated
    } = this.props;

    if (!isAuthenticated){
      return <div className='container'>
        <div className="row justify-content-center">
          <div className="col-6">
            <form onSubmit={this.onLoginSubmit}>
              <label htmlFor="">Login</label>
              <input className="form__input" type="text" onChange={this.onChangeInput}/>
              <label htmlFor="">Password</label>
              <input className="form__input" type="password" onChange={this.onChangeInput}/>

              <button className="button" type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
    }

    return (
        <div className="container app-container">
          <button className="button button--icon-only logout-button" onClick={this.onLogout}>
            <i className="fa fa-sign-out-alt"></i>
          </button>
          <header className="app-header row justify-content-center">
            <img className="app-header__logo" src={logo} alt="Chuck Norris Jokes!"/>
          </header>
          <main className="app-main">
            {children}
          </main>
        </div>
    );
  }
}

function mapStateToProps(state){
  return {
    isAuthenticated:state.auth.isAuthenticated
  }
}

export default withRouter(connect(mapStateToProps)(App));