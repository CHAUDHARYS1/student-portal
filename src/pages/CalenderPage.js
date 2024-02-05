import React from "react";
import { Calendar, Layout, Typography,  } from "antd";

const { Content } = Layout;
const { Title } = Typography;

const SchoolCalendar = () => {
  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  return (
    <Content className="content">
      <Title level={2}>School Calendar</Title>
      <div style={{}}>
        <Calendar className="mt-2" onPanelChange={onPanelChange} />
      </div>
    </Content>
  );
};
export default SchoolCalendar;
