/**
 *
 * Button.react.js
 *
 * A common button, if you pass it a prop "route" it'll render a link to a react-router route
 * otherwise it'll render a link with an onclick
 */

import React, { PropTypes, Children } from 'react';
import {Link} from 'react-router';

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
                    <Link to="/features">Time Line</Link>
                </li>
                <li>
                    <Link to="/">issues</Link>
                </li>
            </ul>
        )
    }


}

export default SideBar;
