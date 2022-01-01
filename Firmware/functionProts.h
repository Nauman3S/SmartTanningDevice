void sendData_UVCommander(String d);
int checkCommand(String d, String c);
void pollAnswer(String a);
void sendToUVCommander();
void sendMACAddress();
void setupCommsHandler();
void checkAndPublishData(String topic, String msg);
uint8_t UVCommanderPollHandler();

void MQTTUnSubscribe();
void MQTTSubscriptions();
void callback(char *topic, byte *payload, unsigned int length);
void reconnect();
bool mqttConnect();
void mqttPublish(String path, String msg);


void sendJSON();

void writeData(const char *message);