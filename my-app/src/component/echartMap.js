import React, {Component} from 'react';
import 'echarts/map/js/china';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import {Consumer} from "./Main";
import PropTypes from 'prop-types';
import fetch from '../fetch'
import {api} from "../api";
class EchartMap extends Component {
    static propTypes = {geoCoordMap: PropTypes.object}

    constructor(props) {
        super(props);
        this.mapRef = React.createRef();
        this.lineRef = React.createRef();
    }


    convert = (routineData, geoData) => {
        let ret = [];
        for (let key in routineData) {
            let fromName = key;
            let fromCoord = geoData[key];
            let fromArr = routineData[fromName];
            fromArr.forEach(function (item) {
                let toName = item['dest'];
                let toCoord = geoData[toName];
                ret.push({
                    fromName,
                    toName,
                    coords: [fromCoord, toCoord]
                })
            })
        }
        return ret
    }

    async componentDidMount() {

        let message = await fetch.get(api.geo_coor);
        let rotine = await fetch.get(api.geo_rotine);
        rotine = rotine.data;
        let geoCoordMap = message.data;
        var color = ['#a6c84c', '#ffa022', '#ff1234'];
        var series = [];
        let i = 0;
        for (let key in rotine) {
            series.push({
                    name: key + ' Top10',
                    type: 'lines',
                    zlevel: 1,
                    effect: {
                        show: true,
                        period: 4,
                        trailLength: 0.7,
                        color: '#fff',
                        symbolSize: 3
                    },
                    lineStyle: {
                        normal: {
                            color: color[i],
                            width: 0,
                            curveness: 0.2
                        }
                    },
                    data: this.convert(rotine, geoCoordMap)
                },
                {
                    name: key + ' Top10',
                    type: 'lines',
                    zlevel: 2,
                    symbol: ['none', 'arrow'],
                    symbolSize: 10,
                    effect: {
                        show: true,
                        period: 6,
                        trailLength: 0,
                        symbol: "arrow",
                        symbolSize: 8
                    },
                    lineStyle: {
                        normal: {
                            color: color[i],
                            width: 1,
                            opacity: 0.6,
                            curveness: 0.2
                        }
                    },
                    data: this.convert(rotine, geoCoordMap)
                },
                {
                    name: key + ' Top10',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    zlevel: 2,
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            formatter: '{b}'
                        }
                    },
                    symbolSize: function (val) {
                        //  console.log(val,'symbol size')
                        return val[2] / 8;
                    },
                    itemStyle: {
                        normal: {
                            color: color[i]
                        }
                    },
                    data: rotine[key].map(function (dataItem) {

                        return {
                            name: dataItem['dest'],
                            value: geoCoordMap && geoCoordMap[dataItem['dest']].concat([dataItem.value]) || []
                        };
                    })
                });
            i++;
        }
        let option = {
            backgroundColor: 'transparent',

            title: {
                text: '模拟迁徙',
                subtext: '数据纯属虚构',
                left: 'center',
                top: '60',
                textStyle: {
                    color: '#fff'
                }
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                top: 'bottom',
                left: 'right',
                data: ['北京 Top10', '上海 Top10', '广州 Top10'],
                textStyle: {
                    color: '#fff'
                },
                selectedMode: 'false'
            },
            geo: {
                map: 'china',
                label: {
                    emphasis: {
                        show: true
                    }
                },
                zoom: 1.2,
                roam: false,
                itemStyle: {
                    normal: {
                        areaColor: '#664411',
                        borderColor: '#aabbcc'
                    },
                    emphasis: {
                        areaColor: '#aaaaaa'
                    }
                }
            },
            series: series
        };
        if (this.mapRef.current) {
            this.map = echarts.init(this.mapRef.current);
            this.map.setOption(option, false);
        }
        this.initLine(rotine,color);
    }

    componentWillUnmount() {
        this.map && this.map.dispose();
    }

    initLine(rotine,color) {
        let xData = [];
        let yData = []
        for (let key in rotine) {
            xData.push(key)
            let value = 0;
            rotine[key].forEach(function (item) {
                value += item['value'];
            })
            yData.push(value);
        }
        let i=0;
        let option = {
            xAxis: {
                type: 'category',
                boundaryGap: true,
                data: xData
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: yData,
                type: 'bar',
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

                },
                itemStyle:{
                    color:function () {
                        return color[i++];
                    }
                }
            }]
        };
        let line = this.lineRef.current && echarts.init(this.lineRef.current);
        line && line.setOption(option);
    }

    render() {
        return (
            <Consumer>
                {
                    ({contentWidth}) => {
                        let w = contentWidth * 0.33;
                        return (
                            <>
                                <div style={{position: 'relative', width: w, height: "60%",}}
                                     ref={this.mapRef}>
                                </div>
                                <div
                                    style={{position: 'relative', width: w, height: '40%', display: 'flex'}}>
                                    <div ref={this.lineRef} style={{flex: '0 0 50%'}}></div>
                                    <div style={{}}></div>
                                </div>
                            </>
                        )
                    }
                }
            </Consumer>

        )
    }
}

export default EchartMap