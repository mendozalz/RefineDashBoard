import { useForm, Edit } from "@refinedev/antd";

import { Form, Input } from "antd";
import { EditButton } from "../../components/EditButton";

const EditTradingMachine = () => {
  const { formProps, saveButtonProps } = useForm({
    redirect: "show",
    meta: {
      fields: ["documentId"], // Aseguramos que documentId esté incluido
    },
  });

  const initialValues = formProps.initialValues?.data?.[0] || {};

  /* console.log(
    `Que desvuelve formProps: ${JSON.stringify(initialValues, null, 2)}`
  ); */

  const documentId = formProps?.initialValues?.data[0].documentId;

 //console.log(`formProps en Edit: ${JSON.stringify(documentId, null, 2)}`);
 

  return (
    <Edit saveButtonProps={saveButtonProps} recordItemId={documentId}>
      <Form {...formProps} initialValues={initialValues} id={documentId} layout="vertical">
      <Form.Item label="documentId" name="documentId">
          <Input />
        </Form.Item>
        <Form.Item label="Server" name="server">
          <Input />
        </Form.Item>
        <Form.Item label="Account" name="account">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Edit>
  );
};

export default EditTradingMachine;
