import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Button, Spin, Modal, Icon } from 'antd';
import VisionCard from 'components/VisionCard';
import Empty from 'components/Empty';
import { formatDate } from 'utils';
import { prepareListing, unregister, preLike } from 'actions/vision';
import CreateForm from './createVision';
import './index.css';

class VisionList extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    visionList: PropTypes.array,
    prepareListing: PropTypes.func,
    unregister: PropTypes.func
  }

  static defaultProps = {
    loading: false
  }

  constructor(props) {
      super(props);
      this.userLike = this.userLike.bind(this);
      this.unregister = this.unregister.bind(this);
      this.state = {
        visible: false
      };
  }

  componentDidMount() {
    this.props.prepareListing({
    });
  }

  cb() {
    this.props.prepareListing({
    });
  }

  userLike(visionId) {
    this.props.preLike({
      id: visionId
    });
  }

  unregister(visionId, creatorId) {
    this.props.unregister({
      id: visionId,
      creator: creatorId
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
    console.log('V List Render');
    return (
      <div >
        <Button
          icon="plus" type="primary"
          onClick={() => this.setState({ visible: true })}
        >
            Add Vision
          </Button>
        {
          <VisionCard
            onConfirm={this.unregister}
            onLike={this.userLike}
            header={<span><Icon type="api" /> Active Visions</span>}
            listData={visionList}
            loading={loading}
          />
        }
        { AddModal }
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ prepareListing, unregister, preLike }, dispatch);
}

function mapStateToProps(state) {
  return {
      visionList : state.vision.visionList,
      loading : state.vision.loading
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VisionList);
