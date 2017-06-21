/**
 *
 * Button.react.js
 *
 * A common button, if you pass it a prop "route" it'll render a link to a react-router route
 * otherwise it'll render a link with an onclick
 */

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
                <li>
                    <Link to="/vision-TimeLine">Vision TimeLine</Link>
                </li>
                <li>
                    <Link to="/">Home</Link>
                </li>
            </ul>
        )
    }


}

export default SideBar;
