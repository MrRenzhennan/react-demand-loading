import React from 'react'
import '../css/top.scss'
export default class Top extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        return(
            <div>
                <div className="top clearfix">
                    <div className="top-title" style={{width:this.props.collapsed ? 80 : ''}}>
                        蜂巢链
                    </div>
                    <div className="top-right clearfix">
                        <div className="t1-people">
                            ren
                            <div className="people-hover">
                                退出
                            </div>
                        </div>
                        <div className="t1-message">
                            消息
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
