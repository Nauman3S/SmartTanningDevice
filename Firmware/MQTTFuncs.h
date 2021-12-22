

void MQTTUnSubscribe()
{
    String topicN = ss.getMacAddress()+String("/poll");
    String topicO = ss.getMacAddress()+String("/fieldData");

    mqttClient.unsubscribe(topicN.c_str());
    mqttClient.unsubscribe(topicO.c_str());
}
void MQTTSubscriptions()
{
    //mqttClient.subscribe("SmartTControl/data/v");

    // for(int i=0;i<10;i++){
    //   IMEIsList[i]==String("NA");
    // }
    String topicN = ss.getMacAddress()+String("/poll");
    String topicO = ss.getMacAddress()+String("/fieldData");

    mqttClient.subscribe(topicN.c_str());
    mqttClient.subscribe(topicO.c_str());
}
void callback(char *topic, byte *payload, unsigned int length)
{
    Serial.print("Message arrived [");
    Serial.print(topic);
    Serial.print("] ");
    String pLoad = "";
    for (int i = 0; i < length; i++)
    {
        Serial.print((char)payload[i]);
        pLoad = pLoad + String((char)payload[i]);
    }
    Serial.println();
    if (String(topic) == ss.getMacAddress()+("/poll"))
    {
    //    Serial.println("Got Poll Request.");
    //    Serial2.println("Got Poll Request.");
       sendData_UVCommander("POLL");
    }
    else if (String(topic) == ss.getMacAddress()+("/fieldData"))
    {
       Serial.println("Got Fields Data: ");
       Serial2.println("Got Fields Data: ");
       Serial.println(pLoad);
       Serial2.println(pLoad);
    }

    // Switch on the LED if an 1 was received as first character
    if ((char)payload[0] == '1')
    {
        digitalWrite(BUILTIN_LED, LOW); // Turn the LED on (Note that LOW is the voltage level
                                        // but actually the LED is on; this is because
                                        // it is active low on the ESP-01)
    }
    else
    {
        digitalWrite(BUILTIN_LED, HIGH); // Turn the LED off by making the voltage HIGH
    }
    pLoad = "";
}
void reconnect()
{
    // Loop until we're reconnected
    while (!mqttClient.connected())
    {
        Serial.print("Attempting MQTT connection...");
        // Create a random client ID
        String clientId = "ESP8266Client-";
        clientId += String(random(0xffff), HEX);
        // Attempt to connect
        if (mqttClient.connect(clientId.c_str(), mqtt_user, mqtt_pass))
        {
            Serial.println("Established:" + String(clientId));
            //mqttClient.subscribe("SmartTControl/data/v");
            MQTTSubscriptions();
            // return true;
        }
        else
        {
            Serial.print("failed, rc=");
            Serial.print(mqttClient.state());
            Serial.println(" try again in 5 seconds");
            // Wait 5 seconds before retrying
            delay(5000);
        }
    }
}
bool mqttConnect()
{
    static const char alphanum[] = "0123456789"
                                   "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                                   "abcdefghijklmnopqrstuvwxyz"; // For random generation of client ID.
    char clientId[9];

    uint8_t retry = 3;
    while (!mqttClient.connected())
    {
        if (String(mqtt_server).length() <= 0)
            break;

        mqttClient.setServer(mqttBroker, 1883);
        mqttClient.setCallback(callback);
        mqttClient.setBufferSize(2024);
        Serial.println(String("Attempting MQTT broker:") + String("Tanning Broker"));
        internetStatus = "Connecting...";

        for (uint8_t i = 0; i < 8; i++)
        {
            clientId[i] = alphanum[random(62)];
        }
        clientId[8] = '\0';

        if (mqttClient.connect(clientId, mqtt_user, mqtt_pass))
        {
            Serial.println("Established:" + String(clientId));
            Serial2.println("Established:" + String(clientId));
            internetStatus = "Connected";
            //mqttClient.subscribe("SmartTControl/data/v");
            MQTTSubscriptions();
            return true;
        }
        else
        {
            Serial.println("Connection failed:" + String(mqttClient.state()));
            internetStatus = "Not-Connected. Retrying...";
            if (!--retry)
                break;
            delay(3000);
        }
    }
    return false;
}

void mqttPublish(String path, String msg)
{
    //String path = String("channels/") + channelId + String("/publish/") + apiKey;
    mqttClient.publish(path.c_str(), msg.c_str());
}