import React, {Component} from 'react';
import {Tree} from '../component/tree';
import fetch from "../fetch";
import {api} from "../api";
import TreeTable from "./TreeTable";


export class TreeManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            treeData: {},
            treeTableData: []
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

    updateTreeData = async (newRow) => {
        const {name, fatherName, uid} = newRow;
        const newData = [...this.state.treeTableData];

        //找不到uid 新增.
        if (!uid) {
            let res = await this.addTreeData(newRow);
            if (res !== 'ok') {
                return 0
            }
        } else {
            //更新
          let res = await fetch.put(api.tree, {name, fatherName, uid});
            let data = res.data;
            if (data !== 'ok') {
                return 0
            }
        }
        const index = newData.findIndex(item => newRow.uid === item.uid);
        let oldRow = newData[index];
        newData.splice(index, 1, {
            ...oldRow, name, fatherName
        })
        this.setState({
            treeTableData: newData
        })
        return 1;
    }
    addTreeData = async (newRow) => {
        const {name, fatherName} = newRow;
        console.log('perform add');
        let res = await fetch.post(api.tree, {name, fatherName});
        return res.data
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
                    <TreeTable handleUpdate={this.updateTreeData} addRow={this.addRow} data={this.state.treeTableData}/>
                </div>
            </div>
        </div>)
    }
}