import { Button, Popconfirm } from "antd";
import { useDelete } from "@refinedev/core";
import { DeleteOutlined } from "@ant-design/icons";

interface DeleteButtonProps {
  documentId: string;
  onSuccess?: () => void;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({
  documentId,
  onSuccess,
}) => {
  const { mutate } = useDelete();

  const handleDelete = () => {
    mutate(
      {
        resource: "trading-server-machines",
        id: documentId,
      },
      {
        onSuccess: () => {
          if (onSuccess) {
            onSuccess();
          }
        },
      }
    );
  };

  return (
    <Popconfirm
      title="¿Estás seguro de eliminar este registro?"
      onConfirm={handleDelete}
      okText="Sí"
      cancelText="No"
    >
      <Button
        danger
        icon={<DeleteOutlined />}
      >
        Eliminar
      </Button>
    </Popconfirm>
  );
};
