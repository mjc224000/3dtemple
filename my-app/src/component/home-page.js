import React, {Component} from 'react';
import {Layout, Menu, Icon} from 'antd';
import Presentation from './presentation/presentation';
import Line from './line';
import TextAnimation from './text-animation';
import D3Panel from './3d-panel';
import Radar from './radar';
import Funel from './funnel';
import Bar from './bar';
import Pie from './pie';
import Border from './border';
import Table from './table';

const {Content} = Layout;

class HomePage extends Component {
    render() {
        return (
            <Content style={{
                margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
            }}
            >
                <div className={'content'}>
                    <div className={'row'}>
                        <div className={'column-3'}>
                            <Presentation>
                                <Line/>
                            </Presentation>
                        </div>
                        <div className={'column-6'}>
                            <TextAnimation/>
                            {/*    <D3Panel/>*/}
                        </div>
                        <div className={'column-3'}>
                            <Radar/>
                        </div>
                    </div>
                    <div className={'row'}>
                        <div className="column-3">
                            <Presentation>
                                <Funel/>
                            </Presentation>
                        </div>
                        <div className={'column-6'}></div>
                        <div className={'column-3'}>
                            <Presentation>
                                <Bar/>
                            </Presentation>
                        </div>
                    </div>
                    <div className={'row'}>
                        <div className={'column-3'}>
                            <Border>
                                <Table/>
                            </Border>

                        </div>
                        <div className={'column-3'}>
                            <Presentation>
                                <Pie/>
                            </Presentation>
                        </div>
                        <div className={'column-3'}>
                            <Presentation>
                                <Pie/>
                            </Presentation>
                        </div>
                    </div>
                </div>
            </Content>
        )
    }
}

export default HomePage;