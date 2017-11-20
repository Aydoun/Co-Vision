import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Card, Tag, Button, Spin} from 'antd';
import VisionCard from 'components/VisionCard';
import './index.css';
import { formatDate } from 'utils';
import { prepareListing } from 'actions/visionAction';

class VisionList extends Component {
  static propTypes = {
    loading: PropTypes.bool
  }

  static defaultProps = {
    loading: false
  }

  constructor(props){
      super(props);
  }

  componentDidMount(){
      this.props.prepareListing({
       _id : localStorage.userId
      });
  }

  render() {
    const {visionList , loading} = this.props;

    return (
      <div>
          <Spin spinning={loading}>
            {
              visionList.map((elem, i) => (
                <VisionCard
                   key={i}
                   name={elem.title}
                   description={elem.description}
                   status={elem.status}
                   visionId={elem._id}
                   updatedAt={formatDate(elem.updatedAt)}
                   onConfirm={() => console.log(elem._id)}
                />
              ))
            }
          </Spin>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({prepareListing} , dispatch)
}

function mapStateToProps(state) {
  return {
      visionList : state.vision.visionList,
      loading : state.vision.loading,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VisionList);
