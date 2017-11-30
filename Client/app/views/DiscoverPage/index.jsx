import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spin, Layout, Modal, Icon } from 'antd';
import VisionCard from 'components/VisionCard';
import Empty from 'components/Empty';
import Filter from 'components/Filter';
import { preDicoverList } from 'actions/discover';
import { formatDate } from 'utils';
import JoinForm from './joinVisionForm';

const { Content, Sider } = Layout;

class discoverPage extends Component {
  constructor(props) {
    super(props);
    this.onDiscoveryClick = this.onDiscoveryClick.bind(this);
    this.state = {
      visible: false
    };
  }
  componentDidMount() {
    this.props.preDicoverList();
  }

  onDiscoveryClick(obj) {
    if (obj.key === '0') {
      this.setState({ visible: true });
    }
  }

  render() {
    const { discoverList, loading } = this.props;
    const { visible } = this.state;

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
        <Sider width={200} style={{ background: '#fff' }}>
          <Filter />
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          <div>
            <Spin spinning={loading}>
              {
                  discoverList.map((elem, i) => (
                    <VisionCard
                      key={i}
                      name={elem.title}
                      description={elem.description}
                      status={elem.status}
                      visionId={elem._id}
                      updatedAt={formatDate(elem.updatedAt)}
                      onClick={this.onDiscoveryClick}
                      discover
                    />
                  ))
                }
            </Spin>
            <Modal
              visible={visible}
              onCancel={() => this.setState({ visible: false })}
              title={<span><Icon type="fork" /> Join Request</span>}
              footer={null}
            >
              <JoinForm onCancel={() => this.setState({ visible: false })} />
            </Modal>
          </div>
        </Content>
      </Layout>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ preDicoverList }, dispatch);
}

function mapStateToProps(state) {
  return {
    discoverList: state.discover.discoverList,
    loading : state.discover.loading
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(discoverPage);
