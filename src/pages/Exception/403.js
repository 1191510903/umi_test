import React, { createElement } from 'react';

export default class Exception403 extends React.PureComponent {
  static defaultProps = {
    backText: '返回首页',
    redirect: '/',
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div>--------------</div>;
  }
}
