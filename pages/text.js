import React from 'react'
import { DatePicker } from 'antd'
import 'antd/dist/antd.css'

import '../css/text.css'
export default class Text extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            date: new Date(),
            num: 0,
            ok: true
        }
    }
    componentDidMount () {
        let $this = this;
        this.timeout = setInterval(function () {
            $this.setState({num: $this.state.num += 1, date: new Date()})
            console.log($this.state.num)
        }, 1000)
    }

    componentWillUnmount () {
        this.timeout && clearTimeout(this.timeout)
    }
    click () {
        this.setState({ok: !this.state.ok})
    }
    render () {
        return (
            <div>
              <div>
                num = {this.state.num}
                <br />
                ok = {this.state.ok ? 'true' : 'false'}
                <br />
                <button onClick={this.click.bind(this)}>
                  <span>点击</span>
                </button>
                <DatePicker />
              </div>
              <h1 className='time'>北京时间 = {this.state.date.toLocaleTimeString()}</h1>
                <img src={require('../imgs/about_us_img.jpg')} alt=""/>
            </div>
        )
    }
}
