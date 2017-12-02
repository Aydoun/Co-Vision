import React from 'react';
import { storiesOf } from '@storybook/react';
import View from './index';

storiesOf('Inivitation Card', module)
  .add('Basic Usage', () => (
    <View
      visionName="He For She"
      Motivation="She Is Kinda Hot"
      requesterName="Mark Selby"
      visionId="12"
    />
  ));
