import React, {Component} from 'react';
import {Layout, Icon} from 'antd';
import './top-bar.css';
import Timer from './timer'

const {Header} = Layout;

class HeaderContainer extends Component {

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    static getTime = () => {
        let Format = function (fmt) {
            var o = {
                "M+": this.getMonth() + 1, //月份
                "d+": this.getDate(), //日
                "H+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }

        return Format("yyyy-MM-dd HH:mm:ss");
    }

    render() {
        return (
            <Header style={{background: '#fff', padding: 0}}>
                <div className={'nav-header'}>
                    <Icon
                        className="trigger header-left"
                        type={this.props.isCollapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.props.onToggle}
                    />
                    <div className={'title-wrap'}>
                        <Timer/>
                        <div className={'nav-title'}>
                            <div className={'skew-angle left'}>
                                <ul className={"blink-block"}>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                            </div>
                            <div className={'title-text'}>投资管理系统</div>
                            <div className={'skew-angle'}>
                                <ul className={"blink-block right"}>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </Header>

        )
    }
}

export default HeaderContainer;