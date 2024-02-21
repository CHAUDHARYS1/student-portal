import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";

const RemoveStudentButton = ({
  courseId,
  studentId,
  onRemove,
  showRemoveButton,
}) => {
  const removeStudent = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/courses/${courseId}/remove-student`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ studentId: studentId }),
        }
      );

      if (!response.ok) {
        throw new Error("Error removing student");
      }

      const data = await response.json();
      console.log("Student removed:", data);

      onRemove(studentId);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Popconfirm
      title="Are you sure you want to remove this student?"
      onConfirm={removeStudent}
      okText="Yes"
      cancelText="No"
    >
      <Button
        className={`btn-primary border-0 ${showRemoveButton ? "shake" : ""}`}
        size="small"
      >
        <DeleteOutlined></DeleteOutlined>
      </Button>
    </Popconfirm>
  );
};

export default RemoveStudentButton;
