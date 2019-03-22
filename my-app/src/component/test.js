import React, {Component} from 'react';

function Child(props) {
    console.log(props, 'child child');
    return <div></div>
}

function F({children}) {

    return (  <div>{children()}</div> );
}
class FF extends Component{
    constructor(props){
        super(props);
        this.boundary=React.createRef();

    }

    render(){
        let {children}=this.props;
        console.log(this.boundary,'ref ref');
        return <div  ref={this.boundary} >{children(1,1)} </div>
    }
}
export default () => <FF>{({width,height}) => <Child width={width} height={height}/>}</FF>