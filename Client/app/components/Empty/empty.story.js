import React from 'react';
import { Link } from 'react-router';
import { Button } from 'antd';
import { storiesOf } from '@storybook/react';
import View from './index';

const firstMessage = (
  <div>
    <span>Google.com</span>
    <Button type="primary" icon="save">Add</Button>
  </div>
);

const secondMessage = (
  <div>
    <span>Fantasy Land</span>
    <Link to="/somewhere"> SomeWhere...</Link>
  </div>
);

storiesOf('Empty Results', module)
  .add('Basic Usage', () => (
    <View
      message="Custome Text Message"
    />
  ))
  .add('Button Message', () => (
    <View
      message={firstMessage}
    />
  ))
  .add('Link Message', () => (
    <View
      message={secondMessage}
    />
  ))
