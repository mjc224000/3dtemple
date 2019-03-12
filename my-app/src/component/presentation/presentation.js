import React, {Component} from 'react';
import './presentation.css';

class Presentation extends Component {
    componentDidMount() {
        console.log(this.refs)
    }

    render() {
        return (<div className={'presentation'}>
            {[this.props.children]}
            <div ref={'myt'} className={'presentation-plate'}></div>
        </div>)
    }
}

export default Presentation;