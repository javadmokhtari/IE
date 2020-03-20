import React from 'react';
import './AddEmployee.css';

import './../fontawesome-free-5.12.0-web/css/all.css';
import './../general.min.css';

import {PointSpreadLoading} from 'react-loadingg';


import axios from 'axios';


class TheAddEmployee extends React.Component {
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
            
            addMessage: "",

            nameValue: null,
            last_nameValue: null,
            nationalIDValue: null,
            personalIDValue: null,
            teleValue: null,
            addressValue: null,
            ageValue: null,
            salaryValue: null,

            isMarriedValue: false,
            genderValue: "male",
            
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
    }
    
    componentDidMount() {

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
                        axios
                        .get(
                            "api-create/", {
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
                            if (res.data.addMessage === "yes") {
                                this.setState({addMessage: "کارمند جدید با موفقیت ساخته شد."}, () => {
                                    axios
                                    .get("employeeslist/")
                                    .then(res => this.setState({employeeList: res.data}, () => {
                                    console.log(this.state.employeeList);
                                    }));
                                });
                            } else {
                                this.setState({addMessage: "خطایی رخ داده است. لطفا دوباره امتحان کنید."});
                            }
                            
                        });

                    } else {
                        this.setState({addMessage: "هیچ فیلدی نمی تواند خالی باشد."});
                    }
                
            } else {
                this.setState({addMessage: "لطفا خطاهای مربوطه را برطرف کنید."});
            }
    }
    render() {
        return(
            <div>
                {!this.state.done ? <PointSpreadLoading /> : 
                            <div className="add-div">
                            <p>مشخصات کارمند جدید را وارد کنید.</p>                    
                            <p>پر کردن فیلدهای ستاره دار اجباری است.</p>
                            <hr></hr>
                            <div className="row">
                                <div className="col-6">
                                <p class={this.state.nameError === "error" ? "error-msg" : "show-error-msg"}>{ this.state.nameError }</p>
                                <span className="fas fa-address-book"></span><input autoFocus onChange={this.validateName} name="name" type="text" placeholder="نام*"></input>
                                </div>
                                <div className="col-6">
                                <p class={this.state.last_nameError === "error" ? "error-msg" : "show-error-msg"}>{ this.state.last_nameError }</p>
                                <span className="fas fa-address-book"></span><input onChange={this.validateLastName} name="last_name" type="text" placeholder="نام خانوادگی*"></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                <p class={this.state.nationalIDError === "error" ? "error-msg" : "show-error-msg"}>{ this.state.nationalIDError }</p>
                                <span className="fas fa-address-book"></span><input onChange={this.validateNID} name="national_id" type="text" placeholder="کد ملی*"></input>
                                </div>
        
        
                                <div className="col-6">
                                <p class={this.state.personalIDError === "error" ? "error-msg" : "show-error-msg"}>{ this.state.personalIDError }</p>
                                <span className="fas fa-address-book"></span><input onChange={this.validatePID} name="personal_id" type="text" placeholder="شماره پرسنلی*"></input>
                                </div>
        
        
                            </div>
                            <div className="row">
                                <div className="col-6">
                                <p class={this.state.teleError === "error" ? "error-msg" : "show-error-msg"}>{ this.state.teleError }</p>
                                <span className="fas fa-address-book"></span><input onChange={this.validateTele} name="tele" type="text" placeholder="تلفن*"></input>
                                </div>
                                <div className="col-6 marital-div">
        
                                <p class="error-msg">{ this.state.maritalError }</p>
                                <div className="row" style={{ paddingRight: "20px"}}>
                                <span className="marital">مجرد</span>
                                <input 
                                type="radio" 
                                name="marital-status" 
                                value="False" 
                                onChange={() => this.setState({isMarriedValue: false})}
                                checked={this.state.isMarriedValue === false ? "checked" : ""} />
        
                                <span className="marital">متاهل</span>
                                <input 
                                type="radio" 
                                name="marital-status" 
                                value="True" 
                                onChange={() => this.setState({isMarriedValue: true})}
                                checked={this.state.isMarriedValue === true ? "checked" : ""} />
                                </div>
        
                                <p class="error-msg">{ this.genderError }</p>
                                <div className="row" style={{ paddingRight: "20px"}}>
                                <span className="gender">مرد</span>
                                <input 
                                onChange={() => this.setState({genderValue: "male"})} checked={this.state.genderValue === "male" ? "checked" : ""}
                                type="radio" name="gender" value="Male" />
        
                                <span className="gender">زن</span>
                                <input 
                                onChange={() => this.setState({genderValue: "female"})} checked={this.state.genderValue === "female" ? "checked" : ""}
                                type="radio" name="gender" value="Female" />
                                </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                <p class={this.state.addressError === "error" ? "error-msg" : "show-error-msg"}>{ this.state.addressError }</p>
                                <span className="fas fa-address-book"></span><input onChange={this.validateAddress} name="address" type="text" placeholder="آدرس*"></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                <p class={ this.state.ageError === "error" ? "error-msg" : "show-error-msg"}>{ this.state.ageError }</p>
                                <span className="fas fa-address-book"></span><input onChange={this.validateAge} name="age" type="text" placeholder="سن*"></input>
                                </div>
                                <div className="col-6">
                                <p class={ this.state.salaryError === "error" ? "error-msg" : "show-error-msg" }>{ this.state.salaryError }</p>
                                <span className="fas fa-address-book"></span><input onChange={this.validateSalary} name="salary" type="text" placeholder="حقوق دریافتی (تومان)*"></input>
                                </div>
                            </div>
                            <div className="row btn-gp">
                                <div className="col-6">
                                <button style={{marginRight: "65px"}} className="add-btn" onClick={this.finalValidate}>درج کارمند جدید</button>
                                </div>
                                <div className="col-6">
                                
                                </div>
                            </div>
                            
                            <p style={{marginRight: "18px", marginTop: "10px", textAlign: "center"}}>{ this.state.addMessage }</p>
                    </div>}
            </div>
        );
    }
    
}

export default TheAddEmployee;