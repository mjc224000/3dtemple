import React, {Component} from 'react';
import { Layout, Icon } from 'antd';
import './top-bar.css';
const { Header  } = Layout;
class HeaderContainer extends Component {

    render() {
        return (
            <Header  style={{ background: '#fff', padding: 0 }}>
             <div className={'nav-header'}>
                 <Icon
                     className="trigger header-left"
                     type={this.props.isCollapsed ? 'menu-unfold' : 'menu-fold'}
                     onClick={this.props.onToggle}
                 />
                 <div className={'title-wrap'}>
                     <div className={'nav-title'}>
                         <div className={'skew-angle left'}> <ul className={"blink-block"}>
                             <li></li>
                             <li></li>
                             <li></li></ul></div>
                         <div className={'title-text'}>投资管理系统</div>
                         <div className={'skew-angle'}>
                             <ul className={"blink-block right"}>
                                 <li></li>
                                 <li></li>
                                 <li></li></ul>
                         </div>
                     </div>
                 </div>
             </div>

            </Header>

        )
    }
}

export default HeaderContainer;