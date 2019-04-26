import React, {Component} from 'react';
import PropTypes from 'prop-types';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/tree';
export class Tree extends Component {
    static propTypes = {
        data: PropTypes.array
    }

    constructor(props) {
        super(props);
        this.treeRef = React.createRef();
        this.treeChart = null;
    }

    componentDidMount() {
        this.treeChart = this.treeRef.current && echarts.init(this.treeRef.current);

    }
    componentWillUnmount() {
        this.treeChart.dispose();
    }

    render() {
        let data = this.props.data || [];
        this.treeChart && this.treeChart.setOption({
            tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove'
            },
            series: [
                {
                    type: 'tree',

                    data: [data],
                    initialTreeDepth: 3,
                    top: '1%',
                    left: '7%',
                    bottom: '1%',
                    right: '20%',

                    symbolSize: 17,

                    label: {
                        normal: {
                            position: 'left',
                            verticalAlign: 'middle',
                            align: 'right',
                            fontSize: 19
                        }
                    },

                    leaves: {
                        label: {
                            normal: {
                                position: 'right',
                                verticalAlign: 'middle',
                                align: 'left'
                            }
                        }
                    },

                    expandAndCollapse: true,
                    animationDuration: 550,
                    animationDurationUpdate: 750
                }
            ]
        });
        return (<div style={{width: '100%', height: '100%'}} ref={this.treeRef}>

        </div>)
    }
}