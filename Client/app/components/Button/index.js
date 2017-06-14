/**
 *
 * Button.react.js
 *
 * A common button, if you pass it a prop "route" it'll render a link to a react-router route
 * otherwise it'll render a link with an onclick
 */

import React, { PropTypes, Children } from 'react';
import { Link } from 'react-router';

import A from './A';
import Wrapper from './Wrapper';

function Button(props) {
  // Render an anchor tag
  // let button = (
  //   <A href={props.href} onClick={props.onClick}>
  //
  //   </A>
  // );
  const styles = Object.assign({} , props.style , {

  });

  return (
      <Link to={props.href} onClick={props.onClick}>
          {Children.toArray(props.children)}
      </Link>
  );
}

Button.propTypes = {
  handleRoute: PropTypes.func,
  href: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default Button;
