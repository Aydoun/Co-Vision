import { configure } from '@storybook/react';
import 'antd/dist/antd.min.css';
import './index.css';

function loadStories() {
  require('../components/Filter/filter.story.js');
  require('../components/VisionCard/vc.story.js');
}

configure(loadStories, module);