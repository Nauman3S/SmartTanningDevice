import { Menu, Upload, message, Button, Form, Input, Divider } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useState } from "react";

import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/favicon.png";
// import smartAgri from "../../api/smartAgri";

function Sidenav({ color }) {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");
  // const [dta, setDta] = useState(null);
  // const [uploadList, setUploadList] = useState(true);

  // const uploadFile = () => {
  //   const data = new FormData();

  //   data.append("file", dta);

  //   smartAgri
  //     .post("/api/fileUpload", data, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       setUploadList(false);

  //       message.success("Upload Successfully");
  //     })
  //     .catch((err) => {
  //       console.log("In err");
  //       setUploadList(false);
  //       message.error("Cant Upload");
  //       console.log(err);
  //     });
  // };

  const tables = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M9 2C8.44772 2 8 2.44772 8 3C8 3.55228 8.44772 4 9 4H11C11.5523 4 12 3.55228 12 3C12 2.44772 11.5523 2 11 2H9Z"
        fill={color}
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 5C4 3.89543 4.89543 3 6 3C6 4.65685 7.34315 6 9 6H11C12.6569 6 14 4.65685 14 3C15.1046 3 16 3.89543 16 5V16C16 17.1046 15.1046 18 14 18H6C4.89543 18 4 17.1046 4 16V5ZM7 9C6.44772 9 6 9.44772 6 10C6 10.5523 6.44772 11 7 11H7.01C7.56228 11 8.01 10.5523 8.01 10C8.01 9.44772 7.56228 9 7.01 9H7ZM10 9C9.44772 9 9 9.44772 9 10C9 10.5523 9.44772 11 10 11H13C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9H10ZM7 13C6.44772 13 6 13.4477 6 14C6 14.5523 6.44772 15 7 15H7.01C7.56228 15 8.01 14.5523 8.01 14C8.01 13.4477 7.56228 13 7.01 13H7ZM10 13C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15H13C13.5523 15 14 14.5523 14 14C14 13.4477 13.5523 13 13 13H10Z"
        fill={color}
      ></path>
    </svg>,
  ];

  // const publishToMqtt = (topic, msg) => {
  //   let macaddress = localStorage.getItem("macAddress");

  //   smartAgri
  //     .post(`/api/mqtt/publish/${macaddress}/${topic}`, {
  //       message: msg,
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       setUploadList(false);

  //       message.success("Message Published");
  //     })
  //     .catch((err) => {
  //       console.log("In err");
  //       setUploadList(false);
  //       message.error("Cant Upload");
  //       console.log(err);
  //     });
  // };

  // const handleRe1 = () => {
  //   publishToMqtt("relay", "1");
  // };
  // const handleRe2 = () => {
  //   publishToMqtt("relay", "2");
  // };
  // const handleRe3 = () => {
  //   publishToMqtt("relay", "3");
  // };
  // const onFinish = (values) => {
  //   console.log(values.settings);
  //   publishToMqtt("settings", values.settings);
  // };

  // const onFinishFailed = () => {};
  // const beforeUpload = (file) => {
  //   console.log(file);
  //   setDta(file);
  //   console.log("INFOLEreder");

  //   return false;
  // };
  // const btnPublish = {
  //   marginTop: "20px",
  //   // marginLeft: "0px",
  //   borderRadius: "50px",
  //   width: "100%",
  // };
  return (
    <>
      <div className="brand">
        <img src={logo} alt="" />
        <span>Smart Tanning Device</span>
      </div>
      <hr />
      <Menu theme="light" mode="inline">
        <Menu.Item key="1">
          <NavLink to="/data">
            <span
              className="icon"
              style={{
                background: page === "tables" ? color : "",
              }}
            >
              {tables}
            </span>
            <span className="label">Data</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink to="/settings">
            <span
              className="icon"
              style={{
                background: page === "tables" ? color : "",
              }}
            >
              {tables}
            </span>
            <span className="label">Settings</span>
          </NavLink>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default Sidenav;
