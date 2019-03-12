import React, {Component} from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';

class Line extends Component {
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
                areaStyle: {}
            }]
        };
        let lineChart = echarts.init(line);
        lineChart.setOption(option);
    }

    render() {
        let rem = window.rem;
        let width = 12.5 * rem;
        let height = 9 * rem;
        return (
            <div style={{width: width, height:height, position: "relative"}} ref={'line'}>

            </div>
        );
    }
}

export default Line;