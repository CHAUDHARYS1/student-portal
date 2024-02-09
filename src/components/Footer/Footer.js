// Footer.js
import React from 'react';
import { Layout, Typography } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

const { Footer } = Layout;
const { Link } = Typography;

const AppFooter = () => {
  return (
    <Footer style={{ textAlign: 'center' }}>
      <Link href="https://github.com" target="_blank">
        <GithubOutlined style={{ fontSize: '1.5rem', marginRight: '0.5rem' }} />
        GitHub
      </Link>
      <br />
      Portal ©2024 Created by Shital Chaudhary
    </Footer>
  );
};

export default AppFooter;
