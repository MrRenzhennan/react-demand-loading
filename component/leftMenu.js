import React from 'react'
import {
    Link
} from 'react-router-dom'
import { Procider } from 'react-redux'
// import store from '../src/model'
import '../css/leftMenu.scss'
import { Menu, Icon, Button } from 'antd';
const SubMenu = Menu.SubMenu;

export default class LeftMenu extends React.Component {
    state = {
        collapsed: false,
        openKeys: ['sub1'],
    };
    rootSubmenuKeys = ['sub1', 'sub2', 'sub3'];
    toggleCollapsed = () => {
        let $this = this;
        this.setState({
            collapsed: !this.state.collapsed,
        },function(){
            $this.props.toggleCollapsed_menu($this.state.collapsed)
        });

    };
    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    }
// {/*<Procider store={store}>*/}
// {/**/}
// {/*</Procider>*/}
    render(){
        return (

            <div className="leftMenu" style={{width:this.state.collapsed ? 80 : ""}}>
                <Button type="primary"
                        className="change_button"
                        onClick={this.toggleCollapsed}
                        style={{width:this.state.collapsed ? 80 : ""}}
                >
                    <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                </Button>
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                    // onOpenChange={this.onOpenChange}
                    // openKeys={this.state.openKeys}
                >
                    <Menu.Item key="1">
                        <Link to='/'>
                            <Icon type="pie-chart" />
                            <span>主页</span>
                        </Link>
                    </Menu.Item>

                    <SubMenu key="sub1" title={<span><Icon type="mail" /><span>云服务</span></span>}>
                        <Menu.Item key="2">
                            <Link to='/text'>
                                专属链账本
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            App内容防护
                        </Menu.Item>
                    </SubMenu>

                    <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>账户管理</span></span>}>
                        <Menu.Item key="4">基本资料</Menu.Item>
                        <Menu.Item key="5">实名认证</Menu.Item>
                        <Menu.Item key="6">安全设置</Menu.Item>

                    </SubMenu>

                    <SubMenu key="sub3" title={<span><Icon type="appstore" /><span>费用中心</span></span>}>
                        <Menu.Item key="7">现金充值</Menu.Item>
                        <Menu.Item key="8">收支明细</Menu.Item>
                        <Menu.Item key="9">消费明细</Menu.Item>
                        <Menu.Item key="10">订单管理</Menu.Item>
                        <SubMenu key="sub4" title={<span>发票管理</span>}>
                            <Menu.Item key="11">发票索取</Menu.Item>
                            <Menu.Item key="12">发票列表</Menu.Item>
                            <Menu.Item key="13">发票信息管理</Menu.Item>
                            <Menu.Item key="14">发票寄送地址管理</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub5" title={<span>合同管理</span>}>
                            <Menu.Item key="15">合同申请</Menu.Item>
                            <Menu.Item key="16">合同管理</Menu.Item>
                        </SubMenu>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}


