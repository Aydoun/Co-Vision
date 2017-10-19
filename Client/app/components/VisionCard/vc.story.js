import React from 'react';
import { storiesOf } from '@storybook/react';
import View from './index';

storiesOf('Vision Card', module)
  .add('Basic Usage', () => (
    <View 
        name="He For She"
        description="She Is Kinda Hot"
        status="Active"
    />
  ))
  