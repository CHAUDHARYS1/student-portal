import React from 'react';
import { Result, Button } from 'antd';
import { LoginOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useNavigate} from 'react-router-dom';

const LogoutPage = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
            <Result
                icon={<CheckCircleOutlined style={{ fontSize: '72px', color: '#52c41a' }} />}
                title="You have been successfully logged out."
                extra={[
                    <Button key="login" className="btn-primary" icon={<LoginOutlined />} onClick={handleLogin}>Login</Button>,
                ]}
            />
        </div>
    );
};

export default LogoutPage;