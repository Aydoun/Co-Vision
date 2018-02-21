import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table } from 'antd';
import Columns from './table-columns/fileSystem';
import { preContent } from 'actions/vision';

class VisionFS extends React.Component {

  constructor(props) {
      super(props);
      this.Columns = Columns.bind(this);
      this.state = {
          newRows : []
      };
  }

  componentDidMount() {
      const _id = this.props.routeParams.id;
      const params = {
         id : _id,
      };

      this.props.preContent(params);
  }


  getRows() {
    const { visionFS } = this.props;
    const { newRows } = this.state;

    return visionFS.concat(newRows);
  }

  render() {

    return (
      <div>
         <Table
            columns={this.Columns()}
            dataSource={this.getRows()}
            showHeader={false}
            pagination={false}
            loading={false}
          />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ preContent }, dispatch);
}

function mapStateToProps(state) {
  return {
      visionFS : state.vision.visionFS,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(VisionFS);
