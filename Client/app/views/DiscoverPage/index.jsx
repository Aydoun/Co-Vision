import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spin, Layout, Modal, Icon } from 'antd';
import VisionCard from 'components/VisionCard';
import Empty from 'components/Empty';
import Filter from 'components/Filter';
import { preDicoverList } from 'actions/discover';
import { preLike } from 'actions/vision';
import { formatDate } from 'utils';
import JoinForm from './joinVisionForm';

const { Content, Sider } = Layout;

class discoverPage extends Component {
  constructor(props) {
    super(props);
    this.onDiscoveryClick = this.onDiscoveryClick.bind(this);
    this.userLike = this.userLike.bind(this);
    this.state = {
      visible: false,
      creator: null,
      vision: null
    };
  }
  componentDidMount() {
    this.props.preDicoverList();
  }

  onDiscoveryClick(obj, visionId) {
    if (obj.key === '0') {
      const { discoverList } = this.props;
      const FoundVision = discoverList.find(elem => elem._id === visionId);
      this.setState({
        visible: true,
        creator: FoundVision && FoundVision.creator,
        vision: visionId
      });
    }
  }

  onFilterChanged(key, object) {
    switch (key) {
      case 0:
        // Term Search
        break;
      case 1:
        // Active Time
        break;
      case 2:
        // Contributors Count
        break;
      default:
        break;
    }
  }

  userLike(visionId) {
    this.props.preLike({
      id: visionId,
      discover: true
    });
  }

  render() {
    const { discoverList, loading } = this.props;
    const { visible, creator, vision } = this.state;
    if (!loading && discoverList.length === 0) {
      return (
        <div>
          <Empty
            message={<span>
              Nothing is Open For Discovery
            </span>}
          />
        </div>
      );
    }

    return (
      <Layout style={{ background: '#fff' }}>
        <Content >
          <div>
            <VisionCard
              listData={discoverList}
              loading={loading}
              onClick={this.onDiscoveryClick}
              header={<span><Icon type="global" /> Open Up To Possibilities</span>}
              onLike={this.userLike}
              discover
            />
            <Modal
              visible={visible}
              onCancel={() => this.setState({ visible: false })}
              title={<span><Icon type="fork" /> Join Request</span>}
              footer={null}
            >
              <JoinForm
                creator={creator}
                vision={vision}
                onCancel={() => this.setState({ visible: false })}
              />
            </Modal>
          </div>
        </Content>
      </Layout>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ preDicoverList, preLike }, dispatch);
}

function mapStateToProps(state) {
  return {
    discoverList: state.discover.discoverList,
    loading : state.discover.loading
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(discoverPage);
