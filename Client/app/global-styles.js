import { injectGlobal } from 'styled-components';

injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    background:#fffaf4;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  a {
    text-decoration: none;
    font-size:14px;
  }

  ul , li {
    list-style: none;
    margin: 0;
    padding:0;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  .left {
      float: left;
  }

  .right {
      float: right;
  }

  .global-padding{
    padding:4px;
  }

  .ant-popover-inner-content{
    background:#f9f9f9;
  }

  hr {
    border: 0;
    border-bottom: 1px solid #ffbf00;
    margin: 20px 0px;
    width: 65%;
  }

  .global-right-margin {
      margin-right: 8px;
  }
  .global-bottom-margin {
      margin-bottom: 8px;
  }

  .global-left-margin {
      margin-left:8px;
  }

  div.vision-desc {
      font-size: 16px;
      font-family: monospace;
      margin-bottom: 8px;
  }

  h4.filter-label {
      margin-bottom: 8px;
  }

  .relative-content {
      position: relative;
  }

  div.card-sub-info{
      position: absolute;
      bottom: 4px;
      right: 32px;
      padding: 2px;
  }

  .public-card-body {
      border-bottom: 1px solid #ccc;
      padding-bottom: 8px;
  }

  .public-card-action {
      position:absolute;
      bottom: 0;
      right: 0;
      border:1px solid black;
  }


  .message {
    color: #000;
    clear: both;
    line-height: 18px;
    font-size: 15px;
    padding: 8px;
    position: relative;
    margin: 8px 0;
    max-width: 85%;
    word-wrap: break-word;
    z-index: -1;
  }
  .message:after {
    position: absolute;
    content: "";
    width: 0;
    height: 0;
    border-style: solid;
  }

  .message.sent {
      background: #d2eafb;
      border-radius: 5px 0px 5px 5px;
      float: right;
  }

  .message.sent:after {
      border-width: 0px 0 10px 10px;
      border-color: transparent #d2eafb;
      top: 0px;
      right: -8px;
  }

  .message:first-child {
      margin: 16px 10px 16px;
  }

  .metadata {
      display: inline-block;
      padding: 0 0 0 7px;
      position: relative;
      bottom: -4px;
  }

  .message.received {
      background: #fff;
      border-radius: 0px 5px 5px 5px;
      float: left;
  }

  .metadata .time {
      color: rgba(0, 0, 0, .45);
      font-size: 11px;
      display: inline-block;
  }

  .message:after {
      position: absolute;
      content: "";
      width: 0;
      height: 0;
      border-style: solid;
  }

  .message.received {
    background: #fff;
    border-radius: 0px 5px 5px 5px;
    float: left;
  }

  .message.received .metadata {
    padding: 0 0 0 16px;
  }

  .message.received:after {
    border-width: 0px 10px 10px 0;
    border-color: transparent #fff transparent transparent;
    top: 0;
    left: -10px;
  }

`;
