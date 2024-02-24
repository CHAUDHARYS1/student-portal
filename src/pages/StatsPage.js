// StatsPage.js
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";

import { Statistic, Row, Col, Card, Layout, Typography } from "antd";
const { Content } = Layout;
const { Title, Text } = Typography;
const formatter = (value) => <CountUp end={value} separator="," />;

const StatsPage = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Content className="content">
      <div>
        <Title level={4}>Statistic</Title>
        <Text type="secondary">Simple stats</Text>
        <div className="mt-2">
        <Row gutter={[16,16]}>
          <Col span={4}>
            <Card bordered={false}>
              <Statistic
                title="Total students"
                value={stats.students} 
                formatter={formatter}
              />
            </Card>
          </Col>
          <Col>
            <Card bordered={false}>
              <Statistic
                title="Total Teachers"
                value={stats.teachers}
                formatter={formatter}
              />
            </Card>
          </Col>
          <Col>
            <Card bordered={false}>
              <Statistic
                title="Total Admins"
                value={stats.admins}
                formatter={formatter}
              />
            </Card>
          </Col>
          <Col>
            <Card bordered={false}>
              <Statistic
                title="# of Courses"
                value={stats.courses}
                formatter={formatter}
              />
            </Card>
          </Col>
        </Row>
        </div>
      </div>
    </Content>
  );
};

export default StatsPage;
