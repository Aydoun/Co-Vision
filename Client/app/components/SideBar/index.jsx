import React, { PropTypes, Children } from 'react';
import {Link} from 'react-router';
import './index.css';

class SideBar extends React.Component {

    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return (
            <ul>
                <li>
                    <Link to="/vision">My Vision</Link>
                </li>
            </ul>
        )
    }
}

export default SideBar;
