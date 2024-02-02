// CourseCard.js
import React, { useState } from "react";
import {
  Card,
  Tag,
  Popconfirm,
  notification,
  Skeleton,
  Modal,
  Form,
  Input,
  Select,
  Switch,
  Tooltip,
} from "antd";
import { Link } from "react-router-dom";
import {
  ExpandAltOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { Meta } = Card;
const { Option } = Select;

const CourseCard = ({ course }) => {
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  // Define a mapping of difficulty levels to tag colors
  const difficultyColors = {
    beginner: "cyan",
    intermediate: "blue",
    advanced: "geekblue",
    expert: "purple",
  };

  // Get the color based on the course level
  const tagColor = difficultyColors[course.level] || "default";

  const handleDelete = async () => {
    try {
      setLoading(true);

      // Simulate an asynchronous API call to delete the course
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Make the actual API call to delete the course
      const response = await fetch(
        `http://localhost:5000/api/courses/${course._id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Show success message
        notification.success({
          message: "Course Deleted",
          description: `${course.courseName} has been deleted. This page will now reload.`,
        });
        // Reload the page to refresh the course list after 2 seconds has passed
        setTimeout(() => window.location.reload(), 2000);
      } else {
        // Show error message
        notification.error({
          message: "Delete Failed",
          description: "Failed to delete the course.",
        });
      }
    } catch (error) {
      // Show error message
      notification.error({
        message: "Delete Failed",
        description: "Failed to delete the course.",
      });
    } finally {
      setLoading(false);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
    form.setFieldsValue(course);
  };

  const handleUpdate = async () => {
    setIsModalVisible(false);
    try {
      setLoading(true);

      // Validate form fields
      const values = await form.validateFields();

      // Simulate an asynchronous API call to update the course details in the database
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Make the actual API call to update the course details
      const response = await fetch(
        `http://localhost:5000/api/courses/${course._id}`,
        {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Show success message
        notification.success({
          message: "Course Updated",
          description: `${course.courseName} has been updated. This page will now reload.`,
        });
        // Reload the page to refresh the course list
        window.location.reload();
      } else {
        // Show error message
        notification.error({
          message: "Update Failed",
          description: `Failed to update the course: ${course.courseName}`,
        });
      }
    } catch (error) {
      // Show error message
      notification.error({
        message: "Update Failed",
        description: "Failed to update the course.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Card
        title={
          loading ? (
            <Skeleton.Input style={{ width: 100 }} active />
          ) : (
            course.abbreviation
          )
        }
        style={{ width: 300, margin: 16 }}
        extra={[
          <Tag key="online" color="green" bordered={false}>
            {loading ? (
              <Skeleton.Input style={{ width: 60 }} active />
            ) : (
              `${course.online ? "Online" : "Onsite"}`
            )}
          </Tag>,
          <Tag key="length" color="gold" bordered={false}>
            {loading ? (
              <Skeleton.Input style={{ width: 80 }} active />
            ) : (
              `${course.length + " Weeks"}`
            )}
          </Tag>,
        ]}
        actions={[
          <Popconfirm
            key="delete"
            title={`Are you sure you want to delete ${course.courseName}?`}
            onConfirm={handleDelete}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete?" placement="bottom">
              <DeleteOutlined />
            </Tooltip>
          </Popconfirm>,
          <Tooltip title="Quick Edit" placement="bottom">
          <EditOutlined key="edit" onClick={showModal} />
          </Tooltip>,
          <Tooltip title="Expand Course for more info" placement="bottom">
            <Link to={`/courses/${course._id}`}>
              <ExpandAltOutlined />
            </Link>{" "}
          </Tooltip>,
        ]}
      >
        <Meta
          title={
            loading ? (
              <Skeleton.Input style={{ width: 200 }} active />
            ) : (
              course.courseName
            )
          }
          description={
            <p>
              {loading ? (
                <>
                  <Skeleton.Input style={{ width: 300 }} active />
                  <br />
                  <br />
                  <Skeleton.Input style={{ width: 200 }} active />
                </>
              ) : (
                <>
                  {`${course.description.substring(0, 100) + '...'}`} <br />
                  <br /> Course Difficulty:{" "}
                  <Tag bordered={false} color={tagColor}>
                    {`${course.level
                      .charAt(0)
                      .toUpperCase()}${course.level.slice(1)}`}
                  </Tag>
                </>
              )}
            </p>
          }
        />
      </Card>
      <Modal
        title="Edit Course"
        open={isModalVisible}
        onOk={handleUpdate}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="courseName"
            label="Course Name"
            rules={[
              { required: true, message: "Please enter the course name" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Course Description"
            rules={[
              {
                required: true,
                message: "Please enter the course description",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="level"
            label="Difficulty Level"
            rules={[
              { required: true, message: "Please select the difficulty level" },
            ]}
          >
            <Select>
              <Option value="beginner">Beginner</Option>
              <Option value="intermediate">Intermediate</Option>
              <Option value="advanced">Advanced</Option>
              <Option value="expert">Expert</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="length"
            label="Course Length"
            rules={[
              { required: true, message: "Please enter the course length" },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="online"
            label="Online"
            valuePropName="checked"
            rules={[
              {
                required: true,
                message: "Please select whether the course is online or not",
              },
            ]}
          >
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CourseCard;
