import React, { useEffect, useState } from 'react';
import { Result, Button } from 'antd';
import { LoginOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useNavigate} from 'react-router-dom';

const LogoutPage = () => {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5); // Adjusted countdown to 5 seconds

    useEffect(() => {
        const redirectTimeout = setTimeout(() => {
            navigate('/');
        }, countdown * 1000);

        return () => {
            clearTimeout(redirectTimeout);
        };
    }, [navigate, countdown]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown(prevCountdown => prevCountdown - 1);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
            <Result
                icon={<CheckCircleOutlined style={{ fontSize: '72px', color: '#52c41a' }} />}
                title={`You have been successfully logged out. You will be redirected back to home page in ${countdown} seconds.`}
                extra={[
                    <Button key="login" className="btn-primary" icon={<LoginOutlined />} href="/login">Login</Button>,
                ]}
            />
        </div>
    );
};

export default LogoutPage;