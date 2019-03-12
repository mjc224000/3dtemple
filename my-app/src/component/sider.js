import React, {Component} from 'react';
import {Layout, Menu, Icon} from 'antd';
import {Link} from "react-router-dom";
const {Sider, Content} = Layout;
class SiderContainer extends Component{
    render(){
        return(  <Sider
            trigger={null}
            collapsible
            {...this.props}
        >
            <div className="logo"/>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                    <Link to={'/'}>
                        <Icon type="user"/>
                        <span>首页</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to={'/cockpit'}>
                        <Icon type="video-camera"/>
                        <span>nav 2</span>
                    </Link>

                </Menu.Item>
                <Menu.Item key="3">
                    <Icon type="upload"/>
                    <span>nav 3</span>
                </Menu.Item>
            </Menu>
        </Sider>)
    }
}
export default SiderContainer;