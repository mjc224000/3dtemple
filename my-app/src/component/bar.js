import React, {Component} from 'react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';

let option = {
    legend: {},
    tooltip: {},
    dataset: {
        source: [
            ['product', '2015', '2016', '2017'],
            ['Matcha Latte', 43.3, 85.8, 93.7],
            ['Milk Tea', 83.1, 73.4, 55.1],
            ['Cheese Cocoa', 86.4, 65.2, 82.5],
            ['Walnut Brownie', 72.4, 53.9, 39.1]
        ]
    },
    xAxis: {type: 'category'},
    yAxis: {},
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [
        {type: 'bar'},
        {type: 'bar'},
        {type: 'line'}
    ]
}

class Bar extends Component {
    componentDidMount() {
        let bar = this.refs['bar'];

        let barChart = echarts.init(bar);
        barChart.setOption(option);
    }

    render() {
        let rem = window.rem;
        let width = 12.5 * rem;
        let height = 9 * rem;
        return (<div style={{width, height}} ref={'bar'}>

        </div>)
    }
}

export default Bar;