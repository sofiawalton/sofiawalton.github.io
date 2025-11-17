const int Xpin = A0; // X-axis pin
const int Ypin = A1; // Y-axis pin
const int swPin = 2; // Joystick button pin

const int greenLED = 8; // Green LED pin
const int redLED = 12; // Red LED pin
const int yellowLED = 4; // Yellow LED pin

void setup() {
  Serial.begin(9600);
  pinMode(swPin, INPUT_PULLUP); // Set button pin as input with internal pull-up resistor
  pinMode(greenLED, OUTPUT);
  pinMode(redLED, OUTPUT);
  pinMode(yellowLED, OUTPUT);
}


void loop(){
    // read joystick values
    int xValue = analogRead(Xpin); // Read X-axis value
    int yValue = analogRead(Ypin); // Read Y-axis value
    int swState = digitalRead(swPin); // Read button state

    Serial.print(xValue);
    Serial.print(",");
    Serial.print(yValue);
    Serial.print(",");
    Serial.println(swState);

    if(Serial.available()){
        String command = Serial.readStringUntil('\n');
        command.trim(); // Remove any trailing newline or spaces
     

        if(command == "circle"){
            digitalWrite(greenLED, HIGH);
            digitalWrite(redLED, LOW);
            digitalWrite(yellowLED, LOW);
        } else if(command == "square"){
            digitalWrite(greenLED, LOW);
            digitalWrite(redLED, HIGH);
            digitalWrite(yellowLED, LOW);
        } else if(command == "triangle"){
            digitalWrite(redLED, LOW);
            digitalWrite(greenLED, LOW);
            digitalWrite(yellowLED, HIGH);
        } 
        
    }

    delay(100); // Small delay for stability
}