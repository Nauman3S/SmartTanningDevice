import React, { useState } from "react";

import tanningDevice from "../api/tanningDevice";
import { Layout, Button, Typography, Card, Form, Input, message } from "antd";

import { Link } from "react-router-dom";
import history from "../utils/CreateBrowserHistory";

const { Title } = Typography;
const { Header, Footer, Content } = Layout;
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onFinish = async () => {
    const hide = message.loading("Processing", 0);
    await tanningDevice
      .post("/api/users/register", {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      })
      .then((res) => {
        setTimeout(hide, 0);
        message.success("Signed Up Successfully!");
        console.log("Signed Up Successfully!");
        localStorage.setItem("user-info", JSON.stringify(res));
        history.push("/sign-in");

        console.log(res);
      })
      .catch((err) => {
        setTimeout(hide, 0);
        message.error(
          "Something went wrong!, please check your internet connection and try again"
        );

        console.log(err);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div className="layout-default ant-layout layout-sign-up">
        <Header>
          <div className="header-col header-brand">
            <h5>Smart Tanning Device</h5>
          </div>
        </Header>

        <Content className="p-0">
          <div className="sign-up-header">
            <Title style={{ color: "white" }}>Sign Up</Title>
          </div>

          <Card
            className="card-signup header-solid h-full ant-card pt-0 card-my"
            title={<h5>Register</h5>}
            bordered="false"
            style={{ marginTop: 50 }}
          >
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className="row-col"
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
                onChange={(e) => setEmail(e.target.value)}
              >
                <Input
                  placeholder="Email"
                  style={{ paddingTop: 23.5, paddingBottom: 23.5 }}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
                onChange={(e) => setPassword(e.target.value)}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
              <Form.Item
                name="confrimPassword"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Confirm Password!",
                  },
                ]}
                onChange={(e) => setConfirmPassword(e.target.value)}
              >
                <Input.Password placeholder="Confirm Password" />
              </Form.Item>

              <Form.Item>
                <Button
                  style={{ width: "100%" }}
                  type="primary"
                  htmlType="submit"
                >
                  SIGN UP
                </Button>
              </Form.Item>
            </Form>
            <p className="font-semibold text-muted text-center">
              Already have an account?{" "}
              <Link to="/sign-in" className="font-bold text-dark">
                Sign In
              </Link>
            </p>
          </Card>
        </Content>
        <Footer>
          <p className="copyright"> Copyright © 2021</p>
        </Footer>
      </div>
    </>
  );
};

export default SignUp;
