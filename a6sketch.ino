// Joystick pins
const int xPin = A0;     
const int yPin = A1;      
const int swPin = 2;      

// LED pins
const int greenLED = 8;
const int redLED = 13;
const int yellowLED = 4;

void setup() {
  Serial.begin(9600);

  pinMode(swPin, INPUT_PULLUP); 
  pinMode(greenLED, OUTPUT);
  pinMode(redLED, OUTPUT);
  pinMode(yellowLED, OUTPUT);
}

void loop() {
  // Read joystick values
  int xVal = analogRead(xPin);
  int yVal = analogRead(yPin);
  int swState = digitalRead(swPin); // LOW when pressed

  // Send joystick data to p5.js
  Serial.print(xVal);
  Serial.print(",");
  Serial.print(yVal);
  Serial.print(",");
  Serial.println(swState); // Include button state

  // Check if p5.js sent a command
  if (Serial.available()) {
    String command = Serial.readStringUntil('\n');
    command.trim();

    if (command == "circle") {
      digitalWrite(greenLED, HIGH);
      digitalWrite(redLED, LOW);
      digitalWrite(yellowLED, LOW);
    } else if (command == "square") {
      digitalWrite(redLED, HIGH);
      digitalWrite(greenLED, LOW);
      digitalWrite(yellowLED, LOW);
    } else if (command == "triangle") {
      digitalWrite(yellowLED, HIGH);
      digitalWrite(greenLED, LOW);
      digitalWrite(redLED, LOW);
    } else if (command == "clear") {
      // Turn off all LEDs
      digitalWrite(greenLED, LOW);
      digitalWrite(redLED, LOW);
      digitalWrite(yellowLED, LOW);
    }
  }

  delay(50); // Small delay for stability
}