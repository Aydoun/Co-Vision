import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spin, Layout } from 'antd';
import VisionCard from 'components/VisionCard';
import Empty from 'components/Empty';
import Filter from 'components/Filter';
import { preDicoverList } from 'actions/discover';
import { formatDate } from 'utils';

const { Content, Sider } = Layout;

class discoverPage extends Component {
  componentDidMount() {
    this.props.preDicoverList();
  }

  render() {
    const { discoverList, loading } = this.props;

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
                      onConfirm={() => console.log(elem._id)}
                      discover
                    />
                  ))
                }
            </Spin>
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
