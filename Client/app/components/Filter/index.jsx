import React from 'react';
import { Card, Input, Slider, Row, Col, Icon, Select } from 'antd';

const Option = Select.Option;
const Search = Input.Search;
const formatter = (value) => {
  if (value === 0) {
    return 'All';
  }
  return `${value} days`;
};
const CardTitle = (
  <div>
    <Icon type="filter" />
    <span style={{ marginLeft:8 }}>Filter</span>
  </div>
);

export default props => (
  <Row>
    <Col >
      <Card
        title={CardTitle}
        noHovering
        bordered={false}
      >
        <Row>
          <Col >
            <Search
              placeholder="Keyword"
              onSearch={value => props.onSearch(value)}
            />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col >
            <h4>Last Activity:</h4>
            <Slider
              max={6}
              step={1}
              tipFormatter={formatter}
              onChange={props.onSliderChange}
            />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col span={24} size="small">
            <h4 className="filter-label">Active Contributors:</h4>
            <Select
              defaultValue="0"
              size="large"
              style={{ width: 150 }}
              onChange={props.onSelectChange}
            >
              <Option value="10">10+</Option>
              <Option value="100">100+</Option>
              <Option value="1000">1000+</Option>
              <Option value="0">All</Option>
            </Select>
          </Col>
        </Row>
      </Card>
    </Col>
  </Row>
);

// export default class Filter extends PureComponent {
//   render() {
//     return (
//
//     );
//   }
// }
