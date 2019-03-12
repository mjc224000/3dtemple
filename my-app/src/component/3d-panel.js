import React, {Component} from 'react';
import './3d-panel.css';
class  D3Panel extends Component{
    componentDidMount() {
        let amulet = document.querySelectorAll('.amulet-rotate');
        let number=this.refs['number'];
        let length = amulet.length;
        for (let i = 0; i < length; i++) {
            amulet[i].style = `transform:rotate(${360 * i / length}deg) translateY(220px) `
        }
        let index = 0;
        let lightens = 0;
        let num = 0;
        function lightenBorder() {
            let current = index;
            amulet[current % length].classList.toggle('lighten');
            if (index % length == 0) {
                num++;
                let t = (num % 4) + 1;
                number.innerText = t.toString();
            }
            if (lightens < 5) {
                lightens++;
            } else {
                current -= 5;

                amulet[current % length].classList.toggle('lighten');
            }
            if (index > 10000) {
                index = 0;
            }
            index++;
            setTimeout(function () {
                requestAnimationFrame(lightenBorder)
            }, 1000 / 12)
        }
    }

    render(){
        return(<div className="horizontal-rotateX">
            <div className="horizontal-rotate">
                <div className="perpendicular-rotateX">
                    <div className="perpendicular-translate">
                        <ul>
                            <li>
                                <div className="card">
                                    <div className="left">
                                        <div className="title">
                                            第一个card
                                        </div>
                                        <div className="content">
                                            他最核心的是提供了 `app.model` 方法，用于把 reducer, initialState, action
                                        </div>
                                    </div>
                                    <div className="right">
                                        01
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="card">
                                    <div className="left">
                                        <div className="title">
                                            第一个card
                                        </div>
                                        <div className="content">
                                            他最核心的是提供了 `app.model` 方法，用于把 reducer, initialState, action
                                        </div>
                                    </div>
                                    <div className="right">
                                        02
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="card">
                                    <div className="left">
                                        <div className="title">
                                            第一个card
                                        </div>
                                        <div className="content">
                                            他最核心的是提供了 `app.model` 方法，用于把 reducer, initialState, action
                                        </div>
                                    </div>
                                    <div className="right">
                                        03
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="card">
                                    <div className="left">
                                        <div className="title">
                                            第一个card
                                        </div>
                                        <div className="content">
                                            他最核心的是提供了 `app.model` 方法，用于把 reducer, initialState, action
                                        </div>
                                    </div>
                                    <div className="right">
                                        04
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="inner-panel">
                <ul id="amulet" ref={'amulet'}>
                    <li className="amulet-rotate"></li>
                    <li className="amulet-rotate"></li>
                    <li className="amulet-rotate"></li>
                    <li className="amulet-rotate"></li>
                    <li className="amulet-rotate"></li>
                    <li className="amulet-rotate"></li>
                    <li className="amulet-rotate"></li>
                    <li className="amulet-rotate"></li>
                    <li className="amulet-rotate"></li>
                    <li className="amulet-rotate"></li>
                    <li className="amulet-rotate"></li>
                    <li className="amulet-rotate"></li>
                    <li className="amulet-rotate"></li>
                    <li className="amulet-rotate"></li>
                    <li className="amulet-rotate"></li>
                    <li className="amulet-rotate"></li>
                    <li className="amulet-rotate"></li>
                    <li className="amulet-rotate"></li>
                    <li className="amulet-rotate"></li>
                    <li className="amulet-rotate"></li>
                    <li className="amulet-rotate"></li>
                    <li className="amulet-rotate"></li>
                    <li className="amulet-rotate"></li>
                    <li className="amulet-rotate"></li>
                    <li className="amulet-rotate"></li>
                    <li className="amulet-rotate"></li>
                    <li className="amulet-rotate"></li>
                    <li className="amulet-rotate"></li>
                    <li className="amulet-rotate"></li>
                    <li className="amulet-rotate"></li>
                    <li className="amulet-rotate"></li>
                </ul>
            </div>
            <div id="number" className="perpendicular-number" ref={'number'}>
                4
            </div>
            <div className="scale">
                <div className="scale-bg">

                </div>
            </div>
            <div className="floating">
                <div className="crescent">

                </div>
            </div>
            <div className="scale-wrap">
                <div className="scale-ball">
                    <div className="ball"></div>
                    <div className="ball"></div>
                    <div className="ball"></div>
                    <div className="ball"></div>
                </div>

            </div>
        </div>)
    }
}
export default D3Panel