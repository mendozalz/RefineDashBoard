import React from "react";
import { AuthPage } from "@refinedev/antd";
import { icons } from "antd/es/image/PreviewGroup";

const Login = () => {
  return (
    <AuthPage
      type="login"
      title="INVENTEK"
      formProps={{
        initialValues: {
          email: "mendozalz@mendozalz.com",
          password: "demodemo",
        },
      }}
    />
  );
};

export default Login;
