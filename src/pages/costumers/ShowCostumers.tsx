import { MarkdownField, Show, TextField } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography } from "antd";
import { useState } from "react";

const ShowCostumers = () => {
  const {
    query: { data, isLoading },
  } = useShow();

  const customerData = data?.data?.data[0];

  console.log("Datos del cliente:", customerData);

  const tradingServerMachine = customerData?.trading_server_machine;

  console.log(`tradingServerMachine ${tradingServerMachine}`);

  return (
    <Show isLoading={isLoading}>
      {/* Muestra una alerta si no hay datos */}
      {!customerData && (
        <Typography.Text type="danger">
          No se encontraron datos del cliente.
        </Typography.Text>
      )}

      {customerData && (
        <>
          <Typography.Title level={5}>Id del Cliente</Typography.Title>
          <TextField value={customerData.id} />
          <Typography.Title level={5}>Server</Typography.Title>
          <TextField value={customerData.server} />{" "}
          {/* Accede directamente a server */}
          <Typography.Title level={5}>Account</Typography.Title>
          <MarkdownField value={customerData.account} />
          {/* Otros campos del cliente */}
          {tradingServerMachine && (
            <>
              <Typography.Title level={5}>
                Trading Server Machine Details
              </Typography.Title>
              <Typography.Title level={5}>ID de la Máquina:</Typography.Title>
              <TextField value={tradingServerMachine?.id} />
              {/* Otros campos de tradingServerMachine */}

              <Typography.Title level={5}>Trading Machine:</Typography.Title>
              <TextField value={customerData.trading_machine} />
            </>
          )}
        </>
      )}
    </Show>
  );
};

export default ShowCostumers;
