import React from 'react';
import './DeleteEmployee.css';
import './../fontawesome-free-5.12.0-web/css/all.css';

import {PointSpreadLoading} from 'react-loadingg';

import axios from 'axios';


class TheDeleteEmployee extends React.Component {
    constructor(props) {
        super(props);

        this.separate       = this.separate.bind(this);
        this.validateSearch = this.validateSearch.bind(this);
        this.finalValidate  = this.finalValidate.bind(this);
        this.state = {
            islogged: this.props.islogged,
            changeOpacity: "0",
            done: undefined,

            employeeList: [
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

            foundEmployee: null,

            searchValue: null,
            nameValue: null,
            last_nameValue: null,
            nationalIDValue: null,
            personalIDValue: null,
            teleValue: null,
            addressValue: null,
            ageValue: null,
            salaryValue: null,
            genderValue: null,
            isMarriedValue: null,

            delMessage: "",
        }
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
        .then(res => this.setState({employeeList: res.data}, () => {
            console.log(this.state.employeeList);
        }));


        setInterval(
            () => this.setState({done: true}),
            900,
        );  
    }

    validateSearch(e) {

        var f = 0;
        this.state.employeeList.forEach(element => {
            if (e.target.value === element.personal_id) {
                f = 1;
                this.setState({
                    nameValue: element.name,
                    last_nameValue: element.last_name,
                    personalIDValue: element.personal_id,
                    nationalIDValue: element.national_id,
                    addressValue: element.address,
                    teleValue: element.tele,
                    ageValue: element.age,
                    salaryValue: element.salary,
                    isMarriedValue: element.is_married,
                    genderValue: element.gender,
                    foundEmployee: element.personal_id,
                });
            }

        });

        if (f === 0) {
                this.setState({
                    nameValue: "",
                    last_nameValue: "",
                    personalIDValue: "",
                    nationalIDValue: "",
                    addressValue: "",
                    teleValue: "",
                    ageValue: "",
                    salaryValue: "",
                    isMarriedValue: "",
                    genderValue: "",
                    foundEmployee: null,
                });
            }
        }

    finalValidate(e) {
        if (this.state.foundEmployee) {
        
        axios
        .get("api-del/", {
            params: {
                personal_id: this.state.personalIDValue
            }
        })
        .then(res => {
            if (res.data.delMessage === "yes") {
                this.setState({delMessage: "کارمند مورد نظر از سیستم حذف شد."}, () => {
                    axios
                    .get("employeeslist/")
                    .then(res => this.setState({employeeList: res.data}, () => {
                    console.log(this.state.employeeList);
                    }));
                });
            } else {
                this.setState({
                    delMessage: "خطایی رخ داده است، لطفا دوباره امتحان کنید."
                });
            }
            
        });
        } else {
            this.setState({
                delMessage: "ابتدا کد پرسنلی کارمند مورد نظر را وارد کنید."
            });
        }
    }
    render() {
        return(
            <div>
                {!this.state.done ? <PointSpreadLoading /> :
                (
                    <div className="del-div">
                    <input 
                        onChange={this.validateSearch} 
                        autoFocus
                        style={{margin: "auto", display: "block", borderRadius: "0", textAlign: "center", border: "0", borderBottom: "2px solid rgb(0, 0, 70)", marginBottom: "15px", backgroundColor: "color"}} 
                        name="search" 
                        type="text" 
                        placeholder="شماره پرسنلی را وارد کنید" />
                        <p style={{marginBottom: "0"}}>نتیجه جستجو</p>
                        <hr></hr>
                        <table className="employee-info">
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
                            <tr>
                                <td>{ this.state.personalIDValue }</td>
                                <td>{ this.state.nameValue }</td>
                                <td>{ this.state.last_nameValue }</td>
                                <td>{ this.state.nationalIDValue }</td>
                                <td style={{direction: "ltr"}}>{ this.state.teleValue }</td>
                                <td>
                                    { 
                                    this.state.foundEmployee === null ? null : (
                                        this.state.isMarriedValue === true ? "متاهل" : "مجرد"
                                    )
                                    }
                                </td>
                                <td>
                                    { 
                                    this.state.foundEmployee === null ? null : (
                                        this.state.genderValue === "male" ? "مرد" : "زن"
                                    )
                                    }
                                </td>
                                <td>{ this.state.addressValue }</td>
                                <td>{ this.state.ageValue }</td>
                                <td>{ this.state.foundEmployee === null ? "" : this.separate(this.state.salaryValue) + " تومان"}</td>
                            </tr>
                        </table>
    
                        <button className="add-btn del-btn" onClick={this.finalValidate}>حذف کارمند</button>

                        <p style={{marginRight: "18px", marginTop: "10px", textAlign: "center"}}>{ this.state.delMessage }</p>
                </div>

                )}
            </div>
        );
    }
    
}

export default TheDeleteEmployee;