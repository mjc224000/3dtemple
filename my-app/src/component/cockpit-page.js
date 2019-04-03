import React, {Component} from 'react';
import {Layout} from "antd";
import EchartMap from './echartMap';
import SVGBorder from './presentation/svgBorder3';

const {Content} = Layout;

class CockpitPage extends Component {

    render() {
        return (<Content>
            <div style={{display:"flex",height:'100%'}}>
                <div style={{height: "100%"}} className={'column-4'}>

                </div>
                <div style={{height: "100%"}} className={'column-4'}>
                   <SVGBorder/>
                    <EchartMap/>
                </div>
                <div style={{height: "100%"}} className={'column-4'}>

                </div>
            </div>

        </Content>)
    }
}

export default CockpitPage;