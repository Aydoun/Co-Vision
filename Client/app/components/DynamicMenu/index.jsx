import React , {PropTypes} from 'react';
import { Link } from 'react-router';
import {Icon , Button , Popover} from 'antd';
import cookie from 'js-cookie';
import './index.css';

class DynamicMenu extends React.PureComponent {
  constructor(props){
    super(props);
    this.state = {
      content : null,
      visible : false,
      iconType : 'plus-circle-o'
    }
  }

  componentWillReceiveProps(nextProps){
    const newContent = nextProps.content.map((item , index) => {
        switch(item.type) {
            case 'link':
              return <Link key={index} to={item.href}><Button>{item.text}</Button></Link>
              break;
            case 'action':
              return <Button key={index} onClick={item.onClick}>{item.text}</Button>
              break;
            default:
              return null;
        }
    });

    this.setState({
      content : (
        <div className="dynamic-menu__content" onClick={() => this.setState({visible : false , iconType : 'plus-circle-o'})}>
          <Icon type="close-circle-o" className="dynamic-menu__close right"/>
          {newContent}
        </div>
      )
    });
  }

  handleMenuVisibility(visible) {
      const {iconType} = this.state;
      this.setState({
        visible,
        iconType : visible ? 'close-circle-o' : 'plus-circle-o'
      })
  }

  render() {
    const { content, visible, iconType } = this.state;
    return (
      <Popover
        className="dynamic-menu__wrapper"
        placement="rightTop"
        visible={visible}
        onVisibleChange={this.handleMenuVisibility.bind(this)}
        title={null}
        content={content}
        trigger="click"
      >
        <Icon type={iconType} className="dynamic-menu__styles" />
      </Popover>
    );
  }
}

DynamicMenu.propTypes = {
  content: PropTypes.array.isRequired,
};

export default DynamicMenu;
