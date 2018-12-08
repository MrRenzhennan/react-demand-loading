import React from 'react'

// import ReduxDemo from './reduxDemo'
import '../css/home.css'
export default class Home extends React.Component {
    constructor (props) {
        super(props);
        this.state = {}
    }

    render () {
        return (
            <div>
              <h1 className="home">Home</h1>
              {/*<ReduxDemo />*/}
                <img src={ require('../imgs/about_us_img.jpg')} alt=""/>
            </div>
        )
    }
}
