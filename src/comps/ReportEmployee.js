import React from 'react';
import './ReportEmployee.css';
import './../fontawesome-free-5.12.0-web/css/all.css';

import {PointSpreadLoading} from 'react-loadingg';
import axios from 'axios';

class TheReportEmployee extends React.Component {
    constructor(props) {
        super(props);
        
        this.separate = this.separate.bind(this);

        this.state = {
            islogged: this.props.islogged,
            done: undefined,

            slastNameValue: '',
            sageValue: '',
            sisMarriedValue: '',
            sgenderValue: '',

            foundEmployees: [],

            employeesList: [
                {
                    "name": "a",
                    "last_name": "b",
                    "personal_id": "1231231231",
                    "national_id": "3453453451",
                    "tele": "09123334455",
                    "is_married": "false",
                    "gender": "male",
                    "address": "hh",
                    "age": "65",
                    "salary": "1233333"
                },
                {
                    "name": "c",
                    "last_name": "dsaa",
                    "personal_id": "2231231231",
                    "national_id": "4453453451",
                    "tele": "09123334455",
                    "is_married": "false",
                    "gender": "female",
                    "address": "hh",
                    "age": "33",
                    "salary": "1233333"
                },
                {
                    "name": "a",
                    "last_name": "b",
                    "personal_id": "3231231231",
                    "national_id": "7553453451",
                    "tele": "09123334155",
                    "is_married": "true",
                    "gender": "male",
                    "address": "hh",
                    "age": "33",
                    "salary": "1233333"
                },
                {
                    "name": "axx",
                    "last_name": "bqqq",
                    "personal_id": "9231231231",
                    "national_id": "9453453451",
                    "tele": "09123337455",
                    "is_married": "false",
                    "gender": "male",
                    "address": "hh",
                    "age": "10",
                    "salary": "1233333"
                },
                {
                    "name": "a",
                    "last_name": "b",
                    "personal_id": "1231231231",
                    "national_id": "3453453451",
                    "tele": "09123334455",
                    "is_married": "false",
                    "gender": "female",
                    "address": "hh",
                    "age": "65",
                    "salary": "1233333"
                },
            ],

            searchValue: null,
        }

        this.validateSearch = this.validateSearch.bind(this);
    }

    separate(Number) {
        Number+= '';
        Number= Number.replace(',', '');
    
        var x = Number.split('.');
        var y = x[0];
        var z= x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;

        while (rgx.test(y))
            y= y.replace(rgx, `$1,$2`);
        return y+ z;
    }

    componentDidMount() {

        axios
        .get("employeeslist/")
        .then(res => this.setState({employeesList: res.data}, () => {
            console.log(this.state.employeesList);
        }));


        setInterval(
            () => this.setState({done: true}),
            900,
        );
    }

