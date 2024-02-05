import React, { useState } from "react";
import { Calendar, Layout, Typography, Checkbox } from "antd";

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

      <div>
        <Title level={4} className="mt-4">
          Upcoming Features to Calendar
        </Title>
        <Checkbox>
          View School Events: Display school-wide events like holidays, school
          activities, etc.{" "}
        </Checkbox>{" "}
        <br />
        <Checkbox>
          Individual Events: Show individual events assigned to students such as
          exams, assignments, etc.{" "}
        </Checkbox>{" "}
        <br />
        <Checkbox>
          Add Personal Events: Allow users to add their own personal events.{" "}
        </Checkbox>{" "}
        <br />
        <Checkbox>
          Event Categories: Differentiate events by category (e.g., exams,
          assignments, holidays, personal events) using color coding or icons.{" "}
        </Checkbox>{" "}
        <br />
        <Checkbox>
          Event Details: Clicking on an event could open a detailed view with
          more information, such as event description, start and end times,
          location (if applicable), etc.{" "}
        </Checkbox>{" "}
        <br />
        <Checkbox>
          Reminders: Allow users to set reminders for events. These could be
          email notifications, push notifications, or both.{" "}
        </Checkbox>{" "}
        <br />
        <Checkbox>
          Recurring Events: Allow users to set events that repeat on a daily,
          weekly, monthly, or yearly basis.{" "}
        </Checkbox>{" "}
        <br />
        <Checkbox>
          Event Search: Implement a search function to allow users to find
          specific events.{" "}
        </Checkbox>{" "}
        <br />
        <Checkbox>
          Event Filtering: Allow users to filter events by category, date range,
          etc.{" "}
        </Checkbox>{" "}
        <br />
        <Checkbox>
          Sharing Events: Allow users to share events with others, either
          through the app itself or by exporting the event to other calendar
          apps.{" "}
        </Checkbox>{" "}
        <br />
        <Checkbox>
          RSVP to Events: For school-wide events, allow users to RSVP directly
          from the calendar.{" "}
        </Checkbox>{" "}
        <br />
        <Checkbox>
          Integration with Other Features: If your app has features like
          assignments or exams, these could automatically create events in the
          calendar.{" "}
        </Checkbox>
      </div>
    </Content>
  );
};
export default SchoolCalendar;
