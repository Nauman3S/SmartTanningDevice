import "../assets/styles/main.css";
import React, { useEffect, useState, useRef } from "react";
import history from "../utils/CreateBrowserHistory";
import AdminSettings from "./AdminSettings";

import tanningDevice from "../api/tanningDevice";
import {
  Row,
  Col,
  Card,
  Table,
  Input,
  Button,
  Space,
  Modal,
  Form,
  message,
  Select,
  Popconfirm,
} from "antd";
let flag = 1;

const AccountDetails = () => {
  const [data, setData] = useState([]);
  const [macAddress, setMacAddress] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [form] = Form.useForm();

  form.setFieldsValue({ name: localStorage.getItem("userEmail") });
  const onFinish = async (values) => {
    const hide = message.loading("Processing", 0);
    console.log("onFinish");
    const userid = localStorage.getItem("userId");
    await tanningDevice
      .put(`/api/users/updateUser/${userid}`, {
        email: values.name,
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      })
      .then((response) => {
        console.log(response.data);
        setTimeout(hide, 0);
        if (response.data === "wrong") {
          message.error("Old password not correct");
        } else {
          message.success("Details Updated");
        }
      })
      .catch((err) => {
        setTimeout(hide, 0);

        console.log(err);
      });
  };
  const onFinishFailed = () => {
    console.log("onFinishFailed");
  };

  return (
    <Card
      bordered={false}
      className="criclebox tablespace mb-24"
      title="Account Details"
      style={{ padding: 10, width: "50%" }}
    >
      <Button
        type="primary"
        style={{ margin: 4, alignItems: "right", borderRadius: 50 }}
        onClick={() => {
          if (flag === 1) {
            setDisabled(false);
            flag = 0;
          } else if (flag === 0) {
            setDisabled(true);
            flag = 1;
          }
        }}
      >
        Edit
      </Button>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        className="row-col"
        form={form}
      >
        <Form.Item className="username" label="Username/Email" name="name">
          <Input
            placeholder="Email/Username"
            style={{
              paddingTop: 23.5,
              paddingBottom: 23.5,
              width: "100%",
              borderRadius: 50,
            }}
            disabled={disabled}
          />
        </Form.Item>
        <Form.Item className="username" label="Old Password" name="oldPassword">
          <Input
            placeholder="Old Password"
            style={{
              paddingTop: 23.5,
              paddingBottom: 23.5,
              width: "100%",
              borderRadius: 50,
            }}
            disabled={disabled}
          />
        </Form.Item>
        <Form.Item className="username" label="New Password" name="newPassword">
          <Input
            placeholder="New Password"
            style={{
              paddingTop: 23.5,
              paddingBottom: 23.5,
              width: "100%",
              borderRadius: 50,
            }}
            disabled={disabled}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            disabled={disabled}
            htmlType="submit"
            style={{ width: "100%", borderRadius: 50 }}
          >
            Update
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AccountDetails;
