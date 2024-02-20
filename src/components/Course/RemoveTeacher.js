import { CloseOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";

const RemoveTeacherButton = ({ courseId, teacherId, onRemove }) => {
  const removeTeacher = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/courses/${courseId}/remove-teacher`,
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
        <Button className="btn-secondary" size="small"><CloseOutlined></CloseOutlined></Button>
    </Popconfirm>
   
  );
};

export default RemoveTeacherButton;
