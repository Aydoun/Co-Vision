import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {BackTop, Layout, Icon, Popover, Button} from 'antd';
import Header from 'components/Header';
import Footer from 'components/Footer';
import SideBarContent from 'components/SideBar';
//import DynamicMenu from 'components/DynamicMenu';
//import InitialMenu from './menuItems';
//import { changeMenuItems } from 'actions/appAction';
import './index.css';

const { Content, Sider } = Layout;

class App extends React.Component {
    constructor(props){
       super(props);
    }

    render(){
      const { menuContent } = this.props;
      const text = <span>Title</span>;

      return (
        <Layout>
          <BackTop />
          <Header />
          <Layout >
            <Sider width={200} style={{ background: '#fff' }}>
                <SideBarContent />
            </Sider>
            <Layout style={{ padding: '0px 8px 0px 70px' }}>
              <Content style={{position : 'relative', background:'#fff', padding : 24, margin : 0, height : '100%'}}>
                  {this.props.children}
              </Content>
            </Layout>
          </Layout>
        </Layout>
    );
    }
}

App.propTypes = {
  children: React.PropTypes.node,
};

function mapDispatchToProps(dispatch){
  return bindActionCreators({} , dispatch)
}

function mapStateToProps(state) {
  console.log(state , 'App State');
  return {
    menuContent : state.app.menuContent
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
