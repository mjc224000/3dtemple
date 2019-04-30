import React, {Component} from 'react';
import {Tree} from '../component/tree';
import fetch from "../fetch";
import {api} from "../api";
import TreeTable from "./TreeTable";


export class TreeManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            treeData: {}
        }
    }

    componentDidMount() {
        this.fetchTreeData();
    }

    loop(obj, res, fatherName) {

        let {uid, name, children} = obj;
        if (uid) {
            res.push({key: uid, uid, name, fatherName})
        }
        let length = children && children.length;
        if (length) {
            for (let i = 0; i < length; i++) {
                children[i].father = name;
                this.loop(children[i], res, name)
            }
        }
    }

    mapDataToArray(data) {
        let res = [];
        if (data.name) {
            this.loop(data, res);
        }
        return res;
    }

    async fetchTreeData() {
        let treeData = await fetch.get(api.tree);
        treeData = treeData.data;
        let treeTableData = this.mapDataToArray(treeData)
        this.setState({
            treeData: treeData,
            treeTableData
        })
    }
    updateTreeData = (option) => {
        console.log(option,'updateTreeData');
          this.setState({treeTableData:option})
    }
    addRow = () => {
        let data = this.state.treeTableData;
        let newRow = {name: '新增未保存', fatherName: '新增未保存', key: Math.random()};
        data.push(newRow);
        this.setState({data: [...data]});

    }

    render() {
        return (<div style={{display: 'flex'}}>
            <div style={{flex: '50%'}}>
                <Tree data={this.state.treeData}/>
            </div>
            <div style={{flex: '50%'}}>
                <div>
                    <TreeTable handleUpdate={this.updateTreeData} addRow={this.addRow} data={this.state.treeTableData}/></div>
            </div>
        </div>)
    }
}