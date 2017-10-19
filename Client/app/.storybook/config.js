import { configure } from '@storybook/react';
import 'antd/dist/antd.min.css';

function loadStories() {
  require('../components/DynamicMenu/menu.story.js');
}

configure(loadStories, module);