import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spin } from 'antd';
import VisionCard from 'components/VisionCard';
import { prepareAllVisions } from 'actions/vision';
import { formatDate } from 'utils';

class discoverPage extends Component {
  componentDidMount() {
    this.props.prepareAllVisions();
  }

  render() {
    const { allVisionList, loading } = this.props;

    return (
      <div>
        <Spin spinning={loading}>
          {
              allVisionList.map((elem, i) => (
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
  return bindActionCreators({ prepareAllVisions }, dispatch);
}

function mapStateToProps(state) {
  return {
    allVisionList: state.vision.allVisionList,
    loading : state.vision.loading
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(discoverPage);
