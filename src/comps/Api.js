import React from 'react';
import './Api.css';
import './../fontawesome-free-5.12.0-web/css/all.css';

import {PointSpreadLoading} from 'react-loadingg';

class TheApi extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            islogged: this.props.islogged,
            done: undefined,
        }
    }

    componentDidMount() {

        setInterval(
            () => this.setState({done: true}),
            900,
        );
    }
    render() {
        return(
            <div>
        {!this.state.done ? (
          <PointSpreadLoading />
        ) : (
            <div>
                <p>این پنل مدیریتی دارای یک سرویس API است که خدمات زیر را ارائه می دهد:</p>
                <ul style={{textAlign: "left"}}>
                    <li>listbyname/name</li>
                    <li>deletebygender/gender</li>
                    <li>updatesalary/personal_id/salary_amount</li>
                </ul>
            </div>
        )}
      </div>
        );
    }
    
}

export default TheApi;