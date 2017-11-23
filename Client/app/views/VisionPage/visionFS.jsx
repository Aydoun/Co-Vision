import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import find from 'lodash/find';
import { Table, Select, Card, Modal } from 'antd';
import Columns from './table-columns/fileSystem';
import { preContent, preBranch, preStat } from 'actions/vision';

const Option = Select.Option;

class VisionFS extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          VisionObject : {},
          visible : false
      };
  }

  componentDidMount() {
      const _id = this.props.routeParams.id;
      const FoundVision = find(this.props.visionList, ['_id', _id]);

      if (FoundVision) {
        const params = {
           id : _id,
           repoName : FoundVision.title
        };
        this.setState({ VisionObject : FoundVision });
        this.props.preContent(params);
        this.props.preBranch(params);
        this.props.preStat(params);
      }
  }

  branchChanged(value) {
      const { VisionObject } = this.state;

      this.props.preContent({
          id : this.props.routeParams.id,
          repoName : VisionObject.title,
          branchName : value
      });
  }

  render() {
    const { visionFS, branchList, contributionStats } = this.props;
    const { VisionObject, visible } = this.state;
    const SelectBranch = (
      <div>
        <label>Branches ({branchList.length || 0}) : </label>
        <Select style={{ width:155 }} onChange={this.branchChanged.bind(this)}>
          {
              branchList.map((item, i) => <Option key={i} value={item.name}>{item.name}</Option>)
            }
        </Select>
      </div>
    );
    const CardTitle = (
      <div>
        <span>{VisionObject.title || 'Nope'}</span><br />
        <span>
          Hey
        </span>
      </div>
    );

    return (
      <div>
        <Card extra={SelectBranch} title={CardTitle}>
          <Table
            columns={Columns.bind(this)()}
            dataSource={visionFS}
            showHeader={false}
            pagination={false}
            loading={false}
          />
        </Card>
        <Modal
          visible={visible}
          title="Vision Contributors"
          onCancel={() => this.setState({ visible : false })}
        >
          {
            Object.keys(contributionStats.contributorsList).map((key, index) => (
              <p key={index}>
                <span>{key}</span>
              </p>
              ))
          }
        </Modal>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ preContent, preBranch, preStat }, dispatch);
}

function mapStateToProps(state) {
  return {
      visionList : state.vision.visionList,
      visionFS : state.vision.visionFS,
      branchList : state.vision.branchList,
      contributionStats : state.vision.contributionStats
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VisionFS);
