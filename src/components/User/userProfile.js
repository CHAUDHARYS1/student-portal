import React, { useState, useEffect } from "react";

import { Input, Button, Layout, Typography, Descriptions, Select } from "antd";

const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;

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
  
        const response = await fetch(
          `http://localhost:5000/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
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

  const saveChanges = async () => {
    const token = localStorage.getItem("token");
  
    if (user && user._id) {
      console.log('formData before fetch:', formData);
  
      try {
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
        console.log('Data after fetch:', data);
        setUser(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    } else {
      console.error('User ID is undefined');
    }
  };

  const generateUserItems = () => {
    if (isEditMode) {
      return [
        {
          label: "Username",
          children: user.username,
        },
        {
          label: "Role",
          children:user.role,
        },
        {
          label: "Email",
          children: (
            <Input
              defaultValue={user.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          ),
        },
       
        {
          label: "First Name",
          children: (
            <Input
              defaultValue={user.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
          ),
        },
        {
          label: "Last Name",
          children: (
            <Input
              defaultValue={user.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
          ),
        },
        {
          label: "Address",
          children: (
            <Input
              defaultValue={user.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          ),
        },
        {
          label: "Apt/Suite/Unit",
          children: (
            <Input
              defaultValue={user.aptSuiteUnit}
              onChange={(e) =>
                setFormData({ ...formData, aptSuiteUnit: e.target.value })
              }
            />
          ),
        },
        {
          label: "City",
          children: (
            <Input
              defaultValue={user.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
            />
          ),
        },
        {
          label: "State",
          children: (
            <Input
              defaultValue={user.state}
              onChange={(e) =>
                setFormData({ ...formData, state: e.target.value })
              }
            />
          ),
        },
        {
          label: "Phone Number",
          children: (
            <Input
              defaultValue={user.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
            />
          ),
        },
        {
          label: "Date of Birth",
          children: (
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) =>
                setFormData({ ...formData, dateOfBirth: e.target.value })
              }
            />
          ),
        },
        {
          label: "Gender",
          children: (
            <Select
              defaultValue={user.gender}
              onChange={(value) =>
                setFormData({ ...formData, gender: value })
              }
            >
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="others">Others</Option>
            </Select>
          ),
        },
      ];
    } else {
      return [
        {
          label: "Username",
          children: user.username,
        },
        {
          label: "Role",
          children: user.role,
        },
        {
          label: "Email",
          children: user.email,
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
        },
        {
          label: "State/Province",
          children: user.state || "No data",
        },
        {
          label: "Phone Number",
          children: (user.phoneNumber || "No data").replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3"),
        },
        {
          label: "Date of Birth",
          children:
            new Date(user.dateOfBirth).toLocaleDateString("en-US", {
              month: "2-digit",
              day: "2-digit",
              year: "numeric",
            }) || "No data",
        },
        {
          label: "Gender",
          children: (user.gender || "No data").charAt(0).toUpperCase() + (user.gender || "No data").slice(1),
        },
      ];
    }
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
        extra={
          isEditMode ? (
            <Button
              className="btn-primary"
              onClick={() => {
                saveChanges();
                setIsEditMode(false);
              }}
            >
              Save
            </Button>
          ) : (
            <Button className="btn-primary" onClick={() => setIsEditMode(true)}>
              Edit
            </Button>
          )
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
