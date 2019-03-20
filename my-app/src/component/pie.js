import React, {Component} from 'react';
import echarts from 'echarts/lib/echarts';

import 'echarts/lib/chart/pie';

class Pie extends Component {

    componentDidMount() {
        let pie = this.refs['pie'];
        let option = {

            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },

            legend: {
                orient: 'vertical',
                x: 15,
                y: 20,
                data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],

            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: true,
                            position: 'left',
                            orient: 'vertical'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: [
                        {value: 335, name: '直接访问'},
                        {value: 310, name: '邮件营销'},
                        {value: 234, name: '联盟广告'},
                        {value: 135, name: '视频广告'},
                        {value: 1548, name: '搜索引擎'}
                    ]
                }
            ]
        };
        let pieChart = echarts.init(pie);
        pieChart.setOption(option);

    }

    render() {
        let rem = window.rem;
        let width = 12.5 * rem;
        let height = 9 * rem;

        return (
            <div style={{width: '90%', height: '90%',margin:'auto',position:'relative'}} ref={'box'}>
                <div style={{width: width, height: height, position: "relative"}} ref={'pie'}>

                </div>
            </div>
        );
    }
}

export default Pie;