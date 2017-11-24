import React from 'react';
import { storiesOf } from '@storybook/react';
import View from './index';

storiesOf('Vision Card', module)
  .add('Basic Usage', () => (
    <View
      name="He For She"
      description="She Is Kinda Hot"
    />
  ))
  .add('Image Card', () => (
    <View
      name="He For She"
      description="She Is Kinda Hot"
      bordered={false}
      avatar="https://tse2.mm.bing.net/th?id=OIP.cNay4y2O4d-Cv_RDrLKTaADVEs&w=210&h=296&c=8&qlt=90&o=4&pid=1.7"
    />
  ));
