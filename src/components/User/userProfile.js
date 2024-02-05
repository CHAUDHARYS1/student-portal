import React, { useState, useEffect } from "react";
import { Form, Input, Button, Layout, Typography, Descriptions } from "antd";

const { Content } = Layout;
const { Title } = Typography;

const UserProfile = () => {
  const [user, setUser] = useState({});
 
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:5000/api/users/65bda566c8c028164ab094e6`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        if (response.ok )
        {
          console.log("Response", response)
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const generateUserItems = () => {
    return [
      {
        label: "Email",
        children: user.email
      },
      {
        label: "Username",
        children: user.username
      },
      {
        label: "First Name",
        children: user.email
      },
    ];
  };
  const dynamicUserItems = generateUserItems();


  return (
    <Content className="content">
      <Title level={2}>User Profile</Title>
      <Descriptions
        size="large"
        bordered
        column={{
          xs: 2,
          sm: 3,
          md: 4,
          lg: 4,
          xl: 4,
          xxl: 4,
        }}
        items={dynamicUserItems}
        style={{ marginTop: "20px" }}
      />
    </Content>
  );
};

export default UserProfile;
