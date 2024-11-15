import { useTable, List, ShowButton, EditButton } from "@refinedev/antd";
import { Space, Table, Input, Tooltip, Button } from "antd";
import { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

const ListCustomers = () => {
  const { tableProps } = useTable({
    resource: "trading-server-machines", // Pasamos solo el endpoint
    syncWithLocation: true,
  });

  //const [passwordVisibility, setPasswordVisibility] = useState({});

  console.log("Data Source:", tableProps?.dataSource);

  // const togglePasswordVisibility = (recordId: any) => {
  //   setPasswordVisibility((prevState) => ({
  //     ...prevState,
  //     [recordId]: !prevState[recordId], // Alterna la visibilidad para la fila específica
  //   }));
  // };

  //const maskPassword = (password: any) => "•".repeat(password.length);

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="id" />
        <Table.Column
          dataIndex="trading_machine"
          title="TM"
          render={(server, record) => {
            const isVisible = true;

            return (
              <div style={{ display: "flex", alignItems: "center" }}>
                {isVisible ? server : "•".repeat(server.length)}
                <Button
                  type="text"
                  icon={
                    <ShowButton
                      hideText
                      size="small"
                      recordItemId={record.id}
                    />
                  }
                />
              </div>
            );
          }}
        />
        <Table.Column dataIndex="server" title="Server" />
        <Table.Column dataIndex="broker" title="Broker" />
        <Table.Column dataIndex="account" title="Account" />
        <Table.Column
          dataIndex="funding_account"
          title={
            <span>
              Funding <br /> Account
            </span>
          }
        />
        <Table.Column dataIndex="statusCostumer" title="Status" />
        {/* <Table.Column dataIndex="caducidad_server" title="Caducidad" />
        <Table.Column dataIndex="documentId" title="Document ID" /> */}
        {/* 
        <Table.Column dataIndex="location" title="Location" />
        <Table.Column dataIndex="vps" title="VPS" />
        <Table.Column dataIndex="ip" title="Ip" />
        <Table.Column dataIndex="user" title="User" />
        <Table.Column
          dataIndex="password"
          title="Password"
          render={(password, record) => {
            const isVisible = passwordVisibility[record.id] || false; // Valor por defecto: false (oculto)

            return (
              <div style={{ display: "flex", alignItems: "center" }}>
                {isVisible ? password : "•".repeat(password.length)}
                <Button
                  type="text"
                  icon={
                    isVisible ? (
                      <EyeTwoTone
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      />
                    ) : (
                      <EyeInvisibleOutlined
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      />
                    )
                  }
                  onClick={() => togglePasswordVisibility(record.id)} // Pasamos el ID del registro
                  style={{ marginLeft: 8 }}
                />
              </div>
            );
          }}
        /> 
        <Table.Column dataIndex="platform" title="Platform" />

         <Table.Column
          dataIndex="passwordAcount"
          title="Password Acount"
          render={(password, record) => {
            const isVisible = passwordVisibility[record.id] || false; // Valor por defecto: false (oculto)

            return (
              <div style={{ display: "flex", alignItems: "center" }}>
                {isVisible ? password : "•".repeat(password.length)}
                <Button
                  type="text"
                  icon={
                    isVisible ? (
                      <EyeTwoTone
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      />
                    ) : (
                      <EyeInvisibleOutlined
                        onPointerEnterCapture={undefined}
                        onPointerLeaveCapture={undefined}
                      />
                    )
                  }
                  onClick={() => togglePasswordVisibility(record.id)} // Pasamos el ID del registro
                  style={{ marginLeft: 8 }}
                />
              </div>
            );
          }}
        /> 
        <Table.Column dataIndex="bots_installed" title="Bots Installed" />
        <Table.Column dataIndex="createdAt" title="Creación" />
        <Table.Column dataIndex="updatedAt" title="Actualización" />
        <Table.Column dataIndex="publishedAt" title="Publicación" />
        <Table.Column dataIndex="vendor" title="Vendor" />
        <Table.Column dataIndex="costumer" title="Costumer" /> */}

        {/* Columna de Acciones */}
        {/* <Table.Column
          title="Actions"
          render={(_, record) => (
            <Space>
              <ShowButton hideText size="small" recordItemId={record.id} />
              <EditButton hideText size="small" recordItemId={record.id} />
              {record.id}
            </Space>
          )}
        /> */}
      </Table>
    </List>
  );
};

export default ListCustomers;
