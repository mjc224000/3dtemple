import React, {Component} from 'react';
import {Layout} from "antd/lib/index";
import EchartMap from '../echartMap';
import SVGBorder from '../presentation/svgBorder3';
import SVGBorder2 from '../presentation/svgBorder4';
import fetch from "../../fetch";
import {api} from "../../api";
import {Tree} from '../tree';

const {Content} = Layout;

class CockpitPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            geoCoordMap: null,
            treeData: []
        };
    }

    async componentDidMount() {
        console.log('co did');
        this.fetchTreeData();
    }

    async fetchTreeData() {
        let treeData = await fetch.get(api.tree);
        treeData=treeData.data;
          this.setState({
              treeData: treeData
          })
    }

    render() {

        return (<Content>
            <div style={{display: "flex", height: '100%'}}>
                <div style={{height: "100%",}} className={'column-4'}>
                    <div style={{height: "60%", position: 'relative'}}>
                        <SVGBorder2/>
                        <Tree data={this.state.treeData}/>
                    </div>
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