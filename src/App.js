import React from 'react';
import {PointSpreadLoading} from 'react-loadingg';
import TheMessage from './comps/Message';
import TheLogin from './comps/Login';
import TheAddEmployee from './comps/AddEmployee';
import TheEditEmployee from './comps/EditEmployee';
import TheDeleteEmployee from './comps/DeleteEmployee';
import TheReportEmployee from './comps/ReportEmployee';
import TheSReportEmployee from './comps/SReportEmployee';
import TheApi from './comps/Api';

import './general.min.css';
import './fontawesome-free-5.12.0-web/css/all.css';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.login_handler  = this.login_handler.bind(this);
    this.logout_handler = this.logout_handler.bind(this);

    this.loginRef = React.createRef();



    this.state = {
      isLoggedIn: false,
      selectedButton: "login",
      done: true,
      appMessage: "مدیر گرامی، برای استفاده از این سیستم لازم است که وارد شوید.",
      messageColor: "orange",
    }
  }

  login_handler() {
    this.setState({isLoggedIn: true});
  }

  logout_handler() {
    this.setState({isLoggedIn: false});
  }

  login() {
    if (this.state.isLoggedIn) {
      this.setState({selectedButton: "login", appMessage: "مدیر گرامی، شما قبلا وارد سیستم شده اید.", messageColor: "#369436"});
    } else {
      this.setState({selectedButton: "login", appMessage: "مدیر گرامی، برای استفاده از این سیستم لازم است که وارد شوید.", messageColor: "orange"});
    }
  }



  addEmployee() {
    if (this.state.isLoggedIn) {
      this.setState({selectedButton: "add", appMessage: "مدیر گرامی، در این قسمت می توانید کارمند جدید در سیستم درج کنید.", messageColor: "#369436"});
    } else {
      this.setState({selectedButton: "add", appMessage: "مدیر گرامی، برای استفاده از این سیستم لازم است که وارد شوید.", messageColor: "orange"});  
    }
  }



  editEmployee() {
    if (this.state.isLoggedIn) {
      this.setState({selectedButton: "edit", appMessage: "مدیر گرامی، در این قسمت می توانید اطلاعات مربوط به کارمندان را ویرایش کنید.", messageColor: "#369436"});  
    } else {
      this.setState({selectedButton: "edit", appMessage: "مدیر گرامی، برای استفاده از این سیستم لازم است که وارد شوید.", messageColor: "orange"});
    }
    
  }



  deleteEmployee() {
    if (this.state.isLoggedIn) {
      this.setState({selectedButton: "delete", appMessage: "مدیر گرامی، در این قسمت می توانید یک کارمند را از سیستم حذف کنید.", messageColor: "#369436"});
    } else {
      this.setState({selectedButton: "delete", appMessage: "مدیر گرامی، برای استفاده از این سیستم لازم است که وارد شوید.", messageColor: "orange"});
    }
    
  }



  report() {
    if (this.state.isLoggedIn) {
      this.setState({selectedButton: "report", appMessage: "مدیر گرامی، در این قسمت می توانید گزارش های کلی را مشاهده نمایید.", messageColor: "#369436"});
    } else {
      this.setState({selectedButton: "report", appMessage: "مدیر گرامی، برای استفاده از این سیستم لازم است که وارد شوید.", messageColor: "orange"});
    }
    
  }



  statisticalReport() {
    if (this.state.isLoggedIn) {
      this.setState({selectedButton: "statistical-report", appMessage: "مدیر گرامی، در این قسمت می توانید گزارش های آماری را مشاهده نمایید.", messageColor: "#369436"});
    } else {
      this.setState({selectedButton: "statistical-report", appMessage: "مدیر گرامی، برای استفاده از این سیستم لازم است که وارد شوید.", messageColor: "orange"});
    }
    
  }



  API() {
    if (this.state.isLoggedIn) {
      this.setState({selectedButton: "api", appMessage: "مدیر گرامی، این قسمت مربوط به سرویس API است."});
    } else {
      this.setState({selectedButton: "api", appMessage: "مدیر گرامی، برای استفاده از این سیستم لازم است که وارد شوید.", messageColor: "orange"});
    }
    
  }



  renderContent() {

    switch (this.state.selectedButton) {
      case "login":
        return (
          <TheLogin islogged={this.state.isLoggedIn} loginHandler={this.login_handler} logoutHandler={this.logout_handler}/>
        );

      case "add":
        if (this.state.isLoggedIn === false) {
          return(
            <TheLogin islogged={this.state.isLoggedIn} loginHandler={this.login_handler} logoutHandler={this.logout_handler}/>
          );
          
        } else {
          return(
            <TheAddEmployee />
          );
        }
      
      case "edit":
        if (this.state.isLoggedIn === false) {
          return(
            <TheLogin islogged={this.state.isLoggedIn} loginHandler={this.login_handler} logoutHandler={this.logout_handler}/>
          );
          
        } else {
          return (
            <TheEditEmployee />
          );
        }
        

      case "delete":
        if (this.state.isLoggedIn === false) {
          return(
            <TheLogin islogged={this.state.isLoggedIn} loginHandler={this.login_handler} logoutHandler={this.logout_handler}/>
          );
          
        } else {
          return (
            <TheDeleteEmployee />
          );
        }
      case "report":
        if (this.state.isLoggedIn === false) {
          return(
            <TheLogin islogged={this.state.isLoggedIn} loginHandler={this.login_handler} logoutHandler={this.logout_handler}/>
          );
          
        } else {
          return (
            <TheReportEmployee />
          );
        }
      case "statistical-report":
        if (this.state.isLoggedIn === false) {
          return(
            <TheLogin islogged={this.state.isLoggedIn} loginHandler={this.login_handler} logoutHandler={this.logout_handler}/>
          );
          
        } else {
          return (
            <TheSReportEmployee />
          );
        }
      case "api":
        if (this.state.isLoggedIn === false) {
          return(
            <TheLogin islogged={this.state.isLoggedIn} loginHandler={this.login_handler} logoutHandler={this.logout_handler}/>
          );
          
        } else {
          return (
            <TheApi />
          );
        }
      default:
        return (
            <p>چنین صفحه ای پیدا نشد.</p>
        );
    }
  }
  render() {
    return (
      <div>
        <div id="sidebar" className="col-2">
          <ul className="side-items">
            <li className={this.state.selectedButton === "login" ? "active" : ""} id="login" onClick={() => this.login()}>
            <i className="fas fa-user"></i>
              <button>صفحه اصلی</button>
            </li>
            <li className={this.state.selectedButton === "add" ? "active" : ""} id="add"  onClick={() => this.addEmployee()}>
            <i className="fas fa-address-card"></i>
              <button>درج کارمند جدید</button>
            </li>
            <li className={this.state.selectedButton === "edit" ? "active" : ""} id="edit" onClick={() => this.editEmployee()}>
            <i className="fas fa-diagnoses"></i>
              <button>ویرایش اطلاعات کارمند</button>
            </li>
            <li className={this.state.selectedButton === "delete" ? "active" : ""} id="delete" onClick={() => this.deleteEmployee()}>
            <i className="fas fa-bug"></i>
              <button>حذف کارمند</button>
            </li>
            <li className={this.state.selectedButton === "report" ? "active" : ""} id="report" onClick={() => this.report()}>
            <i className="fas fa-highlighter"></i>
              <button>گزارش کارمندان</button>
            </li>
            <li className={this.state.selectedButton === "statistical-report" ? "active" : ""} id="statistical-report" onClick={() => this.statisticalReport()}>
            <i className="fas fa-calculator"></i>
              <button>گزارش های آماری</button>
            </li>
            <li className={this.state.selectedButton === "api" ? "active" : ""} id="api" onClick={() => this.API()}>
            <i className="fas fa-cloud"></i>
              <button>سرویس REST API</button>
            </li>
          </ul>
          <div id="f">
            <p className="footer">پروژه درس مهندسی نت</p>
            <p className="footer">جواد مختاری کوشیار</p>
            <p className="footer">بهمن ماه ۱۳۹۸</p>
          </div>
          
        </div>
        <div id="main" className="col-10">
        
        <TheMessage msg={this.state.appMessage} color={this.state.messageColor}/>
        
        {
          !this.state.done ? (
            <PointSpreadLoading />
          ): (
            <div id="content">
              { this.renderContent() }
            </div>
          )
        }
        </div>
      </div>
    );
  }
}

export default App;
