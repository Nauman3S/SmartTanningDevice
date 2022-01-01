import "../assets/styles/main.css";
import React, { useEffect, useState, useRef } from "react";
import history from "../utils/CreateBrowserHistory";

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
  Checkbox,
  Divider,
} from "antd";
import Title from "antd/lib/typography/Title";

const { Option } = Select;
const CheckboxGroup = Checkbox.Group;
const plainOptions = [
  "Timestamp(Last Updated)",
  "MachineSerialNumber",
  "MachineType",
  "Device MAC",
  "Alive(Online)",
  "TotalRunningTime",
  "TotalSessionCount",
  "TotalSessionCorrectlyEnded",
  "TotalSessionEndedBeforeTime",
  "StartSession",
  "EndSession",
  "EndSessionType",
  "Temperature",
  "AnemometerSensor",
  "PresencePhases",
  "SensorFilters",
  "LampMaintenance",
  "AnnualMaintenance",
  "ActualLastTemp",
  "HighestTemp",
  "PowerFactorCorrection",
  "CorrectPF",
  "PFDeviationFromOptimalLevel",
  "LastFanSpeed",
  "InputVoltage",
  "Poll",
  "Message",
  "PaymentSystem",
  "InstallDate",
  "Transmit",
];
let defaultCheckedList = [];

let evnObj = {
  Alive: false,
  TotalRunningTime: false,
  TotalSessionCount: false,
  TotalSessionCorrectlyEnded: false,
  TotalSessionEndedBeforeTime: false,
  TotalSessionNotEndedCorrectly: false,
  StartSession: false,
  EndSession: false,
  EndSessionType: false,
  Temperature: false,
  AnemometerSensor: false,
  PresencePhases: false,
  SensorFilters: false,
  LampMaintenance: false,
  AnnualMaintenance: false,
  ActualLastTemp: false,
  HighestTemp: false,
  PowerFactorCorrection: false,
  PFDeviationFromOptimalLevel: false,
  LastFanSpeed: false,
  InputVoltage: false,
  Message: false,
  MachineSerialNumber: false,
  MachineType: false,
  CorrectPF: false,
  PaymentSystem: false,
  InstallDate: false,
  macAddress: false,
  Timestamp: false,
  Poll: false,
  Transmit: false,
};

