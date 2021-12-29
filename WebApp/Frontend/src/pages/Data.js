import "../assets/styles/main.css";
import React, { useEffect, useState, useRef } from "react";
import history from "../utils/CreateBrowserHistory";

import tanningDevice from "../api/tanningDevice";
import Admin from "./Admin";
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
} from "antd";

const { Option } = Select;

const Data = () => {
  // if (localStorage.getItem("user-info")) {
  //   history.push("/tables");
  // } else {
  //   history.push("/sign-in");
  // }
  const myRef = useRef(null);
  const myRef1 = useRef(null);
  let publishMsgObj = {
    MachineSerialNumber: "",
    MachineType: "",
    CorrectPF: "",
    PaymentSystem: "",
    InstallDate: "",
  };

  const [data, setData] = useState([]);
  const [macAddress, setMacAddress] = useState("");
  const [userMacAddress, setUserMacAddress] = useState([]);
  const [userType, setUserType] = useState("");
  const [checkedList, setCheckedList] = useState({});
  const [machineType, setMachineType] = useState();
  const [machineSerialNumber, setMachineSerialNumber] = useState();
  const [correctPF, setCorrectPF] = useState();
  const [paymentSystem, setPaymentSystem] = useState();
  const [installDate, setInstallDate] = useState();

  // let intervalId = null;

  // const executeScroll = () => myRef.current.scrollIntoView();
  // const executeScroll1 = () => myRef1.current.scrollIntoView();

  const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  };
  const tanningDeviceData = () => {
    if (localStorage.getItem("user-info")) {
      history.push("/data");
    } else {
      history.push("/sign-in");
    }
    // console.log("Calling");
    tanningDevice
      .post("/api/mqtt/getOne", {
        macAddress: localStorage.getItem("macAddress"),
      })
      .then((res) => {
        // console.log("Sucess");
        console.log(res.data[0]);
        localStorage.setItem("LampMaintenance", res.data[0].LampMaintenance);
        localStorage.setItem(
          "AnnualMaintenance",
          res.data[0].AnnualMaintenance
        );

        if (res.data[0].LampMaintenance === "") {
          setData(null);
        } else {
          setData(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    tanningDevice
      .get("/api/check")
      .then((res) => {
        // console.log(res.data[0]);
        setCheckedList(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });

    tanningDevice
      .get(`/api/mqttPublishFields/${localStorage.getItem("macAddress")}`)
      .then((res) => {
        console.log(res.data);
        setMachineSerialNumber(res.data.MachineSerialNumber);
        setMachineType(res.data.MachineType);
        setCorrectPF(res.data.CorrectPF);
        setPaymentSystem(res.data.PaymentSystem);
        setInstallDate(res.data.InstallDate);
      });
  };
  useEffect(() => {
    // console.log("In USE");

    tanningDeviceData();
    return () => {};
  }, [macAddress]);
  // console.log(checkedList);
  useEffect(() => {}, [data]);
  useInterval(() => {
    // Make the request here
    // if(localStorage.getItem("macAddress"))

    tanningDeviceData();
  }, 1000 * 60);

  //Input Function

  const onChangeMachineType = (e) => {
    // console.log(e.target.value);
    publishMsgObj.MachineType = e.target.value;
    setMachineType(e.target.value);
  };
  const onChangeMachineSerialNumber = (e) => {
    // console.log(e.target.value);
    publishMsgObj.MachineSerialNumber = e.target.value;
    setMachineSerialNumber(e.target.value);
  };
  const onChangeCorrectPF = (e) => {
    // console.log(e.target.value);
    publishMsgObj.CorrectPF = e.target.value;
    setCorrectPF(e.target.value);
  };
  const handleChangePaymentSystem = (value) => {
    // console.log(value);
    publishMsgObj.PaymentSystem = value;
    setPaymentSystem(value);
  };
  const onChangeInstallDate = (e) => {
    // console.log(e.target.value);
    publishMsgObj.InstallDate = e.target.value;
    setInstallDate(e.target.value);
  };
  // console.log("OBJ");

  const hanldleTransmitClick = () => {
    // console.log(JSON.stringify(publishMsgObj));
    publishToMqtt("fieldData", JSON.stringify(publishMsgObj));
  };

  const publishToMqtt = (topic, msg) => {
    let macaddress = localStorage.getItem("macAddress");

    tanningDevice
      .post(`/api/mqtt/publish/${macaddress}/${topic}`, {
        message: msg,
      })
      .then((res) => {
        // console.log(res);

        message.success("Message Published");
      })
      .catch((err) => {
        // console.log("In err");
        console.log(err);
      });
  };
  const handlePollClick = () => {
    publishToMqtt("poll", "poll");
  };

  const setVisible = (visible) => {
    // console.log(checkedList[`${visible}`]);
    if (checkedList[`${visible}`] === true) {
      return true;
    } else {
      return false;
    }
  };

  const environmentCol = [
    {
      title: "Timestamp(Last Updated)",
      dataIndex: "updatedAt",
      key: "updatedAt",
      visible: setVisible("Timestamp"),
    },
    {
      title: "MachineSerialNumber",
      dataIndex: "MachineSerialNumber",
      key: "MachineSerialNumber",
      visible: setVisible("MachineSerialNumber"),

      render: () => (
        <Input
          // className="tableInput"
          placeholder="Serial"
          allowClear
          onChange={onChangeMachineSerialNumber}
          // style={{ height: "30px" }}
          value={machineSerialNumber}
          size="small"
        />
      ),
    },
    {
      title: "MachineType",
      dataIndex: "MachineType",
      key: "MachineType",
      width: 200,

      visible: setVisible("MachineType"),

      render: () => (
        <Input
          // classname="tableInput"
          placeholder="Type"
          allowClear
          onChange={onChangeMachineType}
          value={machineType}
          // style={{ height: "30px" }}
          size="small"
        />
      ),
    },

    {
      title: "Device MAC",
      key: "macAddress",
      dataIndex: "macAddress",
      align: "center",
      visible: setVisible("macAddress"),
    },
    {
      title: "Alive(Online)",
      key: "Alive",
      align: "center",
      dataIndex: "Alive",
      visible: setVisible("Alive"),
    },
    {
      title: "TotalRunningTime",
      key: "TotalRunningTime",
      align: "center",
      dataIndex: "TotalRunningTime",
      visible: setVisible("TotalRunningTime"),
    },
    {
      title: "TotalSessionCount",
      key: "TotalSessionCount",
      align: "center",
      dataIndex: "TotalSessionCount",
      visible: setVisible("TotalSessionCount"),
    },
    {
      title: "TotalSessionCorrectlyEnded",
      key: "TotalSessionCorrectlyEnded",
      align: "center",
      dataIndex: "TotalSessionCorrectlyEnded",
      visible: setVisible("TotalSessionCorrectlyEnded"),
    },
    {
      title: "TotalSessionEndedBeforeTime",
      key: "TotalSessionEndedBeforeTime",
      align: "center",
      dataIndex: "TotalSessionEndedBeforeTime",
      visible: setVisible("TotalSessionEndedBeforeTime"),
    },
    {
      title: "StartSession",
      key: "StartSession",
      align: "center",
      dataIndex: "StartSession",
      visible: setVisible("StartSession"),
    },
    {
      title: "EndSession",
      key: "EndSession",
      align: "center",
      dataIndex: "EndSession",
      visible: setVisible("EndSession"),
    },
    {
      title: "EndSessionType",
      key: "EndSessionType",
      align: "center",
      dataIndex: "EndSessionType",
      visible: setVisible("EndSessionType"),
    },
    {
      title: "Temperature",
      key: "Temperature",
      align: "center",
      dataIndex: "Temperature",
      visible: setVisible("Temperature"),
    },
    {
      title: "AnemometerSensor",
      key: "AnemometerSensor",
      align: "center",
      dataIndex: "AnemometerSensor",
      visible: setVisible("AnemometerSensor"),
    },
    {
      title: "PresencePhases",
      key: "PresencePhases",
      align: "center",
      dataIndex: "PresencePhases",
      visible: setVisible("PresencePhases"),
    },
    {
      title: "SensorFilters",
      key: "SensorFilters",
      align: "center",
      dataIndex: "SensorFilters",
      visible: setVisible("SensorFilters"),
    },
    {
      title: "LampMaintenance",
      key: "LampMaintenance",
      align: "center",
      // dataIndex: "LampMaintenance",
      visible: setVisible("LampMaintenance"),

      render: (record) => {
        return {
          props: {
            style: {
              background:
                record.LampMaintenance === "KO" ? "#ee9090" : "#90ee90",
            },
          },
          children: record.LampMaintenance,
        };
      },
    },
    {
      title: "AnnualMaintenance",
      key: "AnnualMaintenance",
      align: "center",
      // dataIndex: "AnnualMaintenance",
      visible: setVisible("AnnualMaintenance"),
      render: (record) => {
        return {
          props: {
            style: {
              background:
                record.AnnualMaintenance === "KO" ? "#ee9090" : "#90ee90",
            },
          },
          children: record.AnnualMaintenance,
        };
      },
    },
    {
      title: "ActualLastTemp",
      key: "ActualLastTemp",
      align: "center",
      dataIndex: "ActualLastTemp",
      visible: setVisible("ActualLastTemp"),
    },
    {
      title: "HighestTemp",
      key: "HighestTemp",
      align: "center",
      dataIndex: "HighestTemp",
      visible: setVisible("HighestTemp"),
    },
    {
      title: "PowerFactorCorrection",
      key: "PowerFactorCorrection",
      align: "center",
      dataIndex: "PowerFactorCorrection",
      visible: setVisible("PowerFactorCorrection"),
    },
    {
      title: "CorrectPF",
      key: "CorrectPF",
      align: "center",
      dataIndex: "CorrectPF",
      visible: setVisible("CorrectPF"),
      render: () => (
        <Input
          // classname="tableInput"
          placeholder="Update Serial"
          allowClear
          onChange={onChangeCorrectPF}
          value={correctPF}
          // style={{ height: "30px" }}
          size="small"
        />
      ),
    },
    {
      title: "PFDeviationFromOptimalLevel",
      key: "PFDeviationFromOptimalLevel",
      align: "center",
      dataIndex: "PFDeviationFromOptimalLevel",
      visible: setVisible("PFDeviationFromOptimalLevel"),
    },
    {
      title: "LastFanSpeed",
      key: "LastFanSpeed",
      align: "center",
      dataIndex: "LastFanSpeed",
      visible: setVisible("LastFanSpeed"),
    },
    {
      title: "InputVoltage",
      key: "InputVoltage",
      align: "center",
      dataIndex: "InputVoltage",
      visible: setVisible("InputVoltage"),
    },
    {
      title: "Poll",
      key: "Poll",
      align: "center",
      dataIndex: "Poll",

      visible: setVisible("Poll"),
      render: (record) => (
        <Space size="middle">
          <Button type="primary" onClick={handlePollClick}>
            Poll
          </Button>
        </Space>
      ),
    },

    {
      title: "Message",
      key: "Message",
      align: "center",
      dataIndex: "Message",
      visible: setVisible("Message"),
    },
    {
      title: "PaymentSystem",
      key: "PaymentSystem",
      align: "center",
      dataIndex: "PaymentSystem",
      visible: setVisible("PaymentSystem"),
      render: () => (
        <Select
          // defaultValue={`${paymentSystem}`}
          value={paymentSystem}
          // style={{ width: 120 }}
          onChange={handleChangePaymentSystem}
        >
          <Option value="STD">STD</Option>
          <Option value="CARD">CARD</Option>
          <Option value="TOKEN">TOKEN</Option>
          <Option value="EXT">EXT</Option>
        </Select>
      ),
    },
    {
      title: "InstallDate",
      key: "InstallDate",
      dataIndex: "InstallDate",
      align: "center",
      visible: setVisible("InstallDate"),
      render: () => (
        <Input
          // classname="tableInput"
          placeholder="Update Serial"
          allowClear
          onChange={onChangeInstallDate}
          value={installDate}
          // style={{ margin: "100%" }}
          size="small"
        />
      ),
    },
    {
      title: "Transmit",
      key: "Transmit",
      align: "center",
      dataIndex: "Transmit",

      visible: setVisible("Transmit"),
      render: (record) => (
        <Space size="middle">
          <Button type="primary" onClick={hanldleTransmitClick}>
            Transmit
          </Button>
          <Button type="primary" onClick={handleSaveFieldsData}>
            Save
          </Button>
        </Space>
      ),
    },
  ].filter((item) => item.visible === true);

  const handleSaveFieldsData = async () => {
    let selectedMacAddress = localStorage.getItem("macAddress");
    await tanningDevice
      .put(`/api/mqttPublishFields/save/${selectedMacAddress}`, {
        MachineSerialNumber: machineSerialNumber,
        MachineType: machineType,
        CorrectPF: correctPF,
        PaymentSystem: paymentSystem,
        InstallDate: installDate,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //Modal Functions
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getIdofLoggedInUser = () => {
    function parseJwt(token) {
      if (!token) {
        return;
      }
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace("-", "+").replace("_", "/");
      return JSON.parse(window.atob(base64));
    }

    const token = localStorage.getItem("user-info");
    const user = parseJwt(token);
    // console.log(user.id);

    return user.id;
  };
  //Form Functions
  const onFinish = async (values) => {
    const id = getIdofLoggedInUser();
    const hide = message.loading("Processing", 0);
    // console.log(id);
    await tanningDevice
      .put(`/api/users/update/${id}`, {
        macAddress: values.macAddress,
      })
      .then((res) => {
        // Dismiss manually and asynchronously
        setTimeout(hide, 0);

        setIsModalVisible(false);
        message.success("Device Added");
      })
      .catch((err) => {
        // console.log("ER");
        // message.
        // setIsModalVisible(false);
        setTimeout(hide, 0);

        message.warn("Device Already Exists");

        console.log(err);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  //Select Functions
  function handleChange(value) {
    localStorage.setItem("macAddress", value);

    setMacAddress(localStorage.getItem("macAddress", value));

    // console.log(`selected ${localStorage.getItem("macAddress", value)}`);
  }

  const getMacAddresses = async () => {
    console.log("in get");
    const id = getIdofLoggedInUser();

    await tanningDevice
      .get(`/api/users/getMacAddress/${id}`)
      .then((res) => {
        setUserMacAddress(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const renderedOptions = userMacAddress.map((macadd) => {
    if (macadd) {
      return (
        <Option key={`${macadd}`} value={`${macadd}`}>
          {macadd}
        </Option>
      );
    } else {
      return;
    }
  });
  if (localStorage.getItem("userType") === "user") {
    return (
      <>
        <div className="flex-container" style={{ marginBottom: "10px" }}>
          <Button
            type="primary"
            className="addDevicebtn"
            onClick={showModal}
            style={{
              marginLeft: "5px",
              borderRadius: "50px",
            }}
          >
            Add New Device
          </Button>
          <Modal
            title="Add a New Device"
            visible={isModalVisible}
            // onOk={handleOk}
            onCancel={handleCancel}
            destroyOnClose={true}
            footer={null}
          >
            <Form
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout="vertical"
              className="row-col"
            >
              <Form.Item
                className="username"
                label="Mac Address"
                name="macAddress"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Device MacAddress",
                  },
                ]}
              >
                <Input
                  placeholder="Enter MacAddress"
                  style={{ paddingTop: 23.5, paddingBottom: 23.5 }}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  Add
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>

        <Select
          className="mac-search"
          defaultValue={localStorage.getItem("macAddress")}
          style={{ width: 120, borderRadius: "150px", marginBottom: "15px" }}
          onChange={handleChange}
          onClick={getMacAddresses}
        >
          {renderedOptions}
        </Select>
        <div className="tabled">
          <Row gutter={[24, 0]}>
            <Col xs="24" xl={24}>
              <Card
                bordered={false}
                className="criclebox tablespace mb-24"
                title="Smart Tanning Device"
              >
                <div className="table-responsive">
                  <Table
                    key="enCol"
                    columns={environmentCol}
                    pagination={false}
                    dataSource={data}
                    className="ant-border-space"
                  />
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  } else if (localStorage.getItem("userType") === "admin") {
    return <Admin />;
  } else {
    return <h1>Data</h1>;
  }
};

export default Data;
