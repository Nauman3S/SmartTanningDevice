import "../assets/styles/main.css";
import React, { useEffect, useState, useRef } from "react";
import history from "../utils/CreateBrowserHistory";
import LineChart from "../components/chart/LineChart";

import tanningDevice from "../api/tanningDevice";
import {
  Row,
  Col,
  Card,
  Table,
  Input,
  Button,
  BackTop,
  Space,
  Modal,
  Form,
  message,
  Select,
} from "antd";
const { TextArea } = Input;

const { Option } = Select;

// const btnPublish = {
//   paddingLeft: 11,
//   borderRadius: "50px",
//   marginLeft: "10px",
// };

const Data = () => {
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
  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      history.push("/tables");
    }
    // console.log("In USE");
    const tanningDeviceData = () => {
      // console.log("Calling");
      tanningDevice
        .post("/api/mqtt/getOne", {
          macAddress: localStorage.getItem("macAddress"),
        })
        .then((res) => {
          // console.log("Sucess");
          console.log(res.data);
          setData(res.data.reverse());
        })
        .catch((err) => {
          console.log(err);
        });
    };
    tanningDeviceData();
  }, [macAddress]);
  useEffect(() => {}, [data]);
  useInterval(() => {
    // Make the request here
    tanningDevice
      .post("/api/mqtt/getOne", {
        macAddress: localStorage.getItem("macAddress"),
      })
      .then((res) => {
        // console.log("Sucess");
        // localStorage.setItem("macAddress", JSON.stringify(macAddress));
        // console.log(res.data);
        setData(res.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  }, 1000 * 60);

  // const tanningDeviceData = data.map((d) => {
  //   return d;
  // });
  // console.log("AAS");
  // console.log(tanningDeviceData);

  // const soilData = data.map((d) => {
  //   return d.Soil_Parameters[0];
  // });
  //Input Function

  const onChangeMachineType = (e) => {
    console.log(e.target.value);
    publishMsgObj.MachineType = e.target.value;
  };
  const onChangeMachineSerialNumber = (e) => {
    console.log(e.target.value);
    publishMsgObj.MachineSerialNumber = e.target.value;
  };
  const onChangeCorrectPF = (e) => {
    console.log(e.target.value);
    publishMsgObj.CorrectPF = e.target.value;
  };
  const handleChangePaymentSystem = (value) => {
    console.log(value);
    publishMsgObj.PaymentSystem = value;
  };
  const onChangeInstallDate = (e) => {
    console.log(e.target.value);
    publishMsgObj.InstallDate = e.target.value;
  };
  console.log("OBJ");

  const hanldleTransmitClick = () => {
    console.log(JSON.stringify(publishMsgObj));
    publishToMqtt("fieldData", JSON.stringify(publishMsgObj));
  };

  const publishToMqtt = (topic, msg) => {
    let macaddress = localStorage.getItem("macAddress");

    tanningDevice
      .post(`/api/mqtt/publish/${macaddress}/${topic}`, {
        message: msg,
      })
      .then((res) => {
        console.log(res);

        message.success("Message Published");
      })
      .catch((err) => {
        console.log("In err");
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
      key: "updatedAt",
    },
    {
      title: "MachineSerialNumber",
      dataIndex: "MachineSerialNumber",
      key: "MachineSerialNumber",
      render: () => (
        <Input
          // className="tableInput"
          placeholder="Serial"
          allowClear
          onChange={onChangeMachineSerialNumber}
          // style={{ height: "30px" }}
          size="small"
        />
      ),
    },
    {
      title: "MachineType",
      dataIndex: "MachineType",
      key: "MachineType",
      width: 200,

      render: () => (
        <Input
          // classname="tableInput"
          placeholder="Type"
          allowClear
          onChange={onChangeMachineType}
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
    },
    {
      title: "Alive(Online)",
      key: "Alive",
      align: "center",
      dataIndex: "Alive",
    },
    {
      title: "TotalRunningTime",
      key: "TotalRunningTime",
      align: "center",
      dataIndex: "TotalRunningTime",
    },
    {
      title: "TotalSessionCount",
      key: "TotalSessionCount",
      align: "center",
      dataIndex: "TotalSessionCount",
    },
    {
      title: "TotalSessionCorrectlyEnded",
      key: "TotalSessionCorrectlyEnded",
      align: "center",
      dataIndex: "TotalSessionCorrectlyEnded",
    },
    {
      title: "TotalSessionEndedBeforeTime",
      key: "TotalSessionEndedBeforeTime",
      align: "center",
      dataIndex: "TotalSessionEndedBeforeTime",
    },
    {
      title: "StartSession",
      key: "StartSession",
      align: "center",
      dataIndex: "StartSession",
    },
    {
      title: "EndSession",
      key: "EndSession",
      align: "center",
      dataIndex: "EndSession",
    },
    {
      title: "EndSessionType",
      key: "EndSessionType",
      align: "center",
      dataIndex: "EndSessionType",
    },
    {
      title: "Temperature",
      key: "Temperature",
      align: "center",
      dataIndex: "Temperature",
    },
    {
      title: "AnemometerSensor",
      key: "AnemometerSensor",
      align: "center",
      dataIndex: "AnemometerSensor",
    },
    {
      title: "PresencePhases",
      key: "PresencePhases",
      align: "center",
      dataIndex: "PresencePhases",
    },
    {
      title: "SensorFilters",
      key: "SensorFilters",
      align: "center",
      dataIndex: "SensorFilters",
    },
    {
      title: "LampMaintenance",
      key: "LampMaintenance",
      align: "center",
      dataIndex: "LampMaintenance",
    },
    {
      title: "AnnualMaintenance",
      key: "AnnualMaintenance",
      align: "center",
      dataIndex: "AnnualMaintenance",
    },
    {
      title: "ActualLastTemp",
      key: "ActualLastTemp",
      align: "center",
      dataIndex: "ActualLastTemp",
    },
    {
      title: "HighestTemp",
      key: "HighestTemp",
      align: "center",
      dataIndex: "HighestTemp",
    },
    {
      title: "PowerFactorCorrection",
      key: "PowerFactorCorrection",
      align: "center",
      dataIndex: "PowerFactorCorrection",
    },
    {
      title: "CorrectPF",
      key: "CorrectPF",
      align: "center",
      dataIndex: "CorrectPF",
      render: () => (
        <Input
          // classname="tableInput"
          placeholder="Update Serial"
          allowClear
          onChange={onChangeCorrectPF}
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
    },
    {
      title: "LastFanSpeed",
      key: "LastFanSpeed",
      align: "center",
      dataIndex: "LastFanSpeed",
    },
    {
      title: "InputVoltage",
      key: "InputVoltage",
      align: "center",
      dataIndex: "InputVoltage",
    },
    {
      title: "Poll",
      key: "Poll",
      align: "center",
      dataIndex: "Poll",

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
    },
    {
      title: "PaymentSystem",
      key: "PaymentSystem",
      align: "center",
      dataIndex: "PaymentSystem",
      render: () => (
        <Select
          defaultValue="STD"
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
      render: () => (
        <Input
          // classname="tableInput"
          placeholder="Update Serial"
          allowClear
          onChange={onChangeInstallDate}
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

      render: (record) => (
        <Space size="middle">
          <Button type="primary" onClick={hanldleTransmitClick}>
            Transmit
          </Button>
        </Space>
      ),
    },
  ];

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

    return user.id;
  };
  //Form Functions
  const onFinish = async (values) => {
    const id = getIdofLoggedInUser();
    // console.log(id);
    await tanningDevice
      .put(`/api/users/update/${id}`, {
        macAddress: values.macAddress,
      })
      .then((res) => {
        setIsModalVisible(false);
        message.success("Device Added");
      })
      .catch((err) => {
        // console.log("ER");
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

  return (
    <>
      <div className="flex-container" style={{ marginBottom: "10px" }}>
        {/* <Button
          type="primary"
          style={{
            paddingLeft: 11,
            borderRadius: "50px",
          }}
          onClick={executeScroll}
        >
          Soil Parameters
        </Button>
        <Button
          type="primary"
          style={{
            marginLeft: "10px",
            borderRadius: "50px",
          }}
          onClick={executeScroll1}
        >
          Charts
        </Button> */}
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
          onOk={handleOk}
          onCancel={handleCancel}
          destroyOnClose={true}
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
                  pagination={5}
                  dataSource={data}
                  className="ant-border-space"
                />
              </div>
            </Card>
            {/* <div ref={myRef}>
              <Card
                bordered={false}
                className="criclebox tablespace mb-24"
                title="Soil Parameters"
                style={{ marginTop: 50 }}
              >
                <div className="table-responsive">
                  <Table
                    key="soilCol"
                    columns={soilCol}
                    dataSource={soilData}
                    pagination={true}
                    className="ant-border-space"
                  />
                </div>
              </Card>
            </div> */}
          </Col>
        </Row>
      </div>
      {/* <div ref={myRef1} className="layout-content" style={{ marginTop: 50 }}>
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <LineChart
                key="lineChart"
                enData={environmentData}
                soilData={soilData}
                data={data}
              />
            </Card>
          </Col>
        </Row>
      </div> */}
      {/* <BackTop /> */}
    </>
  );
};

export default Data;
