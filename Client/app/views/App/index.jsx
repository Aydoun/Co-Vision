import React from 'react';
import { Link } from 'react-router';
import { Layout, Menu, Icon, Avatar, Popconfirm } from 'antd';
import MyHeader from 'components/Header';
import MyFooter from 'components/Footer';
import { logout } from 'utils';
import './index.css';

const { Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class App extends React.Component {
  state = {
    collapsed: false,
  };
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }
  render() {
    return (
      <div >
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
            className="app-sider-wrapper"
          >
            <div className="logo" >
              <Avatar src="http://tse3.mm.bing.net/th?id=OIP.ZotSj2OR21ya9ySgfb9zlgD6D6&w=173&h=168&c=7&qlt=90&o=4&pid=1.7" />
            </div>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1">
                <Link to="/app"><Icon type="home" />
                  <span>Home</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="global" />
                <span><Link to="/app/discover">Discover</Link></span>
              </Menu.Item>
              <SubMenu
                key="sub1"
                title={<span><Icon type="mail" /><span>Courrier</span></span>}
              >
                <Menu.Item key="3">
                  <span><Icon type="mail" />
                    <Link to="/app/invitation">Invitations</Link>
                  </span>
                </Menu.Item>
                <Menu.Item key="4">
                  <span><Icon type="message" />
                    <Link to="/app/mail">Messages</Link>
                  </span>
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={<span><Icon type="user" /><span>Me</span></span>}
              >
                <Menu.Item key="5"><span>
                  <Icon type="user" />
                  <Link to="/app/user/profile">Profile</Link>
                </span>
                </Menu.Item>
                <Menu.Item key="6">
                  <Popconfirm
                    title="Confirm Logout"
                    onConfirm={logout}
                    okText="Confirm"
                    cancelText="Cancel"
                  >
                    <Icon type="logout" />
                    <a href="#">Logout</a>
                  </Popconfirm>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key="7">
                <Icon type="customer-service" />
                <span><Link to="/app/feedback">FeedBack</Link></span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <MyHeader />
            <Content style={{ margin: '0 16px' }}>
              <div style={{ padding: 24, background: '#fff', margin: '16px 0', minHeight: '100%' }}>
                {this.props.children}
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              <MyFooter />
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default App;
