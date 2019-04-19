import React, {Component} from 'react';
import 'echarts/map/js/china';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import {Consumer} from "./Main";
import PropTypes from 'prop-types';
import fetch from '../fetch'
import {api} from "../api";
import axios from "axios";

class EchartMap extends Component {
    static propTypes = {geoCoordMap: PropTypes.object}

    constructor(props) {
        super(props);
        this.mapRef = React.createRef();
        this.lineRef = React.createRef();
    }

    convertData = (data, geoCoordMap) => {

        var res = [];

        for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            var fromCoord = geoCoordMap[dataItem[0].name];
            var toCoord = geoCoordMap[dataItem[1].name];
            if (fromCoord && toCoord) {
                res.push({
                    fromName: dataItem[0].name,
                    toName: dataItem[1].name,
                    coords: [fromCoord, toCoord]
                });
            }
        }
        return res;
    }
    convert = (routineData, geoData) => {
        let ret = [];
        console.log(routineData,geoData)
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
        rotine=rotine.data;

        let geoCoordMap = message.data;
        var BJData = [
            [{name: '北京'}, {name: '上海', value: 95}],
            [{name: '北京'}, {name: '广州', value: 90}],
            [{name: '北京'}, {name: '大连', value: 80}],
            [{name: '北京'}, {name: '南宁', value: 70}],
            [{name: '北京'}, {name: '南昌', value: 60}],
            [{name: '北京'}, {name: '拉萨', value: 50}],
            [{name: '北京'}, {name: '长春', value: 40}],
            [{name: '北京'}, {name: '包头', value: 30}],
            [{name: '北京'}, {name: '重庆', value: 20}],
            [{name: '北京'}, {name: '常州', value: 10}]
        ];

        var SHData = [
            [{name: '上海'}, {name: '包头', value: 95}],
            [{name: '上海'}, {name: '昆明', value: 90}],
            [{name: '上海'}, {name: '广州', value: 80}],
            [{name: '上海'}, {name: '郑州', value: 70}],
            [{name: '上海'}, {name: '长春', value: 60}],
            [{name: '上海'}, {name: '重庆', value: 50}],
            [{name: '上海'}, {name: '长沙', value: 40}],
            [{name: '上海'}, {name: '北京', value: 30}],
            [{name: '上海'}, {name: '丹东', value: 20}],
            [{name: '上海'}, {name: '大连', value: 10}]
        ];

        var GZData = [
            [{name: '广州'}, {name: '福州', value: 95}],
            [{name: '广州'}, {name: '太原', value: 90}],
            [{name: '广州'}, {name: '长春', value: 80}],
            [{name: '广州'}, {name: '重庆', value: 70}],
            [{name: '广州'}, {name: '西安', value: 60}],
            [{name: '广州'}, {name: '成都', value: 50}],
            [{name: '广州'}, {name: '常州', value: 40}],
            [{name: '广州'}, {name: '北京', value: 30}],
            [{name: '广州'}, {name: '北海', value: 20}],
            [{name: '广州'}, {name: '海口', value: 10}]
        ];

        var color = ['#a6c84c', '#ffa022', '#ff1234'];
        var series = [];

        [['北京', BJData], ['上海', SHData], ['广州', GZData]].forEach(function (item, i) {
             series.push( {
                    name: item[0] + ' Top10',
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
                    data: this.convert(rotine,geoCoordMap)
                },
                {
                    name: item[0] + ' Top10',
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
                    name: item[0] + ' Top10',
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
                    data: item[1].map(function (dataItem) {

                        return {
                            name: dataItem[1].name,
                            value: geoCoordMap && geoCoordMap[dataItem[1].name].concat([dataItem[1].value]) || []
                        };
                    })
                });
        }.bind(this));
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
        /* this.initLine();*/
    }

    componentWillUnmount() {
        this.map && this.map.dispose();
    }

    initLine() {
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

                }
            }]
        };
        let line = echarts.init(this.lineRef.current);
        line.setOption(option);
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