import React from "react";
import { Layout, Row, Typography, Card, Checkbox, Col } from "antd";
const { Content } = Layout;
const { Title } = Typography;

const UpcomingPage = () => {
  return (
    <Content className="content">
        <Title level={2}>Upcoming Features</Title>
      <Row gutter={12} className="mt-2">
        <Col sm={12}>
        <Card title="Calender">
        <ul className="upcoming-features-ul">
          <li>
            <Checkbox>
              View School Events: Display school-wide events like holidays,
              school activities, etc.
            </Checkbox>
          </li>
          <li>
            <Checkbox>
              Individual Events: Show individual events assigned to students
              such as exams, assignments, etc.
            </Checkbox>
          </li>
          <li>
            <Checkbox>
              Add Personal Events: Allow users to add their own personal events.
            </Checkbox>
          </li>
          <li>
            <Checkbox>
              Event Categories: Differentiate events by category (e.g., exams,
              assignments, holidays, personal events) using color coding or
              icons.
            </Checkbox>
          </li>
          <li>
            <Checkbox>
              Event Details: Clicking on an event could open a detailed view
              with more information, such as event description, start and end
              times, location (if applicable), etc.
            </Checkbox>
          </li>
          <li>
            <Checkbox>
              Reminders: Allow users to set reminders for events. These could be
              email notifications, push notifications, or both.
            </Checkbox>
          </li>
          <li>
            <Checkbox>
              Recurring Events: Allow users to set events that repeat on a
              daily, weekly, monthly, or yearly basis.
            </Checkbox>
          </li>
          <li>
            <Checkbox>
              Event Search: Implement a search function to allow users to find
              specific events.
            </Checkbox>
          </li>
        </ul>
      </Card>
        </Col>
        <Col sm={12}>
       
            </Col>
      </Row>
      
    </Content>
  );
};

export default UpcomingPage;
