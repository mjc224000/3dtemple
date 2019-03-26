import React, {Component} from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';

class Line extends Component {

    constructor(props){
        super(props);
        this.lineChart=undefined;
    }
    componentDidMount() {
        let line = this.refs['line'];
        console.log(line);
        let option = {
            xAxis: {
                type: 'category',
                boundaryGap: true,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'rgba(0,255,255,1)' // 0% 处的颜色
                        }, {
                            offset: 1, color: 'rgba(0,255,255,0)' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }

                }
            }]
        };
          this.lineChart = echarts.init(line);
        this.lineChart.setOption(option);
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        this.lineChart.resize();
        return true;
    }

    render() {
        let rem = window.rem;
        let width = 12 * rem;
        let height = 9 * rem;
        return (
            <div   style={{width,height}}    ref={'line'}>

            </div>
        );
    }
}

export default Line;