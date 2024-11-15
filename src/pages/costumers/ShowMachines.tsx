import { MarkdownField, Show, ShowButton } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const ShowMachines = () => {
  const {
    query: { data, isLoading },
  } = useShow();

  const customerData = data?.data?.data[0];

  const navigate = useNavigate();

  const renderServer = (server: any, record: any) => {
    const isVisible = true;

    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        {isVisible ? server : "•".repeat(server?.length || 0)}
        <Button
          type="text"
          onClick={() =>
            navigate(`/trading-server-machines/${record.id}/servers`)
          }
          icon={<ShowButton hideText size="small" recordItemId={record?.id} />}
        />
      </div>
    );
  };

  return (
    <Show isLoading={isLoading} title="Trading Machine">
      {/* Muestra una alerta si no hay datos */}
      {!customerData && (
        <Typography.Text type="danger">
          No se encontraron datos del cliente.
        </Typography.Text>
      )}

      {customerData && (
        <>
          <Typography.Title level={5}>Server</Typography.Title>
          {renderServer(customerData.server, customerData)}
          <Typography.Title level={5}>Account</Typography.Title>
          <MarkdownField value={customerData.account} />
        </>
      )}
    </Show>
  );
};

export default ShowMachines;
