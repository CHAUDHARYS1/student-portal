import React, { useState } from "react";
import { Descriptions, Button, Input } from "antd";
import { DateTime } from "luxon";
import { CloseOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";

const CourseScheduleAndResources = ({ course }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [start, setStart] = useState(
    course?.schedule?.start
      ? DateTime.fromISO(course.schedule.start).toJSDate()
      : null
  );
  const [end, setEnd] = useState(
    course?.schedule?.end
      ? DateTime.fromISO(course.schedule.end).toJSDate()
      : null
  );
  const [textbooks, setTextbooks] = useState(
    course?.resources?.textbooks?.join(", ") || "No textbooks listed"
  );
  const [externalLinks, setExternalLinks] = useState(
    course?.resources?.externalLinks?.join(", ") || "No external links listed"
  );
  const handleEditClick = () => {
    setIsEditMode(true);
  };
  const handleSaveClick = async () => {
    const updatedCourse = {
      ...course,
      schedule: {
        ...course.schedule,
        start: DateTime.fromJSDate(start)
          .set({ hour: 0, minute: 0, second: 0 })
          .toISO(),
        end: DateTime.fromJSDate(end)
          .set({ hour: 23, minute: 59, second: 59 })
          .toISO(),
      },
      resources: {
        ...course.resources,
        textbooks: textbooks.split(", "),
        externalLinks: externalLinks.split(", "),
      },
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/courses/${course._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // replace `token` with your actual token
        },
        body: JSON.stringify(updatedCourse),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setIsEditMode(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Descriptions
        title="Schedule"
        bordered
        extra={
          <div>
            {" "}
            {isEditMode ? (
              <>
                <Button className="mr-1" onClick={() => setIsEditMode(false)}><CloseOutlined></CloseOutlined></Button>
                <Button onClick={handleSaveClick}><SaveOutlined></SaveOutlined></Button>
              </>
            ) : (
              <div>
                <Button onClick={handleEditClick}><EditOutlined></EditOutlined></Button>
              </div>
            )}
          </div>
        }
      >
        <Descriptions.Item label="Start" style={{ fontWeight: "bold" }}>
          {isEditMode ? (
            <input
              type="date"
              value={
                start ? DateTime.fromJSDate(start).toFormat("yyyy-LL-dd") : ""
              }
              onChange={(e) =>
                setStart(DateTime.fromISO(e.target.value).toJSDate())
              }
            />
          ) : (
            DateTime.fromJSDate(start).toFormat("MM/dd/yyyy")
          )}
        </Descriptions.Item>
        <Descriptions.Item label="End" style={{ fontWeight: "bold" }}>
          {isEditMode ? (
            <input
              type="date"
              value={end ? DateTime.fromJSDate(end).toFormat("yyyy-LL-dd") : ""}
              onChange={(e) =>
                setEnd(DateTime.fromISO(e.target.value).toJSDate())
              }
            />
          ) : (
            DateTime.fromJSDate(end).toFormat("MM/dd/yyyy")
          )}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions title="Resources" bordered className="mt-2">
        <Descriptions.Item label="Textbooks">
          {isEditMode ? (
            <Input
              value={textbooks}
              onChange={(e) => setTextbooks(e.target.value)}
            />
          ) : (
            textbooks
          )}
        </Descriptions.Item>
        <Descriptions.Item label="External Links">
          {isEditMode ? (
            <Input
              value={externalLinks}
              onChange={(e) => setExternalLinks(e.target.value)}
            />
          ) : (
            externalLinks
          )}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default CourseScheduleAndResources;
