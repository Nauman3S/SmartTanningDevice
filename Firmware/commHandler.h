
#define RXD2 16
#define TXD2 17
String dataV = "";
String tempValue = "";
String DataToSend = "";
String tempDataString = "";
void sendData_UVCommander(String d)
{
    DataToSend = d;
}
int checkCommand(String d, String c)
{
    int vv = d.indexOf(c);
    return vv;
}

void pollAnswer(String a)
{
    Serial2.println(a);
}

void sendToUVCommander()
{
    if (DataToSend.length() > 0)
    {
        pollAnswer(DataToSend);
        DataToSend = "";
    }
    else
    {
        pollAnswer("ALIVE OK");
    }
}
void sendMACAddress()
{
    Serial2.print("MAC Address: ");
    Serial2.println(ss.getMacAddress());
}
void setupCommsHandler()
{
    Serial2.begin(9600, SERIAL_8N1, RXD2, TXD2);
}
void checkAndPublishData(String topic, String msg)
{
    deviceExisits = 1;
    if (deviceExisits == 1)
    {
        mqttPublish(topic, msg);
    }
}
uint8_t UVCommanderPollHandler()
{
    if (Serial2.available())
    {
        dataV = Serial2.readStringUntil('\n');

        if (checkCommand(dataV, "ALIVE") >= 0)
        {
            //pollAnswer("ALIVE OK");
            sendToUVCommander();
            return 1;
        }

        else if (checkCommand(dataV, "HELLO") >= 0)
        {
            pollAnswer("OK - SERIAL");
            return 1;
        }

        else if (checkCommand(dataV, "BLOCK") >= 0)
        {
            DataToSend = "";
            return 1;
        }

        else if (checkCommand(dataV, "MESSAGE") >= 0)
        {
            DataToSend = "";
            tempValue = ss.StringSeparator(dataV, ' ', 1);
            Message = dataV;
            genJSON();
            sendJSON();
            pollAnswer(String("MESSAGE ") + ss.getMacAddress() + String(";") + tempValue);

            return 1;
        }

        else if (checkCommand(dataV, "PAYMENT") >= 0)
        {
            DataToSend = "";

            return 1;
        }
        else if (checkCommand(dataV, "NO INTERNET") >= 0)
        {
            DataToSend = "";
            return 1;
        }
        else if (checkCommand(dataV, "START") >= 0)
        {
            tempValue = ss.StringSeparator(dataV, ' ', 1);

            StartSession = tempValue;
            int trt = TotalRunningTime.toInt() + tempValue.toInt();
            int tsc = TotalSessionCount.toInt() + 1;
            tempDataString = String(trt) + String(",") + String(tsc) + String(",") + TotalSessionCorrectlyEnded + String(",") + TotalSessionEndedBeforeTime;
            writeData(tempDataString.c_str());

            genJSON();
            sendJSON();
            pollAnswer(String("START ") + tempValue);
            pollAnswer(String("START ") + ss.getMacAddress() + String(";") + tempValue);
            return 1;
        }

        else if (checkCommand(dataV, "STOP") >= 0)
        {
            tempValue = ss.StringSeparator(dataV, ' ', 1);
            EndSession = tempValue;
            genJSON();
            sendJSON();
            pollAnswer(String("STOP ") + ss.getMacAddress() + String(";") + tempValue);
            return 1;
        }

        else if (checkCommand(dataV, "TEMP") >= 0)
        {
            tempValue = ss.StringSeparator(dataV, ' ', 1);
            Temperature = tempValue;
            genJSON();
            sendJSON();
            pollAnswer(String("TEMP ") + ss.getMacAddress() + String(";") + tempValue);

            return 1;
        }

        else if (checkCommand(dataV, "FILTER") >= 0)
        {
            tempValue = ss.StringSeparator(dataV, ' ', 1);
            SensorFilters = tempValue;
            genJSON();
            sendJSON();
            pollAnswer(String("FILTER ") + ss.getMacAddress() + String(";") + tempValue);
            return 1;
        }

        else if (checkCommand(dataV, "LAMP") >= 0)
        {
            tempValue = ss.StringSeparator(dataV, ' ', 1);
            LampMaintenance = tempValue;
            genJSON();
            sendJSON();
            pollAnswer(String("LAMP ") + ss.getMacAddress() + String(";") + tempValue);
            return 1;
        }

        else if (checkCommand(dataV, "YEAR") >= 0)
        {
            tempValue = ss.StringSeparator(dataV, ' ', 1);
            AnnualMaintenance = tempValue;
            genJSON();
            sendJSON();
            pollAnswer(String("YEAR ") + ss.getMacAddress() + String(";") + tempValue);

            return 1;
        }

        else if (checkCommand(dataV, "AMP") >= 0)
        {
            tempValue = ss.StringSeparator(dataV, ' ', 1);
            checkAndPublishData("tanning-device/updateAmp", ss.getMacAddress() + String(";") + tempValue);
            return 1;
        }

        else if (checkCommand(dataV, "VENT") >= 0)
        {
            tempValue = ss.StringSeparator(dataV, ' ', 1);
            checkAndPublishData("tanning-device/updateVent", ss.getMacAddress() + String(";") + tempValue);
            return 1;
        }

        else if (checkCommand(dataV, "VOLT") >= 0)
        {
            tempValue = ss.StringSeparator(dataV, ' ', 1);
            InputVoltage = tempValue;
            genJSON();
            sendJSON();
            pollAnswer(String("VOLT ") + ss.getMacAddress() + String(";") + tempValue);
            return 1;
        }

        else if (checkCommand(dataV, "RST") >= 0)
        {
            tempValue = ss.StringSeparator(dataV, ' ', 1);
            checkAndPublishData("tanning-device/updateRst", ss.getMacAddress() + String(";") + tempValue);
            pollAnswer(String("RST ") + ss.getMacAddress() + String(";") + tempValue);
            return 1;
        }
        else
        {
            return 0;
        }
    }
}