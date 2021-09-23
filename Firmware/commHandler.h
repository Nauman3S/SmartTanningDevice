
#define RXD2 16
#define TXD2 17
String dataV = "";
String tempValue = "";

int checkCommand(String d, String c)
{
    int vv = d.indexOf(c);
    return vv;
}

void pollAnswer(String a)
{
    Serial2.println(a);
}
void setupCommsHandler()
{
    Serial2.begin(9600, SERIAL_8N1, RXD2, TXD2);
}
void checkAndPublishData(String topic, String msg)
{
    if (deviceExisits == 1)
    {
        checkAndPublishData(topic, msg);
    }
}
void UVCommanderPollHandler()
{
    if (Serial2.available())
    {
        dataV = Serial2.readString();
        if (checkCommand(dataV, "ALIVE") >= 0)
        {
            pollAnswer("ALIVE OK");
        }

        if (checkCommand(dataV, "HELLO") >= 0)
        {
            pollAnswer("OK - SERIAL");
        }

        if (checkCommand(dataV, "START") >= 0)
        {
            tempValue = ss.StringSeparator(dataV, ' ', 1);
            checkAndPublishData("tanning-device/updateStartSession", ss.getMacAddress() + String(";") + tempValue);
        }

        if (checkCommand(dataV, "STOP") >= 0)
        {
            tempValue = ss.StringSeparator(dataV, ' ', 1);
            checkAndPublishData("tanning-device/updateStopSession", ss.getMacAddress() + String(";") + tempValue);
        }

        if (checkCommand(dataV, "TEMP") >= 0)
        {
            tempValue = ss.StringSeparator(dataV, ' ', 1);
            checkAndPublishData("tanning-device/updateTemp", ss.getMacAddress() + String(";") + tempValue);
        }

        if (checkCommand(dataV, "FILTER") >= 0)
        {
            tempValue = ss.StringSeparator(dataV, ' ', 1);
            checkAndPublishData("tanning-device/updateFilter", ss.getMacAddress() + String(";") + tempValue);
        }

        if (checkCommand(dataV, "LAMP") >= 0)
        {
            tempValue = ss.StringSeparator(dataV, ' ', 1);
            checkAndPublishData("tanning-device/updateLamp", ss.getMacAddress() + String(";") + tempValue);
        }

        if (checkCommand(dataV, "YEAR") >= 0)
        {
            tempValue = ss.StringSeparator(dataV, ' ', 1);
            checkAndPublishData("tanning-device/updateYear", ss.getMacAddress() + String(";") + tempValue);
        }

        if (checkCommand(dataV, "AMP") >= 0)
        {
            tempValue = ss.StringSeparator(dataV, ' ', 1);
            checkAndPublishData("tanning-device/updateAmp", ss.getMacAddress() + String(";") + tempValue);
        }

        if (checkCommand(dataV, "VENT") >= 0)
        {
            tempValue = ss.StringSeparator(dataV, ' ', 1);
            checkAndPublishData("tanning-device/updateVent", ss.getMacAddress() + String(";") + tempValue);
        }

        if (checkCommand(dataV, "VOLT") >= 0)
        {
            tempValue = ss.StringSeparator(dataV, ' ', 1);
            checkAndPublishData("tanning-device/updateVolt", ss.getMacAddress() + String(";") + tempValue);
        }

        if (checkCommand(dataV, "RST") >= 0)
        {
            tempValue = ss.StringSeparator(dataV, ' ', 1);
            checkAndPublishData("tanning-device/updateRst", ss.getMacAddress() + String(";") + tempValue);
        }
    }
}