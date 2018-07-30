import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { Layout, Menu, Icon, Avatar } from 'antd';
import MyFooter from 'components/Footer';
import Header from 'components/Header';
import Notificator from 'components/Notificator';
import Breadcrumb from 'components/Breadcrumb';
import './index.css';

const { Content, Footer, Sider } = Layout;

class App extends React.Component {
  render() {
    const { notificationData, notificationKey } = this.props;
    return (
      <div >
        <Layout style={{ height: 1000 }}>
          <Sider    
            collapsed={true}      
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
                <Link to="/app/mail"><Icon type="message" />
                  <span>Chat</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/app/discover"><Icon type="global" />
                  <span>Discover</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/app/feedback"><Icon type="customer-service" />
                  <span>FeedBack</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="5">
                  <Link to="/app/user/profile"><Icon type="user" />
                    <span>Me</span>
                  </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Notificator notificationData={notificationData} key={notificationKey} />
            <Header />
            
            <Content >
              <div style={{ padding: 24, background: '#fff' }}>
                <Breadcrumb appBreadCrumb={this.props.appBreadCrumb}/>
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ }, dispatch);
}

function mapStateToProps(state) {
  return {
    notificationData: state.app.notificationData,
    notificationKey: state.app.notificationKey,
    appBreadCrumb: state.app.appBreadCrumb,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
