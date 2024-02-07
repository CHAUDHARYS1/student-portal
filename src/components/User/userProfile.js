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
        const userId = localStorage.getItem("userId"); // replace this with how you get the logged-in user's ID
  
        if (!userId) {
          console.error("User ID is undefined");
          return;
        }
  
        const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
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
        label: "Username",
        children: user.username,
        span: 4
      },
      {
        label: "Email",
        children: user.email
      },
      {
        label: "Role",
        children: user.role
      },
      {
        label: "First Name",
        children: user.firstName
      },
      {
        label: "Last Name",
        children: user.lastName
      },
      {
        label: "Address",
        children: user.address

      },
      {
        label: "Apt/Suite/Unit",
        children: user.aptSuiteUnit
      },
      {
        label: "City",
        children: user.city
      }
      ,
      {
        label: "State",
        children: user.state
      },
      {
        label: "Phone Number",
        children: user.phoneNumber
      },
      {
        label: "Date of Birth",
        children: new Date(user.dateOfBirth).toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric"
        })
      },
      {
        label: "Gender",
        children: user.gender
      }
    ];
  };
  const dynamicUserItems = generateUserItems();


  return (
    <Content className="content">
      <Title level={4}>Profile</Title>
      <Descriptions
        size="default"
        className=""
        title="User Info"
        layout=""
        bordered
        extra={<Button className="btn-primary">Edit</Button>}
        column={{
          xs: 1,
          sm: 1,
          md: 2,
          lg: 3,
          xl: 3,
          xxl: 4,
        }}
       
        items={dynamicUserItems}
      />
    </Content>
  );
};

export default UserProfile;