    validateSearch(e) {
        switch (e.target.name) {
            
            case "last-name-search":
                this.setState({slastNameValue: e.target.value}, () => {

                    if (this.state.slastNameValue === '' && this.state.sageValue === '' && this.state.sisMarriedValue === '' && this.state.sgenderValue === '') {
                        this.setState({foundEmployees: []});
                        return;
                    }
                    var lastNameResult = [];
                    for (var i = 0; i < this.state.employeesList.length; i++) {
                        // lastname search
                        if (this.state.slastNameValue === ''){
                            lastNameResult = this.state.employeesList;
                            break;
                        }
                        if (this.state.employeesList[i]["last_name"].includes(this.state.slastNameValue)) {
                            lastNameResult.push(this.state.employeesList[i]);
                        }
                    }
                    

                    var ageResult = [];
                    for (i = 0; i < lastNameResult.length; i++) {
                        // age search
                        if (this.state.sageValue === ''){
                            ageResult = lastNameResult;
                            break;
                        }
                        if (lastNameResult[i]["age"].toString() === this.state.sageValue) {
                            ageResult.push(lastNameResult[i]);
                        }
                    }
                    

                    var genderResult = [];
                    for (i = 0; i < ageResult.length; i++) {
                        // gender search
                        if (this.state.sgenderValue === ''){
                            genderResult = ageResult;
                            break;
                        }
                        if (ageResult[i]["gender"] === this.state.sgenderValue) {
                            genderResult.push(ageResult[i]);
                        }
                    }
            
                    var maritalResult = [];
                    for (i = 0; i < genderResult.length; i++) {
                        // marital status search
                        if (this.state.sisMarriedValue === ''){
                            maritalResult = genderResult;
                            break;
                        }
                        if (genderResult[i]["is_married"].toString() === this.state.sisMarriedValue) {
                            maritalResult.push(genderResult[i]);
                        }
                    }
                    
                    this.setState({foundEmployees: maritalResult});
            
                });
                break;
            case "age-search":
                this.setState({sageValue: e.target.value}, () => {
                    if (this.state.slastNameValue === '' && this.state.sageValue === '' && this.state.sisMarriedValue === '' && this.state.sgenderValue === '') {
                        this.setState({foundEmployees: []});
                        return;
                    }
                    var lastNameResult = [];
                    for (var i = 0; i < this.state.employeesList.length; i++) {
                        // lastname search
                        if (this.state.slastNameValue === ''){
                            lastNameResult = this.state.employeesList;
                            break;
                        }
                        if (this.state.employeesList[i]["last_name"].includes(this.state.slastNameValue)) {
                            lastNameResult.push(this.state.employeesList[i]);
                        }
                    }
                    

                    var ageResult = [];
                    for (i = 0; i < lastNameResult.length; i++) {
                        // age search
                        if (this.state.sageValue === ''){
                            ageResult = lastNameResult;
                            break;
                        }
                        if (lastNameResult[i]["age"].toString() === this.state.sageValue) {
                            ageResult.push(lastNameResult[i]);
                        }
                    }
                    

                    var genderResult = [];
                    for (i = 0; i < ageResult.length; i++) {
                        // gender search
                        if (this.state.sgenderValue === ''){
                            genderResult = ageResult;
                            break;
                        }
                        if (ageResult[i]["gender"] === this.state.sgenderValue) {
                            genderResult.push(ageResult[i]);
                        }
                    }
            
                    var maritalResult = [];
                    for (i = 0; i < genderResult.length; i++) {
                        // marital status search
                        if (this.state.sisMarriedValue === ''){
                            maritalResult = genderResult;
                            break;
                        }
                        if (genderResult[i]["is_married"].toString() === this.state.sisMarriedValue) {
                            maritalResult.push(genderResult[i]);
                        }
                    }
                    
                    this.setState({foundEmployees: maritalResult});

                });
                break;
            case "marital-status":
                this.setState({sisMarriedValue: e.target.value}, () => {
                    if (this.state.slastNameValue === '' && this.state.sageValue === '' && this.state.sisMarriedValue === '' && this.state.sgenderValue === '') {
                        this.setState({foundEmployees: []});
                        return;
                    }
                    var lastNameResult = [];
                    for (var i = 0; i < this.state.employeesList.length; i++) {
                        // lastname search
                        if (this.state.slastNameValue === ''){
                            lastNameResult = this.state.employeesList;
                            break;
                        }
                        if (this.state.employeesList[i]["last_name"].includes(this.state.slastNameValue)) {
                            lastNameResult.push(this.state.employeesList[i]);
                        }
                    }
                    

                    var ageResult = [];
                    for (i = 0; i < lastNameResult.length; i++) {
                        // age search
                        if (this.state.sageValue === ''){
                            ageResult = lastNameResult;
                            break;
                        }
                        if (lastNameResult[i]["age"].toString() === this.state.sageValue) {
                            ageResult.push(lastNameResult[i]);
                        }
                    }
                    

                    var genderResult = [];
                    for (i = 0; i < ageResult.length; i++) {
                        // gender search
                        if (this.state.sgenderValue === ''){
                            genderResult = ageResult;
                            break;
                        }
                        if (ageResult[i]["gender"] === this.state.sgenderValue) {
                            genderResult.push(ageResult[i]);
                        }
                    }
            
                    var maritalResult = [];
                    for (i = 0; i < genderResult.length; i++) {
                        // marital status search
                        if (this.state.sisMarriedValue === ''){
                            maritalResult = genderResult;
                            break;
                        }
                        if (genderResult[i]["is_married"].toString() === this.state.sisMarriedValue) {
                            maritalResult.push(genderResult[i]);
                        }
                    }
                    
                    this.setState({foundEmployees: maritalResult});

                });
                break;
            case "gender":
                this.setState({sgenderValue: e.target.value}, () => {
                    if (this.state.slastNameValue === '' && this.state.sageValue === '' && this.state.sisMarriedValue === '' && this.state.sgenderValue === '') {
                        this.setState({foundEmployees: []});
                        return;
                    }
                    var lastNameResult = [];
                    for (var i = 0; i < this.state.employeesList.length; i++) {
                        // lastname search
                        if (this.state.slastNameValue === ''){
                            lastNameResult = this.state.employeesList;
                            break;
                        }
                        if (this.state.employeesList[i]["last_name"].includes(this.state.slastNameValue)) {
                            lastNameResult.push(this.state.employeesList[i]);
                        }
                    }
                    

                    var ageResult = [];
                    for (i = 0; i < lastNameResult.length; i++) {
                        // age search
                        if (this.state.sageValue === ''){
                            ageResult = lastNameResult;
                            break;
                        }
                        if (lastNameResult[i]["age"].toString() === this.state.sageValue) {
                            ageResult.push(lastNameResult[i]);
                        }
                    }
                    

                    var genderResult = [];
                    for (i = 0; i < ageResult.length; i++) {
                        // gender search
                        if (this.state.sgenderValue === ''){
                            genderResult = ageResult;
                            break;
                        }
                        if (ageResult[i]["gender"] === this.state.sgenderValue) {
                            genderResult.push(ageResult[i]);
                        }
                    }
            
                    var maritalResult = [];
                    for (i = 0; i < genderResult.length; i++) {
                        // marital status search
                        if (this.state.sisMarriedValue === ''){
                            maritalResult = genderResult;
                            break;
                        }
                        if (genderResult[i]["is_married"].toString() === this.state.sisMarriedValue) {
                            maritalResult.push(genderResult[i]);
                        }
                    }
                    
                    this.setState({foundEmployees: maritalResult});

                });
                break;
            default:
                break;
        }
    
    }
    render() {
        return(
            <div>
        {!this.state.done ? (
          <PointSpreadLoading />
        ) : (
            <div>
                <p style={{marginBottom: "0"}}>فیلترها</p>
            <hr></hr>
            <div className="row div-filters">
                <div className="col-6">
                <input 
                        onChange={this.validateSearch} 
                        style={{margin: "auto", display: "block", borderRadius: "0", textAlign: "center", border: "0", borderBottom: "2px solid rgb(0, 0, 70)", marginBottom: "15px", backgroundColor: "color"}} 
                        name="last-name-search" 
                        type="text" 
                        value={this.state.slastNameValue}
                        placeholder="نام خانوادگی" />
                </div>
                <div className="col-6">
                <input 
                onChange={this.validateSearch}
                style={{margin: "auto", display: "block", borderRadius: "0", border: "0", borderBottom: "2px solid rgb(0, 0, 70)", marginBottom: "15px", backgroundColor: "color", textAlign: "center"}} 
                
                placeholder="سن" 
                type="number" 
                name="age-search" 
                step="1" />
                </div>
            </div>

            <div className="row div-filters">
                <div className="col-6">
                <div className="row" style={{textAlign: "center"}}>
                                <span className="marital">مجرد</span>
                                <input type="radio" name="marital-status" value="false" onChange={this.validateSearch} />
        
                                <span className="marital">متاهل</span>
                                <input type="radio" name="marital-status" value="true" onChange={this.validateSearch} />
                                </div>
                </div>
                <div className="col-6">
                <div className="row" style={{textAlign: "center"}}>
                                <span className="gender">مرد</span>
                                <input type="radio" name="gender" value="male" onChange={this.validateSearch} />
        
                                <span className="gender">زن</span>
                                <input type="radio" name="gender" value="female" onChange={this.validateSearch} />
                                </div>
                </div>
            </div>
            <p style={{marginBottom: "0"}}>نتیجه جستجو</p>
            <hr></hr>

            <table className="employee-info">
                            <tbody>
                            <tr>
                                <th>شماره پرسنلی</th>
                                <th>نام</th>
                                <th>نام خانوادگی</th>
                                <th>کد ملی</th>
                                <th>تلفن</th>
                                <th>وضعیت تاهل</th>
                                <th>جنسیت</th>
                                <th>آدرس محل سکونت</th>
                                <th>سن</th>
                                <th>حقوق دریافتی</th>
                            </tr>
                            {
                                this.state.foundEmployees.map(item =>(
                                    <tr>
                                <td>{ item["personal_id"] }</td>
                                <td>{ item["name"] }</td>
                                <td>{ item["last_name"] }</td>
                                <td>{ item["national_id"] }</td>
                                <td style={{direction: "ltr"}}>{ item["tele"] }</td>
                                <td>
                                    { 
                                        item["is_married"] === true ? "متاهل" : "مجرد"
                                    }
                                </td>
                                <td>
                                    { 
                                        item["gender"] === "male" ? "مرد" : "زن"
                                    }
                                </td>
                                <td>{ item["address"] }</td>
                                <td>{ item["age"] }</td>
                                <td> {this.separate(parseInt(item["salary"])) } تومان</td>
                            </tr>
                                ))
                            }
                            
                            </tbody>
                            
                        </table>
            </div>
        )}
      </div>
        );
    }
    
}

export default TheReportEmployee;