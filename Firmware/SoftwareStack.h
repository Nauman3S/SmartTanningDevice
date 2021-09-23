//Software Stack

class SoftwareStack
{
public:
#define DebugPrint(x) Serial.println(x)

    String StringSeparator(String data, char separator, int index);
    char *StrToCharArray(String data);
    
    SoftwareStack();

private:
    //  String configs="";
    char buf[100];
    
};
SoftwareStack::SoftwareStack()
{

  
}

char *SoftwareStack::StrToCharArray(String data)
{
    data.toCharArray(this->buf, data.length() + 1);
    return this->buf;
}

String SoftwareStack::StringSeparator(String data, char separator, int index)
{

    int found = 0;
    int strIndex[] = {0, -1};
    int maxIndex = data.length() - 1;

    for (int i = 0; i <= maxIndex && found <= index; i++)
    {
        if (data.charAt(i) == separator || i == maxIndex)
        {
            found++;
            strIndex[0] = strIndex[1] + 1;
            strIndex[1] = (i == maxIndex) ? i + 1 : i;
        }
    }

    return found > index ? data.substring(strIndex[0], strIndex[1]) : "";
}
