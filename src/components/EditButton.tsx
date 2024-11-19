import { Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface EditButtonProps {
  documentId: string;
}

export const EditButton: React.FC<EditButtonProps> = ({
  documentId
}) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/trading-server-machines/`);
  
  };

  return (
    <Button
      type="primary"
      icon={<EditOutlined />}
      onClick={handleEdit}
    >
      Editar
    </Button>
  );
};