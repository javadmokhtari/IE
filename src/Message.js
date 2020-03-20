import React, {Component} from 'react';
import './comps/Message.css';

export default class myMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: this.props.msg,
            color: this.props.color,
        }
    }

    render() {
        return  (
            // <div className="row message" style={{backgroundColor: this.state.color}}>
            //     <p>{this.state.msg}</p>
            // </div>
            <a href="/">temp</a>
        )
    }
    
}
