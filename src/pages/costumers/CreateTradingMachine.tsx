import { useForm, Create } from "@refinedev/antd";
import { Form, Input } from "antd";
import { IResourceComponentsProps } from "@refinedev/core";

interface ITradingMachine {
  server: string;
  account: string;
}

const CreateTradingMachine: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps } = useForm<ITradingMachine>({
    redirect: "edit",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item 
          label="Server" 
          name="server"
          rules={[{ required: true, message: 'Por favor ingresa el servidor' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
          label="Account" 
          name="account"
          rules={[{ required: true, message: 'Por favor ingresa la cuenta' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Create>
  );
};

export default CreateTradingMachine;
