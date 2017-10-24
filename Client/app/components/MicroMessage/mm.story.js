import React from 'react';
import { storiesOf } from '@storybook/react';
import View from './index';

storiesOf('Micro Message Whatsapp Style', module)
  .add('Sent Message', () => ( 
    <View 
        type="sent"
        message="Yo Bro"
        time="3:23pm"
    />
  ))
  .add('Receive Message', () => ( 
    <View 
        type="received"
        message="Yo Dude!"
        time="3:25pm"
    />
  ))
  