import React, {Component} from 'react';
import {Layout, Menu, Icon} from 'antd';
import { Route, Switch } from "react-router-dom";
import CockPitPage from './cockpit-page';
import Header from './header/header';
import Sider from './sider';
import legend from 'echarts/lib/component/legend';
import HomePage from './home-page';
const {Content} = Layout;

class Main extends React.Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        return (
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                />
                <Layout>
                    <Header onToggle={() => this.toggle()} isCollapsed={this.state.collapsed}/>

                  <Switch>
                      <Route exact path={'/'} component={HomePage}/>
                      <Route path={'/cockpit'} component={CockPitPage}/>
                  </Switch>

                </Layout>
            </Layout>
        );
    }
}

export default Main