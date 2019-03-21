import React, {Component} from 'react';
import './border.css'
class Border extends Component {
    render() {
        return (
            <svg className={'border-svg'}  xmlns="http://www.w3.org/2000/svg"   width="95%" height="95%" viewBox="0 0 400 400"  preserveAspectRatio="none slice">
                <path d="M 0,0 400,0 400,400 0,400 0,0"  strokeWidth="1" stroke="cyan" fill="none"></path>
                <path d="M 0,50  0,0 50,0" strokeWidth="10"  fill="none" stroke="cyan"></path>
                <path d="M 0,350 0,400 50,400" strokeWidth="10"  fill="none" stroke="cyan"></path>
                <path d="M 350,400 400,400 400,350" strokeWidth="10"  fill="none" stroke="cyan"></path>
                <path d="M 350,400 400,400 400,350" strokeWidth="10"  fill="none" stroke="cyan"></path>
                <path d="M 350,0 400,0 400,50" strokeWidth="10" fill="none" stroke="cyan" ></path>
            </svg>
        )
    }
}

export default Border