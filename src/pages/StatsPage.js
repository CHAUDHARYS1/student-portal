// StatsPage.js
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";

import { Statistic, Row, Col, Card } from "antd";
import { Layout } from "antd";
const { Content } = Layout;
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
        <h1>Stats</h1>
        <Row gutter={16}>
          <Col span={12}>
            <Card bordered={false}>
              <Statistic
                title="Students"
                value={stats.students}
                formatter={formatter}
              />
            </Card>
            <Statistic title="Teachers" value={stats.teachers} />
            <Statistic title="Admins" value={stats.admins} />
            <Statistic title="Courses" value={stats.courses} />
          </Col>
        </Row>
      </div>
    </Content>
  );
};

export default StatsPage;
