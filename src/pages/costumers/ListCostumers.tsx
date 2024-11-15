import { useTable, List, ShowButton } from "@refinedev/antd";
import { Table, Button } from "antd";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const renderAccounts = (server: any, record: any) => {
    const isVisible = true;

    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        {isVisible ? server : "•".repeat(server?.length || 0)}
        <Button
          type="text"
          onClick={() =>
            navigate(`/trading-server-machines/${record.id}/accounts`)
          }
          icon={<ShowButton hideText size="small" recordItemId={record?.id} />}
        />
      </div>
    );
  };

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
                      recordItemId={`${record.id}`}
                    />
                  }
                />
              </div>
            );
          }}
        />
        <Table.Column dataIndex="server" title="Server" />
        <Table.Column dataIndex="broker" title="Broker" />
        {/* <Table.Column
          dataIndex="account"
          title="Account"
          render={(account, record) => (
            <div style={{ display: "flex", alignItems: "center" }}>
              {account} 
              <Button
                type="text"
                onClick={() =>
                  navigate(`/trading-server-machines/${record.id}/accounts`)
                }
                icon={
                  <ShowButton hideText size="small" recordItemId={record.id} />
                }
              />
            </div>
          )}
        /> */}
        // ... otras columnas ...
        <Table.Column
          title="Acciones"
          render={
            (_, record) => renderAccounts(record.account, record) // Pasa el server real
          }
        />
        <Table.Column
          dataIndex="funding_account"
          title={
            <span>
              Funding <br /> Account
            </span>
          }
        />
        <Table.Column dataIndex="statusCostumer" title="Status" />
      </Table>
    </List>
  );
};

export default ListCustomers;
