import React,{Component} from 'react';
class svgBorder5  extends Component {
    render(){

        return(<svg  style={{position:'absolute'}}   height={"100%"} width={"100%"} viewBox="0 0 566 526" preserveAspectRatio="none slice">
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
            <path d="M0,36 361,36 389,0 566,0 566,526 0,526 0,36" stroke="rgb(200,200,80)" fill="none"></path>
            <path d="M10,46 371,46 399,10 556,10 556,527 10,516 10,46"  fill="url(#lG1)" stroke="none"></path>
            <use x="10" y="46" xlinkHref="#c1"></use>
            <use x="371" y="46" xlinkHref="#c1"></use>
            <use x="556" y="10" xlinkHref="#c1"></use>
            <use x="556" y="516" xlinkHref="#c1"></use>
            <use x="10" y="516" xlinkHref="#c1"></use>
            <use x="10" y="46" xlinkHref="#c1"></use>
        </svg>)
    }
}
export default svgBorder5;