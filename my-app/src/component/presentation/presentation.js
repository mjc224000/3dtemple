import React, {Component} from 'react';
import './presentation.css';
import Border from './border';

class Presentation extends Component {
    render() {
        return (<div className={'presentation'} >
            <Border></Border>
            { [this.props.children]}
            <div ref={'myt'} className={'presentation-plate'}></div>
        </div>)
    }
}

export default Presentation;