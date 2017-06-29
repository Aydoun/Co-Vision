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
      visible : false
    }
  }

  componentWillMount(){
    const newContent = this.props.content.map((item , index) => {
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
        <div className="dynamic-menu__content" onClick={() => this.setState({visible : false})}>
          <Icon type="close-circle-o" className="dynamic-menu__close right"/>
          {newContent}
        </div>
      )
    });
  }

  render() {
    const { content, visible } = this.state;
    return (
      <Popover
        className="dynamic-menu__wrapper"
        placement="rightTop"
        visible={visible}
        onVisibleChange={(visible) => this.setState({visible})}
        title={null}
        content={content}
        trigger="click"
      >
        <Icon type="plus-circle-o" className="dynamic-menu__styles" />
      </Popover>
    );
  }
}

DynamicMenu.propTypes = {
  content: PropTypes.array.isRequired,
};

export default DynamicMenu;
