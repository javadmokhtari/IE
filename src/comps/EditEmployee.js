import React from 'react';
import './EditEmployee.css';

import './../fontawesome-free-5.12.0-web/css/all.css';
import './../general.min.css';

import {PointSpreadLoading} from 'react-loadingg';


import axios from 'axios';



class TheEditEmployee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            islogged: this.props.islogged,
            nameError: "error",
            last_nameError: "error",
            nationalIDError: "error",
            personalIDError: "error",
            teleError: "error",
            addressError: "error",
            ageError: "error",
            salaryError: "error",

            editMessage: "",
            
            done: undefined,

            employeeList: [
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
        };
        this.validateName     = this.validateName.bind(this);
        this.validateLastName = this.validateLastName.bind(this);
        this.validateNID      = this.validateNID.bind(this);
        this.validatePID      = this.validatePID.bind(this);
        this.validateTele     = this.validateTele.bind(this);
        this.validateAddress  = this.validateAddress.bind(this);
        this.validateAge      = this.validateAge.bind(this);
        this.validateSalary   = this.validateSalary.bind(this);
        this.finalValidate    = this.finalValidate.bind(this);
        this.validateSearch   = this.validateSearch.bind(this);
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

    onlyCharacter(myString) {
        var pattern = /^[A-Za-z]+$/;
        return pattern.test(myString);
    }

    validateName(e) {
        this.setState({nameValue: e.target.value})

        if (!this.onlyCharacter(e.target.value)) {
                this.setState({nameError: "نام باید فقط شامل حروف انگلیسی باشد."});
        } else {
                this.setState({nameError: "error"});
        }
    }

    validateLastName(e) {
        this.setState({last_nameValue: e.target.value})
        if (!this.onlyCharacter(e.target.value)) {
                this.setState({last_nameError: "نام خانوادگی باید فقط شامل حروف انگلیسی باشد."});
        } else {
                this.setState({last_nameError: "error"});
        }
    }

    validateNID(e) {
        this.setState({nationalIDValue: e.target.value})

        if (e.target.value.length !== 10) {
            this.setState({nationalIDError: "کدملی باید شامل دقیقا ۱۰ عدد باشد."})
        } else {
            if (isNaN(e.target.value)) {
                this.setState({nationalIDError: "کدملی باید فقط شامل اعداد باشد."})
            } else {
                this.setState({nationalIDError: "error"});
            }

        }

    }

    validatePID(e) {
        this.setState({personalIDValue: e.target.value});

        if (e.target.value.length !== 10) {
            this.setState({personalIDError: "کدملی باید شامل دقیقا ۱۰ عدد باشد."})
        } else {
            if (isNaN(e.target.value)) {
                this.setState({personalIDError: "کدملی باید فقط شامل اعداد باشد."})
            } else {
                this.setState({personalIDError: "error"});
            }

        }

    }

    validateTele(e) {
        this.setState({teleValue: e.target.value});

        if (e.target.value.length !== 13) {
            this.setState({teleError: "شماره تلفن باید شامل دقیقا ۱۳ کاراکتر باشد."})
        } else {
            if (isNaN(e.target.value.substr(3, e.target.value.length-3))) {
                this.setState({teleError: "شماره تلفن فقط شامل عدد می باشد."})
            } else {

                
                if (e.target.value[0] !== "+" || e.target.value.substr(1, 2) !== "98" || e.target.value[3] !== "9") {
                    this.setState({teleError: "فرمت شماره تلفن مجاز نمی باشد."})
                } else {
                    this.setState({teleError: "error"});
                }
                
            }

        }
    }

    validateAddress(e) {
        this.setState({addressValue: e.target.value});

        if (e.target.value.length < 10) {
            this.setState({addressError: "آدرس نمی تواند کم تر از ۱۰ کاراکتر باشد."});
        } else {
            this.setState({addressError: "error"});
        }
    }

    validateAge(e) {
        this.setState({ageValue: e.target.value});

        if (isNaN(e.target.value)) {
            this.setState({ageError: "سن فقط باید شامل عدد باشد."});
        } else {
            if (e.target.value[0] === "0" || e.target.value.length > 3) {
                this.setState({ageError: "فرمت سن نامعتبر است."});
            } else {
                this.setState({ageError: "error"});
            }
        }
    }

    validateSalary(e) {
        this.setState({salaryValue: e.target.value});

        if (isNaN(e.target.value)) {
            this.setState({salaryError: "حقوق فقط باید شامل عدد باشد."})
        } else {
            if (e.target.value[0] === "0") {
                this.setState({salaryError: "فرمت حقوق نامعتبر است."});
            } else {
                this.setState({salaryError: "error"});
            }
        }
    }

    finalValidate(e) {
        if (
            this.state.nameError === "error" && 
            this.state.last_nameError === "error" &&
            this.state.nationalIDError === "error" &&
            this.state.personalIDError === "error" &&
            this.state.teleError === "error" &&
            this.state.addressError === "error" &&
            this.state.ageError === "error" &&
            this.state.salaryError === "error"
            ) {
                if (
                    this.state.nameValue !== null && 
                    this.state.last_nameValue !== null &&
                    this.state.nationalIDValue !== null &&
                    this.state.personalIDValue !== null &&
                    this.state.teleValue !== null &&
                    this.state.addressValue !== null &&
                    this.state.ageValue !== null &&
                    this.state.salaryValue !== null &&
                    this.state.foundEmployee !== null &&
                    this.state.nameValue !== '' && 
                    this.state.last_nameValue !== '' &&
                    this.state.nationalIDValue !== '' &&
                    this.state.personalIDValue !== '' &&
                    this.state.teleValue !== '' &&
                    this.state.addressValue !== '' &&
                    this.state.ageValue !== '' &&
                    this.state.salaryValue !== '' &&
                    this.state.foundEmployee !== ''
                    ) {
                        this.setState({editMessage: ""});

                        axios
                        .get(
                            "api-update/", {
                                params: {
                                    name: this.state.nameValue,
                                    last_name: this.state.last_nameValue,
                                    national_id: this.state.nationalIDValue,
                                    personal_id: this.state.personalIDValue,
                                    tele: this.state.teleValue,
                                    address: this.state.addressValue,
                                    salary: this.state.salaryValue,
                                    age: this.state.ageValue,
                                    is_married: this.state.isMarriedValue,
                                    gender: this.state.genderValue
                                }
                            })
                        .then(res => {
                            if (res.data.editMessage === "yes") {
                                this.setState({editMessage: "اطلاعات کارمند با موفقیت ویرایش شد."}, () => {
                                    axios
                                    .get("employeeslist/")
                                    .then(res => this.setState({employeeList: res.data}, () => {
                                    console.log(this.state.employeeList);
                                    }));
                                });
                            } else {
                                this.setState({editMessage: "خطایی رخ داده است. لطفا دوباره امتحان کنید."});
                            }
                            
                        });

                        

                    } else {
                        this.setState({editMessage: "هیچ فیلدی نباید خالی باشد."});
                    }
                
            } else {
                this.setState({editMessage: "لطفا خطاهای مربوطه را برطرف کنید."})
            }
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

    render() {
        return(
            <div>
                {!this.state.done ? <PointSpreadLoading /> : 
                            <div className="add-div">               
                            <input 
                            onChange={this.validateSearch} 
                            style={{margin: "auto", display: "block", borderRadius: "0", textAlign: "center", border: "0", borderBottom: "2px solid rgb(0, 0, 70)", marginBottom: "15px", backgroundColor: "color"}} 
                            name="search" 
                            type="text" 
                            autoFocus
                            placeholder="شماره پرسنلی را وارد کنید" />
                            <hr></hr>
                            <div className="row">
                                <div className="col-6">
                                <p class={this.state.nameError === "error" ? "error-msg" : "show-error-msg"}>{ this.state.nameError }</p>
                                <span className="fas fa-address-book"></span>
                                <input 
                                onChange={this.validateName} 
                                name="name" 
                                type="text" 
                                placeholder="نام*"
                                disabled={!this.state.foundEmployee}
                                value={this.state.nameValue} />
                                </div>
                                <div className="col-6">
                                <p class={this.state.last_nameError === "error" ? "error-msg" : "show-error-msg"}>{ this.state.last_nameError }</p>
                                <span className="fas fa-address-book"></span>
                                <input 
                                onChange={this.validateLastName} 
                                name="last_name" 
                                type="text" 
                                placeholder="نام خانوادگی*" 
                                disabled={!this.state.foundEmployee}
                                value={this.state.last_nameValue} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                <p class={this.state.nationalIDError === "error" ? "error-msg" : "show-error-msg"}>{ this.state.nationalIDError }</p>
                                <span className="fas fa-address-book"></span>
                                <input 
                                onChange={this.validateNID} 
                                name="national_id" 
                                type="text" 
                                placeholder="کد ملی*" 
                                disabled={!this.state.foundEmployee}
                                value={this.state.nationalIDValue} />
                                </div>
        
        
                                <div className="col-6">
                                <p class={this.state.personalIDError === "error" ? "error-msg" : "show-error-msg"}>{ this.state.personalIDError }</p>
                                <span className="fas fa-address-book"></span>
                                <input 
                                onChange={this.validatePID} 
                                name="personal_id" 
                                type="text" 
                                placeholder="شماره پرسنلی*" 
                                disabled={!this.state.foundEmployee}
                                value={this.state.personalIDValue} />
                                </div>
        
        
                            </div>
                            <div className="row">
                                <div className="col-6">
                                <p class={this.state.teleError === "error" ? "error-msg" : "show-error-msg"}>{ this.state.teleError }</p>
                                <span className="fas fa-address-book"></span>
                                <input 
                                onChange={this.validateTele} 
                                name="tele" 
                                type="text" 
                                placeholder="تلفن*" 
                                disabled={!this.state.foundEmployee}
                                value={this.state.teleValue} />
                                </div>
                                <div className="col-6 marital-div">
        
                                <p class="error-msg">{ this.state.maritalError }</p>
                                <div className="row" style={{ paddingRight: "20px"}}>
                                <span className="marital">مجرد</span>
                                <input 
                                type="radio" 
                                name="marital-status" 
                                value="false" 
                                disabled={!this.state.foundEmployee}
                                onChange={() => this.setState({isMarriedValue: false})} checked={this.state.isMarriedValue === false ? "checked" : ""} />
        
                                <span className="marital">متاهل</span>
                                <input 
                                type="radio" 
                                name="marital-status" 
                                disabled={!this.state.foundEmployee}
                                value="true" onChange={() => this.setState({isMarriedValue: true})} checked={this.state.isMarriedValue === true ? "checked" : ""} />
                                </div>
        
                                <p class="error-msg">{ this.genderError }</p>
                                <div className="row" style={{ paddingRight: "20px"}}>
                                <span className="gender">مرد</span>
                                <input 
                                type="radio" 
                                name="gender" 
                                value="Male" 
                                disabled={!this.state.foundEmployee}
                                onChange={() => this.setState({genderValue: this.state.genderValue === "male" ? "female" : "male"})} checked={this.state.genderValue === "male" ? "checked" : ""} />
        
                                <span className="gender">زن</span>
                                <input 
                                type="radio" 
                                name="gender" 
                                value="Female" 
                                disabled={!this.state.foundEmployee}
                                onChange={() => this.setState({genderValue: this.state.genderValue === "male" ? "female" : "male"})} checked={this.state.genderValue === "female" ? "checked" : ""} />
                                </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                <p class={this.state.addressError === "error" ? "error-msg" : "show-error-msg"}>{ this.state.addressError }</p>
                                <span className="fas fa-address-book"></span>
                                <input 
                                onChange={this.validateAddress} 
                                name="address" 
                                type="text" 
                                placeholder="آدرس*"
                                disabled={!this.state.foundEmployee} 
                                value={this.state.addressValue} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                <p class={ this.state.ageError === "error" ? "error-msg" : "show-error-msg"}>{ this.state.ageError }</p>
                                <span className="fas fa-address-book"></span>
                                <input 
                                onChange={this.validateAge} 
                                name="age" 
                                type="text" 
                                placeholder="سن*" 
                                disabled={!this.state.foundEmployee}
                                value={this.state.ageValue} />
                                </div>
                                <div className="col-6">
                                <p class={ this.state.salaryError === "error" ? "error-msg" : "show-error-msg" }>{ this.state.salaryError }</p>
                                <span className="fas fa-address-book"></span>
                                <input 
                                onChange={this.validateSalary} 
                                name="salary" 
                                type="text" 
                                placeholder="حقوق دریافتی (تومان)*" 
                                disabled={!this.state.foundEmployee}
                                value={this.state.salaryValue} />
                                </div>
                            </div>

                            <div className="row btn-gp">
                                <div className="col-6">
                                <button style={{marginRight: "65px"}} className="add-btn edit-btn" onClick={this.finalValidate}>ویرایش اطلاعات</button>
                                </div>
                                <div className="col-6">
                                
                                </div>
                            </div>
                            

                            <p style={{marginRight: "18px", marginTop: "10px", textAlign: "center"}}>{ this.state.editMessage }</p>
                    </div>}
            </div>
        );
    }
    
}

export default TheEditEmployee;