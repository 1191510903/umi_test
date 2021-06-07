import React, { Component } from 'react';
import ProTable from '@ant-design/pro-table';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

sessionStorage.setItem('token','ss');

class Test extends Component {
  
  render() {
    return (
      <div>
        <Avatar size={64} icon={<UserOutlined />} />
        <ProTable></ProTable>
      </div>
    );
  }
}

export default Test;
