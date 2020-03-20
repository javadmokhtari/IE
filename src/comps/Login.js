import React from 'react';
import './Login.css';
import './../fontawesome-free-5.12.0-web/css/all.css';

import {PointSpreadLoading} from 'react-loadingg';

import axios from 'axios';


class TheLogin extends React.Component {
    constructor(props) {


        super(props);

        
        this.state = {

            islogged: this.props.islogged,
            done: undefined,
            
            username: "",
            password: "",

            loginMessage: "",
        }

        this.loginFunc         = this.loginFunc.bind(this);
        this.logoutFunc        = this.logoutFunc.bind(this);
        this.handleEnter       = this.handleEnter.bind(this);

    }

    getLoginStatus() {
        return this.state.islogged;
    }

    handleEnter(e) {
        if (e.key === 'Enter') {
            this.loginFunc();
        }
    }

    componentDidMount() {
        
        setInterval(
            () => this.setState({done: true}),
            900,
        );
    }

    loginFunc() {
        if (this.state.username === '' || this.state.password === '') {
            this.setState({loginMessage: "یوزرنیم یا پسورد نمی تواند خالی باشد."});
        } else {
            axios
            .get("/api-login", {
                params: {
                    username: this.state.username,
                    password: this.state.password
                }
            })
            .then(res => {
                if (res.data.loginMessage === 'hello') {
                    this.setState({loginMessage: "خوش آمدید!", islogged: true})    
                    this.props.loginHandler();
                } else {
                    this.setState({loginMessage: "یوزرنیم یا پسورد اشتباه است."})
                    this.props.logoutHandler();
                }
                
            })
            .catch(err => console.log(err))
        }
    }

    logoutFunc() {
        axios
            .get("/api-logout", {
            })
            .then(res => this.setState({loginMessage: "", islogged: false}))
            .catch(err => console.log(err))

            this.props.logoutHandler();
    }
    render() {
        return(
            <div>
        {!this.state.done ? (
          <PointSpreadLoading />
        ) : (
          this.state.islogged ? 
          <div className="login-div">
                    <p>شما قبلا وارد سیستم شده اید. آیا می خواهید خارج شوید؟</p>
                    <button className="exit-btn" onClick={this.logoutFunc}>خروج از سیستم</button>
                </div>
            :
            (<div className="login-div2">
                    {/* <div className="login-turn"></div> */}
                    <img src={require("./lock.png")} alt="locked"></img>
                    <p>مشخصات خود را وارد کنید.</p>
                    <span className="fas fa-address-book"></span>
                    <input autoFocus onChange={(e) => this.setState({username: e.target.value})} onKeyPress={this.handleEnter} type="text" placeholder="نام کاربری"></input>
                    <br />

                    <span className="fas fa-keyboard"></span>
                    <input onChange={(e) => this.setState({password: e.target.value})} onKeyPress={this.handleEnter} type="password" placeholder="رمز عبور"></input>
                    <br />

                    <button className="login-btn" onClick={this.loginFunc} >ورود به سیستم</button>
                    <p style={{marginRight: "18px"}}>{ this.state.loginMessage }</p>
            </div>  )
        )}
      </div>
        );
    }
    
}

export default TheLogin;