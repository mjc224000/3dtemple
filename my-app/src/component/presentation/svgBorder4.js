import React,{Component} from 'react';
class svgBorder4  extends Component {
    render(){

        return(<svg  style={{position:'absolute'}}   height={"100%"} width={"100%"} viewBox="0 0 517 477" preserveAspectRatio="none slice">
            <defs>
                <radialGradient id="rG1">
                    <stop offset="0%" stopColor="white"></stop>
                    <stop offset="100%" stopColor="rgb(150,150,80)"></stop>
                </radialGradient>
                <linearGradient id="lG1" x1="50%" y1="0" x2="50%" y2="1">
                    <stop offset="0%" stopColor="rgba(225,225,225,0.3)"></stop>
                    <stop offset="25%" stopColor="rgba(225,225,225,0.1)"></stop>
                </linearGradient>
                <g id="c1">
                    <circle r="4" fill="url(#rG1)"></circle>
                </g>
            </defs>
            <path  d="M0,0 166,0 190,27 517,27 517,477 0,477 0,0"  stroke="rgb(200,200,80)" fill="none"></path>
            <path d="M10,10 156,10 188,43 507,43 507,467 10,467 10,10" fill="url(#lG1)"></path>
            <use x="10" y="10" xlinkHref="#c1"></use>
            <use  x="156" y="10" xlinkHref="#c1"></use>
            <use x="188" y="43" xlinkHref="#c1"></use>
            <use x="507" y="43" xlinkHref="#c1"></use>
            <use x="507" y="467" xlinkHref="#c1"></use>
            <use x="10" y="467" xlinkHref="#c1"></use>
        </svg>)
    }
}
export default svgBorder4;