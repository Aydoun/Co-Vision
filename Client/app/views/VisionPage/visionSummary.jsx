import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Timeline, Card, Tag, Spin, List } from 'antd';
import { preHistory } from 'actions/vision';
import { formatDate } from 'utils';

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

class VisionHistory extends React.Component {
  componentDidMount() {
      // const params = {
      //    id : this.props.routeParams.id
      // };
      // this.props.preHistory(params);
  }

  render() {
    // const { historyList, loading } = this.props;
    console.log(this.props, 'props');
    return (
      <div />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ }, dispatch);
}

function mapStateToProps(state) {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VisionHistory);
