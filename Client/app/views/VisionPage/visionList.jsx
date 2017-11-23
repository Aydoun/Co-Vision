import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Button, Spin, Modal, Icon } from 'antd';
import VisionCard from 'components/VisionCard';
import Empty from 'components/Empty';
import CreateForm from './createVision';
import { formatDate } from 'utils';
import { prepareListing } from 'actions/visionAction';
import './index.css';

class VisionList extends Component {
  static propTypes = {
    loading: PropTypes.bool
  }

  static defaultProps = {
    loading: false
  }

  constructor(props) {
      super(props);
      this.state = {
        visible: false
      };
  }

  componentDidMount() {
    this.props.prepareListing({
     _id : localStorage.userId
    });
  }

  cb() {
    this.props.prepareListing({
     _id : localStorage.userId
    });
  }

  render() {
    const { visionList, loading } = this.props;
    const { visible } = this.state;
    const AddModal = (
      <Modal
        visible={visible}
        onCancel={() => this.setState({ visible: false })}
        title={<span><Icon type="plus" /> Add Vision</span>}
        footer={null}
      >
        <CreateForm cb={this.cb} onCancel={() => this.setState({ visible: false })} />
      </Modal>
    );

    if (!loading && visionList.length === 0) {
      return (
        <div>
          <Empty
            message={<span>
              <Button
                icon="plus" type="primary"
                onClick={() => this.setState({ visible:true })}
              >
                Add Vision
              </Button>
            </span>}
          />
          { AddModal }
        </div>
      );
    }

    return (
      <div>
        <Spin spinning={loading}>
          <Button
            icon="plus" type="primary"
            onClick={() => this.setState({ visible:true })}
          >
              Add Vision
            </Button>
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
        { AddModal }
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ prepareListing }, dispatch);
}

function mapStateToProps(state) {
  return {
      visionList : state.vision.visionList,
      loading : state.vision.loading
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VisionList);
