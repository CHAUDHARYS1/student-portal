import React from 'react';
import { Result, Button } from 'antd';
import { HomeOutlined, LoginOutlined, CheckCircleOutlined } from '@ant-design/icons';

const LogoutPage = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
            <Result
                icon={<CheckCircleOutlined style={{ fontSize: '72px', color: '#52c41a' }} />}
                title="You have been successfully logged out"
                extra={[
                    <Button key="home" className="btn-primary" icon={<HomeOutlined />} href="/">Go Home</Button>,
                    <Button key="login" icon={<LoginOutlined />} href="/login">Login</Button>,
                ]}
            />
        </div>
    );
};

export default LogoutPage;