import React, {Component} from 'react';
import './border.css';

class SvgBorder extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (<svg className={'borderSvg'} height="95%" width="95%" viewBox="0 0 630 580" preserveAspectRatio="none slice">
            <defs>
                <radialGradient id="rG1">
                    <stop offset="0%" stop-color="white"></stop>
                    <stop offset="100%" stop-color="rgb(150,150,80)"></stop>
                </radialGradient>
                <linearGradient id="lG1" x1="50%" y1="0" x2="50%" y2="1">
                    <stop offset="0%" stop-color="rgba(225,225,225,0.3)"></stop>
                    <stop offset="25%" stop-color="rgba(225,225,225,0.1)"></stop>
                </linearGradient>
                <g id="c1">
                    <circle r="4" fill="url(#rG1)"></circle>
                </g>
            </defs>
            <path d="M0,40 400,40 427,6 630,6 630,580 0,580 0,40" stroke-width="4" stroke="rgb(200,200,80)"
                  fill="none"></path>
            <path d="M13,53 413,53 440,19 617,19 617,567 13,567 13,53" fill="url(#lG1)"></path>
            <use x="13" y="53" xlinkHref="#c1"></use>
            <use x="413" y="53" xlinkHref="#c1"></use>
            <use x="440" y="19" xlinkHref="#c1"></use>
            <use x="617" y="19" xlinkHref="#c1"></use>
            <use x="617" y="567" xlinkHref="#c1"></use>
            <use x="13" y="567" xlinkHref="#c1"></use>
            <use x="13" y="53" xlinkHref="#c1"></use>
        </svg>)
    }
}

export default SvgBorder