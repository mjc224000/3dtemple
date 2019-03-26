import React, {Component} from 'react';
import {Layout, Menu, Icon} from 'antd';
import {Route, Switch} from "react-router-dom";
import CockPitPage from './cockpit-page';
import Header from './header/header';
import Sider from './sider';
import legend from 'echarts/lib/component/legend';
import HomePage from './home-page';

const {Provider, Consumer} = React.createContext('defaultValue')
export {Consumer}

class Main extends React.Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(document.body.scrollWidth, 'scrollWidth');
    }

    render() {
        return (
            <Layout className={'main'}>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                />
                <Layout className={'content'}>
                    <Header onToggle={() => this.toggle()} isCollapsed={this.state.collapsed}/>
                    <Provider
                        value={{contentWidth: this.state.collapsed ? document.body.scrollWidth - 80 : document.body.scrollWidth - 200}}>
                        <Switch>
                            <Route exact path={'/'} component={() => <HomePage/>}/>
                            <Route path={'/cockpit'} component={CockPitPage}/>
                        </Switch>
                    </Provider>
                </Layout>
            </Layout>
        );
    }
}

export default Main
