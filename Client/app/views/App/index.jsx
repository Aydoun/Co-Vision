import React from 'react';

import Header from 'components/Header';
import Footer from 'components/Footer';
import SideBar from 'components/SideBar';
import './index.css';
import 'assets/public/index.css';

class App extends React.Component {
    constructor(props){
       super(props);
    }

    render(){
        return (
          <div >
            <Header />
            <div className="app-general__wrapper">
              <div className="side-bar__wrapper">
                  <SideBar />
              </div>
              <div className="main-content__wrapper">
                  {React.Children.toArray(this.props.children)}
              </div>
            </div>
            <div style={{clear:'both'}}></div>
            <Footer />
          </div>
        )
    }
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;
