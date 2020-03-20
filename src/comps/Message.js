import React from 'react';
import './Message.css';

class TheMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: this.props.msg,
            color: this.props.color,
            changeOpacity: "0",
        }
    }

    componentDidMount() {
        setInterval(
            () => this.setState({changeOpacity: "1"}),
            100,
        );

        setInterval(
            () => this.setState({changeOpacity: "1"}),
            100,
        );
        
    }

    render() {
        return  (
            <div className="row message" style={{backgroundColor: this.props.color, color: this.props.color === "#369436" ? "white" : "black"}}>
                <p style={{opacity: this.state.changeOpacity}}>-- {this.props.msg} {this.state.number}--</p>
            </div>
        )
    }
    
}

export default TheMessage;