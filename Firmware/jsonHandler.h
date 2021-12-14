
#include <ArduinoJson.h>

DynamicJsonDocument doc(2024);
char jsonDoc[2024];

String macAddress="";
String Alive="YES";
String TotalRunningTime="0";
String TotalSessionCount="0";
String TotalSessionCorrectlyEnded="0";
String TotalSessionEndedBeforeTime="0";
String TotalSessionNotEndedCorrectly="0";
String StartSession="0";
String EndSession="0";
String EndSessionType="0";
String Temperature="0";
String AnemometerSensor="0";
String PresencePhases="0";
String SensorFilters="0";
String LampMaintenance="0";
String AnnualMaintenance="0";
String ActualLastTemp="0";
String HighestTemp="0";
String PowerFactorCorrection="0";
String PFDeviationFromOptimalLevel="0";
String LastFanSpeed="0";
String InputVoltage="220";
String Message="HELLO";
void genJSON()
{

    // doc["Timestamp"] = String("12/2/2 03:11:33");
    // doc["MAC_Address"] =myMac;
    doc["macAddress"] = macAddress;

    doc["Alive"] = Alive;
    doc["TotalRunningTime"] = TotalRunningTime;
    doc["TotalSessionCount"] = TotalSessionCount;
    doc["TotalSessionCorrectlyEnded"] = TotalSessionCorrectlyEnded;
    doc["TotalSessionEndedBeforeTime"] = TotalSessionEndedBeforeTime;
    doc["TotalSessionNotEndedCorrectly"] =TotalSessionNotEndedCorrectly;
    doc["StartSession"] = StartSession;
    doc["EndSession"] = EndSession;
    doc["EndSessionType"] =EndSessionType;
    doc["Temperature"] = Temperature;
    doc["AnemometerSensor"] = AnemometerSensor;
    doc["PresencePhases"] = PresencePhases;
    doc["SensorFilters"] = SensorFilters;
    doc["LampMaintenance"] =LampMaintenance;
    doc["AnnualMaintenance"] = AnnualMaintenance;
    doc["ActualLastTemp"] = ActualLastTemp;
    doc["HighestTemp"] = HighestTemp;
    doc["PowerFactorCorrection"] = PowerFactorCorrection;
    doc["PFDeviationFromOptimalLevel"] = PFDeviationFromOptimalLevel;
    doc["LastFanSpeed"] = LastFanSpeed;
    doc["InputVoltage"] = InputVoltage;
    doc["Message"] = Message;

    serializeJson(doc, Serial);
}

void sendJSON()
{
    genJSON();
    serializeJson(doc, jsonDoc);
    String topicP = String("smartdata/") + macAddress;
    Serial.print("Publishing on: ");
    Serial.println(topicP);
    mqttClient.publish(topicP.c_str(), jsonDoc);
}