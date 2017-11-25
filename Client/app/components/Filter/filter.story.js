import React from 'react';
import { storiesOf } from '@storybook/react';
import View from './index';

storiesOf('Filter', module)
  .add('Basic Usage', () => (
    <View
      onSliderChange={value => console.log(value, 'slider')}
      onSearch={value => console.log(value, 'search')}
      onSelectChange={value => console.log(value, 'select')}
    />
  ));
