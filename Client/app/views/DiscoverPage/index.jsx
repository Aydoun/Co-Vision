import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spin } from 'antd';
import VisionCard from 'components/VisionCard';
import Empty from 'components/Empty';
import { preDicoverList } from 'actions/discover';
import { formatDate } from 'utils';

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
                />
              ))
            }
        </Spin>
      </div>
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
