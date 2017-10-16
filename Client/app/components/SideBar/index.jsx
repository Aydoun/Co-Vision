import React, { PropTypes, Children } from 'react';
import { Link } from 'react-router';
import { Icon } from 'antd';
import './index.css';

class SideBar extends React.Component {

    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return (
            <div className="side-bar__wrapper" >
              <ul>
                  <li>
                      <Link to="/vision"><Icon type="link" /> Visions</Link>
                  </li>
                  <li>
                      <Link to="/discover"><Icon type="link" /> Discover</Link>
                  </li>
                  <li>
                      <Link to="/invitation"><Icon type="link" /> Invitations</Link>
                  </li>
              </ul>
            </div>

        )
    }
}

export default SideBar;
