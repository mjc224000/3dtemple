import React, {Component} from 'react';

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

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 0
        }
        this.timer = null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.timer = setTimeout(() => this.setState({
            time: Format.call(new Date(),"yyyy-MM-dd HH:mm:ss")
        }), 1000)
    }

    componentWillUnmount() {
        window.clearTimeout(this.timer);
    }

    render() {
        return <span style={{
            position:"absolute",
            color:'white',
            fontSize:'0.5rem'
        }}>
            {this.state.time}
        </span>
    }
}

export default Timer