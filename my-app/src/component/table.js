import React, {Component} from 'react';
import {Layout, Icon} from 'antd';
import PropTypes from 'prop-types';
import './table.css';

class Table extends Component {
    static propTypes = {
        headers: PropTypes.array.isRequired,
        data: PropTypes.array.isRequired
    }

    constructor(props) {
        super(props);
        this.timer = null;
        this.state = {
            data: this.props.data.map(function (item, index) {
                item.key = index;
                return item;
            }),
            offset: 0,
            shouldScroll:false
        }
        this.ulRef = React.createRef();
        this.liRef = React.createRef();
    }
    static defaultProps = {
        headers: ['合作公司', '合作金额', '合作时间', '负责人', '职位'],
        data: [{
            corporation: '天安',
            sum: '500万元',
            beginTime: '2018年-xxxxxxx年',
            responsiblePerson: '马丘陵',
            position: '市场经理'
        },
            {
                corporation: '天安',
                sum: '500万元',
                beginTime: '2018年-xxxxxxx年',
                responsiblePerson: '马丘陵',
                position: '市场经理'
            },
            {
                corporation: '天安',
                sum: '500万元',
                beginTime: '2018年-xxxxxxx年',
                responsiblePerson: '马丘陵',
                position: '市场经理'
            },
            {
                corporation: '天安',
                sum: '500万元',
                beginTime: '2018年-xxxxxxx年',
                responsiblePerson: '马丘陵',
                position: '市场经理'
            },
            {
                corporation: '天安',
                sum: '500万元',
                beginTime: '2018年-xxxxxxx年',
                responsiblePerson: '马丘陵',
                position: '市场经理'
            },
            {
                corporation: '天安',
                sum: '500万元',
                beginTime: '2018年-xxxxxxx年',
                responsiblePerson: '马丘陵',
                position: '市场经理'
            },
            {
                corporation: '天安',
                sum: '500万元',
                beginTime: '2018年-xxxxxxx年',
                responsiblePerson: '马丘陵',
                position: '市场经理'
            },
            {
                corporation: '天安',
                sum: '500万元',
                beginTime: '2018年-xxxxxxx年',
                responsiblePerson: '马丘陵',
                position: '市x场经理'
            },
            {
                corporation: '天安',
                sum: '500万元',
                beginTime: '2018年-xxxxxxx年',
                responsiblePerson: '马丘陵',
                position: '市场经理'
            },
            {
                corporation: '天安',
                sum: '500万元',
                beginTime: '2018年-xxxxxxx年',
                responsiblePerson: '马丘陵',
                position: '市场经理'
            },
            {
                corporation: '天安',
                sum: '500万元',
                beginTime: '2018年-xxxxxxx年',
                responsiblePerson: '马丘陵',
                position: '市场经理'
            },
            {
                corporation: '天安',
                sum: '500万元',
                beginTime: '2018年-xxxxxxx年',
                responsiblePerson: '马丘陵',
                position: '市场经理'
            },
            {
                corporation: '天安',
                sum: '500万元',
                beginTime: '2018年-xxxxxxx年',
                responsiblePerson: '马丘陵',
                position: '市场经理'
            },
            {
                corporation: '天安',
                sum: '500万元',
                beginTime: '2018年-xxxxxxx年',
                responsiblePerson: '马丘陵',
                position: '市场经理'
            },
            {
                corporation: '天安',
                sum: '500万元',
                beginTime: '2018年-xxxxxxx年',
                responsiblePerson: '马丘陵',
                position: '市场经理'
            },
            {
                corporation: '天安',
                sum: '500万元',
                beginTime: '2018年-xxxxxxx年',
                responsiblePerson: '马丘陵',
                position: '市场经理'
            },
            {
                corporation: '天安',
                sum: '500万元',
                beginTime: '2018年-xxxxxxx年',
                responsiblePerson: '马丘陵',
                position: '市场经理'
            }]
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
       let liHeight = this.liRef.current.scrollHeight;
        if (this.state.shouldScroll) {
            if(this.timer){
                window.clearTimeout(this.timer);
            }
            this.timer = setTimeout(() => {
                this.setState((state)=>{
                    let {offset}=state;
                    if(this.ulRef.current.scrollHeight+offset<100){
                        return{
                            offset:0
                        }
                    }
                    return {
                        offset:offset-liHeight
                    }
                })
            }, 1000)
        }
    }
    componentWillUnmount() {
        window.clearTimeout(this.timer);
    }

    componentDidMount() {
        let rem=window.rem;
        let scrollHeight = this.ulRef.current.scrollHeight;
        if(scrollHeight>rem*9*.80){
            this.setState({
                shouldScroll:true
            })
        }
    }
    render() {
        let {headers} = this.props;
        let {data} = this.state;
        let len = 100 / headers.length + '%';
        return (
            <div className={'table'}>
                <div className={'table-header'}>
                    {headers.map(item => {
                        return <div key={item} style={{width: len}}>
                            {item === 'key' ? null : item}
                        </div>
                    })}
                </div>
                <div style={{'height':'85%',"overflow":'hidden'}}>
                    <ul ref={this.ulRef} className={'table-list'} style={{top: this.state.offset}}>{
                        data.map(item => {
                            let arr = [];
                            for (let key in item) {
                                if (key != 'key')
                                    arr.push(item[key]);
                            }
                            return (<li key={item.key} style={{display: "flex"}} ref={this.liRef}>
                                {arr.map(i => {
                                    return <div key={i} style={{width: len, color: 'white'}}>{i}</div>
                                })}
                            </li>)
                        })
                    }
                    </ul>
                </div>

            </div>
        )
    }
}

export default Table