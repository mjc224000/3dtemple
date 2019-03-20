import React, {Component} from 'react';
import './border.css'
class Border extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={'draw'} style={{width: '100%', height: '100%',position:'absolute'}}>
                {[this.props.children]}
            </div>
        )
    }
}

export default Border