const Admin = () => {
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
  const [machineType, setMachineType] = useState();
  const [machineSerialNumber, setMachineSerialNumber] = useState();
  const [correctPF, setCorrectPF] = useState();
  const [paymentSystem, setPaymentSystem] = useState();
  const [installDate, setInstallDate] = useState();
  //   const [defaultCheckedList, setDefaultCheckedList] = useState([]);

  // setDefaultCheckedList()

  const [defCheckData, setDefCheckData] = useState([]);

  //checkbox useEffect

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
  const tanningDeviceData = async () => {
    // console.log("Calling");
    await tanningDevice
      .post("/api/mqtt/getOne", {
        macAddress: localStorage.getItem("macAddress"),
      })
      .then((res) => {
        // console.log("Sucess");
        // console.log(res.data);
        localStorage.setItem("LampMaintenance", res.data[0].LampMaintenance);
        localStorage.setItem(
          "AnnualMaintenance",
          res.data[0].AnnualMaintenance
        );
        if (res.data[0].LampMaintenance === "") {
          setData(null);
        } else {
          setData(res.data.reverse());
        }
      })
      .catch((err) => {
        console.log(err);
      });

    await tanningDevice
      .get("/api/check")
      .then((response) => {
        // console.log(response.data[0].Timestamp);
        setCheckedList([
          response.data[0].Timestamp === true ? "Timestamp(Last Updated)" : "",
          response.data[0].MachineSerialNumber === true
            ? "MachineSerialNumber"
            : "",
          response.data[0].MachineType === true ? "MachineType" : "",
          response.data[0].macAddress === true ? "Device MAC" : "",
          response.data[0].Alive === true ? "Alive(Online)" : "",
          response.data[0].TotalRunningTime === true ? "TotalRunningTime" : "",
          response.data[0].TotalSessionCount === true
            ? "TotalSessionCount"
            : "",
          response.data[0].TotalSessionCorrectlyEnded === true
            ? "TotalSessionCorrectlyEnded"
            : "",
          response.data[0].TotalSessionEndedBeforeTime === true
            ? "TotalSessionEndedBeforeTime"
            : "",
          response.data[0].StartSession === true ? "StartSession" : "",
          response.data[0].EndSession === true ? "EndSession" : "",
          response.data[0].EndSessionType === true ? "EndSessionType" : "",
          response.data[0].Temperature === true ? "Temperature" : "",
          response.data[0].AnemometerSensor === true ? "AnemometerSensor" : "",
          response.data[0].PresencePhases === true ? "PresencePhases" : "",
          response.data[0].SensorFilters === true ? "SensorFilters" : "",
          response.data[0].LampMaintenance === true ? "LampMaintenance" : "",
          response.data[0].AnnualMaintenance === true
            ? "AnnualMaintenance"
            : "",
          response.data[0].ActualLastTemp === true ? "ActualLastTemp" : "",
          response.data[0].HighestTemp === true ? "HighestTemp" : "",
          response.data[0].PowerFactorCorrection === true
            ? "PowerFactorCorrection"
            : "",
          response.data[0].CorrectPF === true ? "CorrectPF" : "",
          response.data[0].PFDeviationFromOptimalLevel === true
            ? "PFDeviationFromOptimalLevel"
            : "",
          response.data[0].LastFanSpeed === true ? "LastFanSpeed" : "",
          response.data[0].InputVoltage === true ? "InputVoltage" : "",
          response.data[0].Poll === true ? "Poll" : "",
          response.data[0].Message === true ? "Message" : "",
          response.data[0].PaymentSystem === true ? "PaymentSystem" : "",
          response.data[0].InstallDate === true ? "InstallDate" : "",
          response.data[0].Transmit === true ? "Transmit" : "",
        ]);
        setDefCheckData(response.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });

    await tanningDevice
      .get(`/api/mqttPublishFields/${localStorage.getItem("macAddress")}`)
      .then((res) => {
        console.log(res.data.PaymentSystem);
        setMachineSerialNumber(res.data.MachineSerialNumber);
        setMachineType(res.data.MachineType);
        setCorrectPF(res.data.CorrectPF);
        setPaymentSystem(res.data.PaymentSystem);
        setInstallDate(res.data.InstallDate);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      history.push("/data");
    }
    // console.log("In USE");

    // console.log(checkedList);
    tanningDeviceData();
  }, [macAddress]);
  useEffect(() => {}, [data]);
  useInterval(() => {
    // Make the request here
    tanningDeviceData();
  }, 1000 * 60);

  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  // console.log(checkedList);

  //checkbox functions

  const setVisible = (col) => {
    if (checkedList.includes(col)) {
      // console.log(checkedList))
      return true;
    } else {
      return false;
    }
  };

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
  //   console.log("OBJ");

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

  const environmentCol = [
    {
      title: "Timestamp(Last Updated)",
      dataIndex: "updatedAt",
      key: "Timestamp",
      visible: setVisible("Timestamp(Last Updated)"),
    },
    {
      title: "MachineSerialNumber",
      dataIndex: "MachineSerialNumber",
      key: "MachineSerialNumber",
      visible: setVisible("MachineSerialNumber"),
      render: () => (
        <Input
          placeholder="Serial"
          allowClear
          onChange={onChangeMachineSerialNumber}
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
          placeholder="Type"
          allowClear
          onChange={onChangeMachineType}
          value={machineType}
          size="small"
        />
      ),
    },

    {
      title: "Device MAC",
      key: "macAddress",
      dataIndex: "macAddress",
      align: "center",
      visible: setVisible("Device MAC"),
    },
    {
      title: "Alive(Online)",
      key: "Alive",
      align: "center",
      dataIndex: "Alive",
      visible: setVisible("Alive(Online)"),
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
          // style={{ width: 120 }}
          value={paymentSystem}
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
          // style={{ margin: "100%" }}
          value={installDate}
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
  console.log(paymentSystem);

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
  //   console.log(environmentCol);
  const onChange = (list) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const handleSaveCheck = () => {
    // console.log(environmentCol);
    if (environmentCol.length === 0) {
      tanningDevice.put("/api/check", evnObj).then((res) => {
        message.success("Saved");
      });
    } else {
      environmentCol.map((item) => {
        evnObj[item.key] = item.visible;
      });
      tanningDevice.put("/api/check", evnObj).then((res) => {
        message.success("Saved");
      });
    }
    // console.log(evnObj);
  };

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
    // const id = getIdofLoggedInUser();

    await tanningDevice
      .get(`/api/users/getAllUsersMac`)
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
        <Row style={{ marginTop: 20 }}>
          <Col xs="24">
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              //   title="Smart Tanning Device"
              style={{ padding: 20 }}
            >
              <Checkbox
                indeterminate={indeterminate}
                onChange={onCheckAllChange}
                checked={checkAll}
                span={8}
              >
                Check all
              </Checkbox>
              <Divider />
              <CheckboxGroup
                options={plainOptions}
                value={checkedList}
                onChange={onChange}
                style={{ width: "100%" }}
              />
              <Button
                type="primary"
                className="addDevicebtn"
                onClick={handleSaveCheck}
                style={{
                  marginLeft: "5px",
                  borderRadius: "50px",
                }}
              >
                Save
              </Button>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Admin;
