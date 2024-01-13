import React, { useState, useEffect } from "react";
import { Table } from "antd";

const adminTable = () => {
    
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    // Fetch admin data from the server when the component mounts
    const fetchAdmins = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users');
        const data = await response.json();
        setAdmins(data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchAdmins();
  }, []);


  const adminDataTable = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    }
  ];

  const adminData = admins.map((admin) => ({
    key: admin._id,
    username: admin.username,
    password: admin.password
  }));
  
  return (
    <Table columns={adminDataTable} dataSource={adminData} />
  )

};

export default adminTable;