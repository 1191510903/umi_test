import React, { Component } from 'react';
import { Spin, message, Input, Button, Row, Col, Layout, Form } from 'antd';
import Link from 'umi/link';
import md5 from 'md5';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { urlHost, systemName } from '@/utils/common';
import styles from '../layouts/login.less';
import login1 from '@/assets/image/login-1.png';
import login2 from '@/assets/image/login-2.svg';
import { connect } from 'dva';

const CryptoJS = require('crypto-js');

const { Header, Footer, Content } = Layout;

@connect(({ global }) => ({ global }))
class Login extends Component {
  // 创建Form容器
  formRef = React.createRef();

  state = {
    loading: false,
  };

  // 进入的时候添加监听
  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);
  }

  // 离开页面的时候卸载监听
  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  // 监听键盘回车事件
  onKeyDown = e => {
    switch (e.keyCode) {
      case 13:
        this.submitUserName();
        break;
      default:
        break;
    }
  };

  // des 加密
  encryptByDES = (value, key) => {
    if (value === '') return '';
    const keyHex = CryptoJS.enc.Utf8.parse(key);
    const encrypted = CryptoJS.DES.encrypt(value, keyHex, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  };

  submitUserName() {
    this.formRef.current.validateFields().then(values => {
      console.log('values', values);
      const { dispatch } = this.props;
      const userId = values.userName;
      const { password } = values;
      this.setState({ loading: true });
      if (userId && password) {
        const v = `${userId}|${password}`;
        const k = '123456';
        const userwords = this.encryptByDES(v, k);
        console.log('userwords', userwords);
        dispatch({
          type: 'global/login',
          payload: {
            userwords,
          },
          callback: response => {
            this.setState({ loading: false });
            console.log('respoonse:', response);

            if (response.restCode === '100001') {
              this.props.history.push('/');
            } else {
              message.info('用户名密码错误');
            }
          },
        });
      } else {
        this.setState({ loading: false });
        message.info('用户名密码不能为空');
      }
    });
  }

  render() {
    return (
      <Layout>
        <div>
          <img
            alt="logo"
            className={styles.globalBg}
            src={login2}
            style={{ maxHeight: document.body.clientHeight - 40 }}
          />
        </div>
        <Header className={styles.header}>
          <Link to="/login">
            <h1>{systemName}</h1>
          </Link>
        </Header>
        <Content className={styles.content} style={{ minHeight: document.body.clientHeight - 170 }}>
          <Row>
            <Col span={2}></Col>
            <Col span={12}>
              <img className={styles.bgImg} src={login1} alt="logo" />
            </Col>
            <Col span={10}>
              <div className={styles.inputDiv}>
                <div className={styles.userLab}>用户登录</div>
                <Form ref={this.formRef} onFinish={this.submitUserName.bind(this)}>
                  <Row gutter={24}>
                    <Form.Item name="userName" style={{ padding: '0px 60px', width: '350px' }}>
                      <Input
                        size="large"
                        prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="用户名"
                      />
                    </Form.Item>
                    <Form.Item name="password" style={{ padding: '0px 60px', width: '350px' }}>
                      <Input
                        size="large"
                        prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="密码"
                        type="password"
                      />
                    </Form.Item>
                    <div className={styles.userInput}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: '230px', height: '40px' }}>
                        登录
                      </Button>
                    </div>
                  </Row>
                </Form>
                <div className={styles.bak}>
                  系统对IE11浏览器存在部分功能兼容性问题。为了更好的体验，推荐使用
                </div>
              </div>
            </Col>
          </Row>
        </Content>
        <Footer style={{ textAlign: 'center', background: 'white' }}>
          Copyright © 2090 小小张快乐源泉有限公司. All Rights Reserved.
        </Footer>
      </Layout>
    );
  }
}

export default Login;
