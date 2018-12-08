import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import '../../css/router.scss'
import AsyncLoader from '../../pages/AsyncLoader.js'

import Top from '../../component/top.js'
import LeftMenu from '../../component/leftMenu.js'
import Home from '../../component/home.js'
import About from '../../component/about.js'
import Topics from '../../component/topics.js'
export default class App extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            collapsed:false,
            center_className:"router-center-open clearfix"
        }
    }
    toggleCollapsed_menu(collapsed){   // leftMenu  回调 菜单状态
        this.setState(
            {
                collapsed:collapsed,
                center_className:collapsed ? "router-center-close clearfix" : "router-center-open clearfix"
            }
        )
    }
    render () {
        return (
            <div>
                <Router>
                    <div>
                        <Top collapsed={this.state.collapsed}/>
                        <div>
                            <div className="router-leftMenu clearfix">
                                <LeftMenu
                                    toggleCollapsed_menu={this.toggleCollapsed_menu.bind(this)}
                                />
                            </div>
                            <div className={this.state.center_className}>
                                <div>
                                    <Route exact path='/' component={Home} />
                                    <Route exact path='/about' component={About} />
                                    <Route exact path='/topics' component={Topics} />
                                    <Route
                                        exact
                                        path='/text'
                                        render={() => <AsyncLoader path={'./text.js'} />}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </Router>
            </div>

        )
    }
}
