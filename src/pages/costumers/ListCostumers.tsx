import { useTable, List, ShowButton } from "@refinedev/antd";
import { Table, Button, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { DeleteButton } from "../../components/DeleteButton";

const ListCustomers = () => {
  const { tableProps, setFilters } = useTable({
    resource: "trading-server-machines",
    syncWithLocation: true,
  });

 /*  console.log("Data Source:", tableProps?.dataSource); */

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

  const handleDeleteSuccess = () => {
    // Recargar la tabla después de eliminar
    setFilters([], "replace");
  };

  console.log(`tableProps: ${JSON.stringify(tableProps, null, 2)}`);
  

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column
          dataIndex="trading_machine"
          title="TM"
          render={(server, record) => {
            const isVisible = true;
            //console.log("Record data:", JSON.stringify(record, null, 2));
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
        <Table.Column
          title="Acciones"
          render={(_, record: any) => (
            <Space>
              {renderAccounts(record.account, record)}
              <DeleteButton 
                documentId={record.documentId} 
                onSuccess={handleDeleteSuccess}
              />
            </Space>
          )}
        />
        <Table.Column dataIndex="funding_account" title="Funding Account" />
        <Table.Column dataIndex="statusCostumer" title="Status" />
      </Table>
    </List>
  );
};

export default ListCustomers;
