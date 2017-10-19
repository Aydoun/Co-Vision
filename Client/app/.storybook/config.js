import { configure } from '@storybook/react';
import 'antd/dist/antd.min.css';
import './index.css';

function loadStories() {
  require('../components/Filter/filter.story.js');
}

configure(loadStories, module);