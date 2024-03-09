import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";

const RemoveTeacherButton = ({
  courseId,
  teacherId,
  onRemove,
  showRemoveButton,
}) => {
  const removeTeacher = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/courses/${courseId}/remove-teacher`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ teacherId: teacherId }),
        }
      );

      if (!response.ok) {
        throw new Error("Error removing teacher");
      }

      const data = await response.json();
      console.log("Teacher removed:", data);

      onRemove(teacherId);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Popconfirm
      title="Are you sure you want to remove this teacher?"
      onConfirm={removeTeacher}
      okText="Yes"
      cancelText="No"
    >
      <Button
        className={`btn-primary border-0 ${showRemoveButton ? "shake" : ""}`}
        size="small"
        icon={<DeleteOutlined />}
      >
       
      </Button>
    </Popconfirm>
  );
};

export default RemoveTeacherButton;
