import React, {Component} from 'react';
import {Layout} from "antd/lib/index";
import EchartMap from '../echartMap';
import SVGBorder from '../presentation/svgBorder3';
import fetch from "../../fetch";
import {api} from "../../api";

const {Content} = Layout;

class CockpitPage extends Component {
    constructor(props) {
        super(props);
        this.state = {geoCoordMap: null};
    }

    async componentDidMount() {
        console.log('co did');
    }



    render() {

        return (<Content>
            <div style={{display: "flex", height: '100%'}}>
                <div style={{height: "100%"}} className={'column-4'}>

                </div>
                <div style={{height: "100%"}} className={'column-4'}>
                    <SVGBorder/>
                    <EchartMap geoCoordMap={this.state.geoCoordMap}/>
                </div>
                <div style={{height: "100%"}} className={'column-4'}>

                </div>
            </div>

        </Content>)
    }
}

export default CockpitPage;