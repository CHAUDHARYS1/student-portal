import React, { useState, useEffect } from "react";

import { Form, Input, Button, Layout, Typography, Descriptions } from "antd";

const { Content } = Layout;
const { Title } = Typography;

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({});

 
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
        setFormData(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
  
    fetchUser();
  }, []);

  const generateUserItems = () => {
    if (isEditMode) {
    return [
      {
        label: "Username",
        children: <Input defaultValue={user.username} onChange={e => setFormData({...formData, username: e.target.value})} />
      },
      {
        label: "Email",
        children: <Input defaultValue={user.email} onChange={e => setFormData({...formData, email: e.target.value})} />

      },
      {
        label: "Role",
        children: <Input defaultValue={user.role} onChange={e => setFormData({...formData, role: e.target.value})} />
      },
      {
        label: "First Name",
        children: <Input defaultValue={user.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} />
      },
      {
        label: "Last Name",
        children: <Input defaultValue={user.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} />
      },
      {
        label: "Address",
        children: <Input defaultValue={user.address} onChange={e => setFormData({...formData, address: e.target.value})} />

      },
      {
        label: "Apt/Suite/Unit",
        children: <Input defaultValue={user.aptSuiteUnit} onChange={e => setFormData({...formData, aptSuiteUnit: e.target.value})} />
       },
      {
        label: "City",
        children: <Input defaultValue={user.city} onChange={e => setFormData({...formData, city: e.target.value})} />
      }
      ,
      {
        label: "State",
        children: <Input defaultValue={user.state} onChange={e => setFormData({...formData, state: e.target.value})} />
      },
      {
        label: "Phone Number",
        children: <Input defaultValue={user.phoneNumber} onChange={e => setFormData({...formData, phoneNumber: e.target.value})} />
      },
      {
        label: "Date of Birth",
        children: <Input defaultValue={new Date(formData.dateOfBirth).toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric"
        })} onChange={e => setFormData({...formData, dateOfBirth: e.target.value})} />,
      },
      {
        label: "Gender",
        children:  <Input defaultValue={user.gender} onChange={e => setFormData({...formData, gender: e.target.value})} />
      }
    ];
  } else{
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
        children: user.firstName || "No data",
      },
      {
        label: "Last Name",
        children: user.lastName || "No data",
      },
      {
        label: "Address",
        children: user.address || "No data",

      },
      {
        label: "Apt/Suite/Unit",
        children: user.aptSuiteUnit || "No data",
      },
      {
        label: "City",
        children: user.city || "No data",
      }
      ,
      {
        label: "State",
        children: user.state || "No data",
      },
      {
        label: "Phone Number",
        children: user.phoneNumber || "No data",
      },
      {
        label: "Date of Birth",
        children: new Date(user.dateOfBirth).toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric"
        }) || "No data",
      },
      {
        label: "Gender",
        children: user.gender || "No data",
      }
    ];
  }
  };
  const dynamicUserItems = generateUserItems();

  const saveChanges = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:5000/api/users/${user._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    setUser({data});
  };

  return (
    <Content className="content">
      <Title level={4}>Profile</Title>
      <Descriptions
        size="default"
        className=""
        title="User Info"
        layout=""
        bordered
        extra={
          isEditMode
            ? <Button className="btn-primary" onClick={() => { saveChanges(); setIsEditMode(false); }}>Save</Button>
            : <Button className="btn-primary" onClick={() => setIsEditMode(true)}>Edit</Button>
        }
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
