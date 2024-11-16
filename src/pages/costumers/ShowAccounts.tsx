import { MarkdownField, Show, TextField } from "@refinedev/antd";
import { useBack, useOne } from "@refinedev/core";
import { Button, Typography } from "antd";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Para la navegación

const ShowAccounts = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useOne({
    resource: "trading-server-machines",
    id: id as string,
  });

  console.log("Datos completos de useShow:", data);
  console.log("Estructura completa de data:", JSON.stringify(data, null, 2));

  const serverData = data?.data?.data[0];

  console.log("Datos del servidor:", serverData);

  const handleBack = () => {
    navigate("/trading-server-machines");
  };

  return (
    <Show
      isLoading={isLoading}
      title={
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Button
            variant="text"
            onClick={handleBack}
            style={{
              border: 0,
              background: "transparent",
              padding: 4,
              marginRight: 16,
              color: "inherit",
            }}
          >
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="arrow-left"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M872 474H286.9l350.2-304c5.6-4.9 2.2-14-5.2-14h-88.5c-3.9 0-7.6 1.4-10.5 3.9L155 487.8a31.96 31.96 0 000 48.3L535.1 866c1.5 1.3 3.3 2 5.2 2h91.5c7.4 0 10.8-9.2 5.2-14L286.9 550H872c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path>
            </svg>
          </Button>
          <span>Servers</span>
        </div>
      }
      breadcrumb={
        <div>
          <Link to="/trading-server-machines">Trading Machines</Link> / Servers
        </div>
      }
    >
      {!serverData && (
        <Typography.Text type="danger">
          No se encontraron datos del cliente.
        </Typography.Text>
      )}

      {serverData && (
        <>
          <Typography.Title level={5}>Account</Typography.Title>
          <TextField value={serverData.account} />
          <Typography.Title level={5}>Broker</Typography.Title>
          <TextField value={serverData.broker} />
          <Typography.Title level={5}>Password</Typography.Title>
          <TextField value={serverData.passwordAcount} />
          <Typography.Title level={5}>Bot</Typography.Title>
          <TextField value={serverData.bots_installed} />
          <Typography.Title level={5}>Vendor</Typography.Title>
          <TextField value={serverData.vendor} />
          <Typography.Title level={5}>Costumer</Typography.Title>
          <TextField value={serverData.costumer} />
          <Typography.Title level={5}>Status</Typography.Title>
          <TextField value={serverData.statusCostumer} />
        </>
      )}
    </Show>
  );
};

export default ShowAccounts;