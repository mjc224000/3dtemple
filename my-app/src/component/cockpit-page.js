import React, {Component} from 'react';
import {Layout} from "antd";
import Presentation from "./presentation/presentation";
import Line from "./line";
const {Content}=Layout;
class CockpitPage extends Component{

    render(){
        return( <Content>
              <div className={'row'}>
                  <div className={'column-3'}>
                      <Presentation>
                          <Line/>
                      </Presentation>
                  </div>
              </div>
            <div className={'row'}></div>
            <div className={'row'}></div>
        </Content>)
    }
}
export default CockpitPage;